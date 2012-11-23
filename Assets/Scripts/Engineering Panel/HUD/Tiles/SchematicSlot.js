
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
				
	
	function getPiece() {
		
		var piece : Piece = gameObject.GetComponentInChildren(Piece);
		return piece;
		
	}
	
	function hasPiece() {
		return getPiece() == null;
	}
	
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
		piece = getPiece();
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
		
		piece = getPiece();
		
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
		
	function getSize() {
	
		return size;
		
	}
	
	function currentPieceIsLoosened() {
		
		var piece : Piece = getPiece();
		var pieceIsLoosened : boolean = false;
		
		if(piece) {
			pieceIsLoosened = piece.isLoosened;
		}
		
		return pieceIsLoosened;
	}
	
	function removalIsSuccessful() {
					
		if(!currentPieceIsLoosened()) {
		
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
	
		piece = getPiece();
		
		if(piece) {
			
			piece.transform.parent = null;			
			
		}
		
		return piece;
		
	}
	
	function draw() {
	
		setTextureToDraw();
		
		
		if(currentPieceIsLoosened()) {
			
			if(getPiece()) {
				
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
			piece.breakSelf();
			
		}
		
	}
	
	function loosenPiece() {
		if(getPiece()) {
			piece.isLoosened = true;
		}
	}
	
	function tightenPiece() {
		if(getPiece()) {
			piece.isLoosened = false;
		}
		
	}
	
	function placePiece(pieceToPlace : Piece, placeLoosely : boolean) {
		
		putPieceInSlot(pieceToPlace);
		pieceToPlace.isLoosened = placeLoosely;
		
	}
	
	function putPieceInSlot(pieceToPlace) {
		
		pieceToPlace.transform.parent = gameObject.transform;		
		
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

