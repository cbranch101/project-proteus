#pragma strict

private var schematic : Schematic;
var spacing = 10;
var spaceBetweenSections : int = 15;
var inventory : Inventory;
var inventorySlots : SchematicSlot[];
private var schematicSlots: SchematicSlot[];
private var slots = new Array();
var emptyInventorySlotTexture : Texture;
var slotSize: int = 40;
private var slotOrigin : Vector2;
private var slotAreaRect : Rect;
private var mousePos : Vector2;
private var lastSlotForPickedUpPiece : SchematicSlot;
private var inventorySlotCount = 5;
private var pickedUpPiece : Piece = null;



/**
 * showHudForSchematic function.
 * 
 * Takes in a schematic and prepares it to be shown
 * 
 * @access public
 * @param newSchematic : Schematic
 * @return void
 */
function showHudForSchematic(newSchematic : Schematic) {
	
	schematic = newSchematic;
	slotOrigin = new Vector2(Screen.width / 2, Screen.height / 2);
	setSlots();
	
}


function OnGUI() {
		
		// draw the hud
		draw();
		
}

/**
 * draw function.
 *  
 * Draws the textures for the slots in the schematic and handles clicks
 * 
 * @access public
 * @return void
 */
function draw() {
	
	setMousePosition();
	handleClicks();
	
	if(isPiecePickedUp()) {
		
		// set the slot size for the last piece that was picked up
		var slotSize = lastSlotForPickedUpPiece.getSize();
		
		// draw the piece in between being picked up
		// and placed in the next slot
		pickedUpPiece.drawWhilePickedUp(mousePos, slotSize);
		
	}
	
	// draw all the current slots
	drawSlots();
	
}

/**
 * handleClicks function.
 * 
 * Handles different click states and calls the appropriate functions
 * 
 * @access public
 * @return void
 */
function handleClicks() {
	
	if(leftMouseWentDown()) {
		
		// if there's not already a piece that's picked up
		if(!isPiecePickedUp()) {
			
			// get the slot that the piece is getting pulled out of
			// so that if the piece isn't dropped into a slot
			// we know where to replace it to. 
			lastSlotForPickedUpPiece = getMousedOverSlot(mousePos);
			
			// set the current picked up piece
			pickedUpPiece = pickUpPieceFromSlot(lastSlotForPickedUpPiece);
			
		}
		
	}
	
	if(leftMouseButtonWentUp()) {
		
		if(isPiecePickedUp()) {
			
			// set the piece to place
			var pieceToPlace = pickedUpPiece ? pickedUpPiece : null;		
			
			if(pieceToPlace) {
				
				// get the new slot is moused over for the piece
				var newSlotForPiece = getMousedOverSlot(mousePos);
				
				// if there is no new slot, place the piece back in the slot it was initially removed from
				var slotToPlaceIn = newSlotForPiece ? newSlotForPiece : lastSlotForPickedUpPiece;
				
				// if there's current a piece in the slot being placed in, pick it up
				var pieceInNewSlot = pickUpPieceFromSlot(newSlotForPiece);
			}
			
			
			if(pieceToPlace) {
				
				// place the picked up piece into the located slot
				placePieceInSlot(slotToPlaceIn, pieceToPlace);
			}
			
			// if there's another piece that was picked up, set it as the picked up piece
			pickedUpPiece = pieceInNewSlot ? pieceInNewSlot : null;	
			
		}
	}
}

function leftMouseWentDown() {
	return Input.GetMouseButtonDown(0);
}

function leftMouseButtonWentUp() {
	return Input.GetMouseButtonUp(0);
}

function setMousePosition() {
	mousePos = new Vector2(Event.current.mousePosition.x, Event.current.mousePosition.y);
}

/**
 * getMousedOverSlot function.
 * 
 * Gets the SchematicSlot that is moused over in the current frame
 * 
 * @access public
 * @param mousePos : Vector2
 * @return slot : SchematicSlot
 */
function getMousedOverSlot(mousePos : Vector2) {
	
	// set the mousedOverSlot as null if nothing is found
	var mousedOverSlot = null;
	
	// iterate over the slots
	for(var slot : SchematicSlot in slots) {	
		
		// if the current slot is currently being moused over
		if(slot.isMousedOver(mousePos)) {
			
			// return the slot
			mousedOverSlot = slot;
			break;
			
		}
		
	}
	
	return mousedOverSlot;
	
}

/**
 * drawSlots function.
 * 
 * Draws all of the SchematicSlots in the current schematic
 * 
 * @access public
 * @return void
 */
function drawSlots() {
	
	// iterate over all the slots
	for(var slot : SchematicSlot in slots) {
		
		// draw the slot
		slot.draw();
		
	}
	
}

/**
 * setSlots function.
 * 
 * Handles the preparation for drawing slots.  Slots need Location Rects so we know where to draw them
 * and the pieces within them need to be connected for correct processing
 * 
 * @access public
 * @return void
 */
function setSlots() {
	
	schematicSlots = schematic.slots;
	
	// set the current X and Y from the slot Origin
	// to move from slot to slot and draw the HUD
	var currentX : int = slotOrigin.x;
	var currentY : int = slotOrigin.y;
	
	setSchematicSlots(currentX, currentY);
	setInventorySlots(currentX, currentY);
		
}

function setSchematicSlots(currentX : int, currentY : int) {
	
	var i = 0;
	for(var slot : SchematicSlot in schematicSlots) {
		
		// set the location rectange for a single slot
		slot.setLocationRect(currentX, currentY, slotSize);
		
		// if there's a piece in the current slot
		if(!slot.isEmpty()) {
			slot.connectPiece();
		}
		
		currentX += (slotSize + spacing);
		slots.Push(slot);
		i++;
		
	}
	
}

function setInventorySlots(currentX : int, currentY : int) {
	
	currentX = slotOrigin.x;
	currentY += (spaceBetweenSections + slotSize);
	var i = 0;
	
	for(var inventoryPiece : Piece in inventory.pieces) {
		var inventorySlot = inventorySlots[i];
		inventorySlot.setLocationRect(currentX, currentY, slotSize);
		inventorySlot.setEmptyTexture(emptyInventorySlotTexture);
		inventorySlot.placePiece(inventoryPiece);
		slots.Push(inventorySlot);
		currentX += (slotSize + spacing);
	}
	
}

function placePieceInSlot(slot : SchematicSlot, piece: Piece) {
	slot.placePiece(piece);
}

function pickUpPieceFromSlot(slot : SchematicSlot) {
	pickedUpPiece = null;
	if(slot) {
		pickedUpPiece = slot.pickUpPiece();
	}
	return pickedUpPiece;
} 

function isPiecePickedUp() {
	return pickedUpPiece != null;
}



