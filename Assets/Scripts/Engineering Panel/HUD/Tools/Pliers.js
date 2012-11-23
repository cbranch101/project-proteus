class Pliers extends GameTool {
	
	private var workProgress : int = 0;
	var successBarTexture : Texture;
	var progressBarTexture : Texture;
	var completedTexture : Texture;
	var focusBarTexture : Texture;
	var startPosition : float = .3;
	private var currentProgress : float = 0;
	var successBarWidth : int = 300;
	var successBarHeight : int = 30;
	var focusBarWidth : int = 10;
	var lastPress : float = 0;
	var optimalInterval = .20;
	private var focusBarX : int;
	private var endFailPoint;
	private var startFailPoint;
	private var maxPressSpeed : float = 3.5;
	private var minPressSpeed : float = 1.5;
	private var pressSpeed : float;
	private var workedOnTile : HUDTile;
	var progressRate : float = .05;
	
	@System.NonSerialized
	var picksUpPieceWhenFinishedWorking : boolean = true;
	
	
	function useOnTile(tile : HUDTile) {
		
		startWorkingOnTile(tile);
		
	}
	
	function startWorkingOnTile(tile: HUDTile) {
		focusBarX = toolOrigin.x + (successBarWidth * startPosition);
		startFailPoint = toolOrigin.x;
		endFailPoint = toolOrigin.x + successBarWidth;
		isFinishedWorking = false;
		workedOnTile = tile;
	}
	
	function resetWork() {
		workProgress = 0;
		lastPress = 0;
		pressSpeed = 0;
	}
	
	function draw() {
		if(!isFinishedWorking) {
			drawSuccessBar();
		}
	}
	
	function drawSuccessBar() {
		GUI.DrawTexture(Rect(toolOrigin.x, toolOrigin.y - 50, successBarWidth, successBarHeight), progressBarTexture);
		GUI.DrawTexture(Rect(toolOrigin.x, toolOrigin.y - 50, successBarWidth * currentProgress, successBarHeight), completedTexture);
		GUI.DrawTexture(Rect(toolOrigin.x, toolOrigin.y, successBarWidth, successBarHeight), successBarTexture);
		GUI.DrawTexture(Rect(focusBarX, toolOrigin.y, focusBarWidth, successBarHeight), focusBarTexture);
	}
	
	function updateToolHUD() {
		// if there's been a single press
		if(lastPress > 0) {
			
			// press speed is in clicks / second
			// since we're updating the last press on every click
			// this number always represent clicks per second
			
			if((pressSpeed <= maxPressSpeed) && (pressSpeed >= minPressSpeed)) {
				
				percentageToAdvance = pressSpeed / maxPressSpeed;
				focusBarX = toolOrigin.x + (successBarWidth * percentageToAdvance);
				
				
			} else {
			
				var isUnderMinSpeed = pressSpeed <= minPressSpeed;
				
				if(isUnderMinSpeed) {
					
					currentProgress = 0;
					
				} else {
					
					onFailure();
					
				}
				
			}
			
			progressSpeed = endFailPoint - focusBarX;
			var distance = Time.deltaTime / (progressRate * progressSpeed);
			currentProgress += distance;
			
			if(currentProgress >= 1) {
				
				onSuccess();
				
			}
			
		}
		
			if(Input.GetKeyDown("j")) {
				pressSpeed = 1 / (Time.time - lastPress);
				updateFocusBarX();
				lastPress = Time.time;
				
			}
	}
	
	function onSuccess() {
		
		if(workedOnTile.currentPieceIsLoosened()) {
			
			workedOnTile.tightenPiece();
			
		} else {
		
			workedOnTile.loosenPiece();
			
		}
		
		finishWorking();
		
	}
	
	
	function onFailure() {
		if(!workedOnTile.currentPieceIsLoosened()) {
			workedOnTile.loosenPiece();
		}
		
		workedOnTile.breakCurrentPiece();
		finishWorking();
	}
	
	function updateFocusBarX() {
		
		speedRange = maxPressSpeed - minPressSpeed;
/* 		Debug.Log(pressSpeed); */
		
	}
	
	function finishWorking() {
		
		isFinishedWorking = true;
		var tileToPass : HUDTile = workedOnTile;
		workedOnTile = null;
		playerHand.onToolFinishedWorking(tileToPass);
		resetWork();
		
	}
	
}