class ToolTile extends HUDTile {
	
	private var tool : GameTool;
		
	function setTextureToDraw() {
		textureToDraw = tool.schematicTexture;
	}
	
	function getTool() {
		return tool;
	}
	
	function setTool(newTool : GameTool) {
		tool = newTool;
	}
	
	function draw() {
		setTextureToDraw();
		GUI.DrawTexture(locationRect, textureToDraw);
	}
				
	
}