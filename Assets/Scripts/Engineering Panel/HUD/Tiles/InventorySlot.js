class InventorySlot extends SchematicSlot {
			
	function removalIsSuccessful() {
		return true;
	}
			
	function setTextureToDraw() {
		
		var piece = getPiece();	
		
		if(piece) {
			
			textureToDraw = piece.getTexture();
			
		} else {
			
			textureToDraw = emptyTexture;
			
		}
		
		
	}
	
	function draw() {
	
		setTextureToDraw();
		
		GUI.DrawTexture(locationRect, textureToDraw);
		
	}
	
		
	function tryToPickUpPiece() {
		
		var pickedUpPiece : Piece = pickUpPiece();
		return pickedUpPiece;
		
	}
			
}