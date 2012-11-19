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
	private var focusDistance : float;
	
	
	function useOnTile(tile : HUDTile) {
		
		if(tile.hasLoosenedPiece()) {
			startWorkingOnTile(tile);
			tile.tightenPiece();
		} else {
			startWorkingOnTile(tile);
			tile.loosenPiece();
		}
		
	}
	
	function startWorkingOnTile(tile: HUDTile) {
		focusBarX = toolOrigin.x + (successBarWidth * startPosition);
		startFailPoint = toolOrigin.x;
		endFailPoint = toolOrigin.x + successBarWidth;
		isFinishedWorking = false;
	}
	
	function resetWork() {
		workProgress = 0;
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
		pressInterval = Time.time - lastPress;
		Debug.Log(pressInterval);
		
		focusBarX += focusDistance;
		progressSpeed = endFailPoint  / (endFailPoint - focusBarX);
		var distance = Time.deltaTime / (10 * progressSpeed);
		currentProgress += distance;
		
		if(Input.GetKeyDown("j")) {
			
			lastPress = Time.time;
			
		}
	}
	
	function getFocusDistance(pressInterval) {
		
/*
		absoluteDifference = optimalInterval - pressInterval;
		percentageDifference = optimalInterval / percentageDifferce;
		Debug.Log(percentageDifference);
*/
		focusDistance = (optimalInterval - pressInterval) * 5; 
	}
	
}