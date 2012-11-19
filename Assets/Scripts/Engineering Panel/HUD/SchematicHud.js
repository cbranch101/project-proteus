#pragma strict

private var schematic : Schematic;
var spacing = 10;
var spaceBetweenSections : int = 15;
var inventory : Inventory;
var inventorySlots : InventorySlot[];
private var schematicSlots: SchematicSlot[];
private var tiles = new Array();
var slotSize: int = 40;
private var toolOrigin : Vector2;
private var slotOrigin : Vector2;
private var slotAreaRect : Rect;
private var mousePos : Vector2;
private var lastSlotForPickedUpPiece : SchematicSlot;
private var inventorySlotCount = 5;
private var pickedUpPiece : Piece = null;
private var currentX : int;
private var currentY : int;
public var loosenOffset : int = 10;
var playerHand : PlayerHand;
private var lastClick : float = 0;
private var clickInterval : float = 1.0;


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
	toolOrigin = new Vector2(slotOrigin.x, slotOrigin.y - 50);
	setTiles();
	setToolOriginInPlayerHand();
	
}


function setToolOriginInPlayerHand() {
	playerHand.setToolOrigin(toolOrigin);
}

function FixedUpdate() {
	updateToolHUDInPlayerHand();
}

function updateToolHUDInPlayerHand() {
	if(playerHand.toolIsWorking) {
		playerHand.updateToolHUD();
	}
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
	
	
	handleClicks();
		
	// draw all the current slots
	drawTiles();
	drawPlayerHand();
	
}


function drawPlayerHand() {
	playerHand.draw(mousePos);
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
	setMousePosition();
	
	
	if(!playerHand.toolIsWorking) {
		handleHUDClicks();
	}
	
}

function handleHUDClicks() {
		var mouseEvent : String = null;
		var mousedOverTile = getMousedOverTile(mousePos);
		if(leftMouseWentDown()) { 
			
			mouseEvent = 'left_mouse_went_down';
			
			lastClick = Time.deltaTime;
			if(mousedOverTile != null) {
			
				playerHand.manipulateTile(mousedOverTile, mouseEvent);
				
			} else {
			
				playerHand.onTileNotFound(mouseEvent);
				
			}
			
		}
		
		if(leftMouseButtonWentUp()) {
		
			mouseEvent = 'left_mouse_went_up';
			
			if(mousedOverTile != null) {
			
				playerHand.manipulateTile(mousedOverTile, mouseEvent);
				
			} else {
			
				playerHand.onTileNotFound(mouseEvent);
				
			}
			
		}
}

function handleKeyPressesWhileToolHUDIsOpen() {
	
}

function leftMouseWentDown() {

	return Event.current.type == EventType.mouseDown;
	
}

function leftMouseButtonWentUp() {

	return Event.current.type == EventType.mouseUp;
	
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
function getMousedOverTile(mousePos : Vector2) {
	
	// set the mousedOverSlot as null if nothing is found
	var mousedOverTile : HUDTile = null;
	
	// iterate over the slots
	for(var tile : HUDTile in tiles) {	
		
		// if the current slot is currently being moused over
		if(tile.isMousedOver(mousePos)) {
			// return the slot
			mousedOverTile = tile;
			break;
			
		}
		
	}
	
	return mousedOverTile;
	
}

/**
 * drawSlots function.
 * 
 * Draws all of the SchematicSlots in the current schematic
 * 
 * @access public
 * @return void
 */
function drawTiles() {
	
	// iterate over all the slots
	for(var tile : HUDTile in tiles) {
		// draw the slot
		tile.draw();
		
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
function setTiles() {
	
	schematicSlots = schematic.slots;
	
	// set the current X and Y from the slot Origin
	// to move from slot to slot and draw the HUD
	currentX = slotOrigin.x;
	currentY = slotOrigin.y;
	
	setToolTiles();
	setSchematicSlots();
	setInventorySlots();
		
}

function setSchematicSlots() {
	
	currentX = slotOrigin.x;
	currentY += (spaceBetweenSections + slotSize);
	var i = 0;
	
	for(var slot : SchematicSlot in schematicSlots) {
		
		// set the location rectange for a single slot
		slot.setLocationRect(currentX, currentY, slotSize);
		slot.setLoosenOffset(loosenOffset);
		
		// if there's a piece in the current slot
		if(!slot.isEmpty()) {
		
			slot.connectPiece();
			
		}
		
		currentX += (slotSize + spacing);
		tiles.Push(slot);
		i++;
		
	}
	
}

function setInventorySlots() {
	
	currentX = slotOrigin.x;
	currentY += (spaceBetweenSections + slotSize);
	var i = 0;
	
	// iterate over the inventory slots and place all the pieces in those slots
	for(var inventoryPiece : Piece in inventory.pieces) {
		
		Debug.Log('piece being added');
		var slotForPiece = inventorySlots[i];
		slotForPiece.placePiece(inventoryPiece);
		inventorySlots[i] = slotForPiece;
		i++;
		
	}
	
	// set all the slots
	for(var inventorySlot : InventorySlot in inventorySlots) {
		
		// set the location rect for the inventory slot
		inventorySlot.setLocationRect(currentX, currentY, slotSize);
		
		// update the current location
		currentX += (slotSize + spacing);
		
		tiles.Push(inventorySlot);
		
	}
	
	
}

function setToolTiles() {
	
	currentX = slotOrigin.x;
	var i = 0;
	
	for(var gameTool : GameTool in inventory.hudTools) {
		
		var toolTile = gameTool.getToolTile();
		
		if(toolTile) {
			
			toolTile.setTool(gameTool);
			toolTile.setLocationRect(currentX, currentY, slotSize);
			tiles.Push(toolTile);
			currentX += (slotSize + spacing);
			
		}
		
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



