
class SchematicSlot extends HUDTile {
	
	var emptyTexture : Texture;
	var piece : Piece;
	private var pieceIsLoosened = false;
	private var loosenOffset : int = 0;
	var fixedRemovalChance : float = 10.0;
	var brokenPiece : Piece;
			
	function setTextureToDraw() {
		
		if(piece) {
		
			textureToDraw = piece.getTexture();
			
		} else {
		
			textureToDraw = emptyTexture;
			
		}
		
	}
	
	function setLoosenOffset(newLoosenOffset : int) {
	
		loosenOffset = newLoosenOffset;
		
	}
	
	
	
	function isEmpty() {
	
		return piece == null;
		
	}
	
	function getPiece() {
	
		return piece;
		
	}
	
	function getSize() {
	
		return size;
		
	}
	
	function removalIsSuccessful() {
	
		if(!pieceIsLoosened) {
		
			var removalRoll : float = Random.Range(0, 100.0);
			
			if(removalRoll <= fixedRemovalChance) {
			
				return true;
				
			} else {
			
				return false;
				
			}
			
		} else {
		
			return true;
			
		}
		
	}
		
	function pickUpPiece() {
	
		var currentPiece = piece ? piece : null;
		
		if(currentPiece) {
		
			disconnectPiece();
			piece = null;
			
			
		}
		
		return currentPiece;
		
	}
	
	function draw() {
	
		setTextureToDraw();
		
		if(pieceIsLoosened == true) {
			
			if(piece) {
			
				var offsetRect = Rect(locationRect.x + loosenOffset, locationRect.y + loosenOffset, size, size);
				GUI.DrawTexture(locationRect, emptyTexture);
				GUI.DrawTexture(offsetRect, textureToDraw);
				
			}
			
		} else {
			
			GUI.DrawTexture(locationRect, textureToDraw);
			
		}
		
	}
	
	function loosenPiece() {
		if(piece) {
			pieceIsLoosened = true;
		}
	}
	
	function tightenPiece() {
		
		if(piece) {
			pieceIsLoosened = false;
		}
		
	}
	
	function placePiece(pieceToPlace : Piece) {
	
		piece = pieceToPlace;
		putPieceInSlot(pieceToPlace);
		
	}
	
	function putPieceInSlot(pieceToPlace) {
		
		pieceIsLoosened = true;
		piece = pieceToPlace;
		piece.putInSlot(this);
		
	}
		
	function connectPiece() {
	
		pieceIsLoosened = false;
		piece.putInSlot(this);
		
	}
	
	function disconnectPiece() {
		
		pieceIsLoosened = false;
		piece.takeOutOfSlot();
		
	}
	
	function tryToPickUpPiece() {
		
		if(removalIsSuccessful()) {
			
			var pickedUpPiece : Piece = pickUpPiece();
			return pickedUpPiece;
			
		} else {
		
			piece = null;
			return brokenPiece;
			
		}
		
	}
	
	function hasLoosenedPiece() {
	
		var hasPiece : boolean = piece != null ? true : false;
		if(hasPiece && pieceIsLoosened) {
			return true;
		} else {
			return false;
		}
		
	}

		
}

