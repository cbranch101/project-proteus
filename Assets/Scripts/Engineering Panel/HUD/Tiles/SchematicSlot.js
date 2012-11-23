
class SchematicSlot extends HUDTile {
	
	var emptyTexture : Texture;
	var piece : Piece;
	
	protected var loosenOffset : int = 0;
	var fixedRemovalChance : float = 10.0;
	var brokenPiece : Piece;
	var allowedPiece : Piece;
	var requiredSlots : SchematicSlot[];
	
	@System.NonSerialized
	var canPowerUp = false;
	
	@System.NonSerialized
	protected var isProcessed = false;
				
	
	/**
	 * runDiagnostic function.
	 * 
	 * Peforms all of the final checks necessary before powering up a slot
	 * 
	 * @access public
	 * @return void
	 */
	function runDiagnostic() {
		correctPieceIsFirmlyConnected();
	}
	
	function correctPieceIsFirmlyConnected() {
/* 		Debug.Log(piece); */
	}
	
	function currentPieceIsAllowed() {
		return piece.GetType() == allowedPiece.GetType();
	}
	
	function powerUp(allSchematicSlots : SchematicSlot[], objectWithSchematic : GameObject) {
		allSchematicSlots = powerUpRequiredSlots(allSchematicSlots, objectWithSchematic);
		runDiagnostic();
		allSchematicSlots = onPowerUp(allSchematicSlots, objectWithSchematic);
		return allSchematicSlots;
	}
	
	function onPowerUp(allSchematicSlots : SchematicSlot[], objectWithSchematic : GameObject) {
		return allSchematicSlots;
	}
	
	function powerUpRequiredSlots(allSchematicSlots : SchematicSlot[], objectWithSchematic : GameObject) : SchematicSlot[] {		
		
		for (var requiredSlot : SchematicSlot in requiredSlots) {
			for(var schematicSlot : SchematicSlot in allSchematicSlots) {
				if(requiredSlot.GetType() == schematicSlot.GetType()) {
					if(!schematicSlot.isProcessed) {
					
						allSchematicSlots = schematicSlot.powerUp(allSchematicSlots, objectWithSchematic);
						
					} 
				}
			}
			
		}
		
		return allSchematicSlots;
		
	}  
	
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
	
	function breakCurrentPiece() {
		
		if(piece) {
			
			// take out the current piece
			piece.takeOutOfSlot();
			
			// set the current piece as the broken piece
			piece = brokenPiece;
			
			// put this new piece back in the slot
			piece.putInSlot(this);
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
		
		if(!removalIsSuccessful()) {
			breakCurrentPiece();
		}
		
		var pickedUpPiece : Piece = pickUpPiece();
				
		return pickedUpPiece;
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

