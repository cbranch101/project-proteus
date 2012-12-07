
class SchematicSlot extends HUDTile {
	
	var emptyTexture : Texture;
	
	protected var loosenOffset : int = 0;
	var fixedRemovalChance : float = 10.0;
	var brokenPiece : Piece;
	var allowedPiece : Piece;
	var requiredSlotTypes : SchematicSlot[];
		
	@System.NonSerialized
	protected var attemptedPowerUp = false;
	protected var canPowerUp = false;
	protected var allRequiredSlotsCanPowerUp = true;
	protected var isPoweredUp : boolean = false;
	
				
	
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
	function slotCanPowerUp() {
		piece = getPiece();	
		return piece ? pieceCanPowerUp(piece) : false;
	}
	
	function pieceCanPowerUp(piece : Piece) {
		return !piece.isLoosened ? pieceIsWorking(piece) : false;
	}
	
			
	function pieceIsWorking(piece : Piece) {
		return !piece.isBroken ? pieceIsAllowed(piece) : false;
	}
	
	function pieceIsAllowed(piece : Piece) {
		return piece.GetType() == allowedPiece.GetType();
	}
	
	function powerUp(schematicHud, objectWithSchematic : GameObject) {
		this.attemptedPowerUp = true;
		var requiredSlots = getRequiredSlots(schematicHud, objectWithSchematic);
		
		if(slotCanPowerUp() && allRequiredSlotsCanPowerUp) {
			
			isPoweredUp = true;
			onPowerUp(requiredSlots, objectWithSchematic);
			
		} else {
			
			if(isPoweredUp) {
				onPowerDown(requiredSlots, objectWithSchematic);
			}
			
			isPoweredUp = false;
			
		}
		
	}
	
	function onPowerUp(requiredSlots, objectWithSchematic : GameObject) {
	}
		
	function getRequiredSlots(schematicHud : SchematicHud, objectWithSchematic : GameObject) {
		var i = 0;
		var requiredSlots = new Hashtable();
		
		for (var requiredSlotType : SchematicSlot in requiredSlotTypes) {
			requiredSlot = schematicHud.GetComponentInChildren(requiredSlotType.GetType());
			if(!requiredSlot.attemptedPowerUp) {
				
				requiredSlot.powerUp(schematicHud, objectWithSchematic);
				
				if(allRequiredSlotsCanPowerUp) {
					allRequiredSlotsCanPowerUp = requiredSlot.slotCanPowerUp();
				}
				
			}
			requiredSlots[requiredSlot.GetType()] = requiredSlot;
			i++;
		}
		
		return requiredSlots;
		
	}
	
/*
	function powerUpRequiredSlots(schematicHud : SchematicHud, objectWithSchematic : GameObject) {		
		
		for (var requiredSlot : SchematicSlot in requiredSlotTypes) {
			
			for(var schematicSlot : SchematicSlot in allSchematicSlots) {
				if(requiredSlot.GetType() == schematicSlot.GetType()) {
					if(!schematicSlot.attemptedPowerUp) {
						
						schematicSlot.powerUp(allSchematicSlots, objectWithSchematic);
						
					} 
				}
			}
			
		}
				
	}  
*/
	
	function setTextureToDraw() {
		
		var piece = getPiece();
		
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
	
		return getPiece() == null;
		
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
		
		var piece : Piece = getPiece();
		
		if(piece) {
			
			// take out the current piece
			piece.breakSelf();
			
		}
		
	}
	
	function loosenPiece() {
		var piece : Piece = getPiece();
		if(piece) {
			piece.isLoosened = true;
		}
	}
	
	function tightenPiece() {
		
		var piece : Piece = getPiece();
		
		if(piece) {
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
	
	function onPowerDown(requiredSlots, objectWithSchematic : GameObject) {
		
	}

	
		
}

