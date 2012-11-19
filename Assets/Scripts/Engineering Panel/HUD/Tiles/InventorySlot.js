class InventorySlot extends SchematicSlot {
			
	function removalIsSuccessful() {
		return true;
	}
			
	function setTextureToDraw() {
			
		if(piece) {
			
			textureToDraw = piece.getTexture();
			
		} else {
			
			textureToDraw = emptyTexture;
			
		}
		
		
	}
	
	function placePiece(pieceToPlace : Piece) {
	
		piece = pieceToPlace;
		connectPiece();
		
	}
	
	function tryToPickUpPiece() {
		
		var pickedUpPiece : Piece = pickUpPiece();
		return pickedUpPiece;
		
	}
			
}