#pragma strict

class GameTool extends MonoBehaviour {
	
	var schematicTexture : Texture;
	var toolTile : ToolTile;
	
	@System.NonSerialized
	var toolOrigin : Vector2;
	
	@System.NonSerialized
	var isFinishedWorking : boolean = true;
		
	function getToolTile() {
		if(toolTile != null) {
			return toolTile;
		} else {
			return null;
		}
	}
		
	function useOnTile(tile : HUDTile) {
		
	}
	
	function draw() {
		
	}
	
	function setToolOrigin(newToolOrigin : Vector2) {
		toolOrigin = newToolOrigin;
		
	}
	
	function updateToolHUD() {
		
	}
	
	
}

