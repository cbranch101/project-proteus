#pragma strict

private var schematic : Schematic;
var spacing = 10;
var spaceBetweenSections : int = 15;
var inventory : Inventory;
var inventorySlots : InventorySlot[];
private var tiles : Component[];
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
private var objectWithSchematic : GameObject;


/**
 * showHudForSchematic function.
 * 
 * Takes in a schematic and prepares it to be shown
 * 
 * @access public
 * @param newSchematic : Schematic
 * @return void
 */
function showHudForSchematic(newSchematic : Schematic, newObjectWithSchematic : GameObject) {
	
	objectWithSchematic = newObjectWithSchematic;
	schematic = newSchematic;
	slotOrigin = new Vector2(Screen.width / 2, Screen.height / 2);
	toolOrigin = new Vector2(slotOrigin.x, slotOrigin.y - 50);
	setTiles();
	setToolOriginInPlayerHand();
	
}


function setToolOriginInPlayerHand() {
	
	playerHand.setToolOrigin(toolOrigin);
	
}

function Update() {

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

function tryToActiveAllSlots() {

		

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

	
	
	attachSlotsFromSchematic();
	attachSlotsFromInventory();
	attachToolTilesFromInventory();
	// set the current X and Y from the slot Origin
	// to move from slot to slot and draw the HUD
	currentX = slotOrigin.x;
	currentY = slotOrigin.y;
	
	setToolTiles();
	setSchematicSlots();
	setInventorySlots();
	getAllTiles();
}

function getSchematicSlots() {
	
	
	var i = 0;
	var schematicSlotCount = 0;
	
	var inventoryOrSchematicSlots =  gameObject.GetComponentsInChildren(SchematicSlot);
	
	for (var inventoryOrSchematicSlot : SchematicSlot in inventoryOrSchematicSlots) {
		
		// only get the schematic slots
		if(inventoryOrSchematicSlot.GetType() != InventorySlot) {
			
			schematicSlotCount++;
			
		}
		
	}
	
	var schematicSlots : SchematicSlot[] = new SchematicSlot[schematicSlotCount];
	
	for (var inventoryOrSchematicSlot : SchematicSlot in inventoryOrSchematicSlots) {
		
		// only get the schematic slots
		if(inventoryOrSchematicSlot.GetType() != InventorySlot) {
			
			schematicSlots[i] = inventoryOrSchematicSlot;
			i++;
			
		}
		
	}
	
	return schematicSlots;
	
}

function getAllTiles() {
	tiles = gameObject.GetComponentsInChildren(HUDTile);
}

function attachToolTilesFromInventory() {
	
	var inventoryTools = inventory.GetComponentsInChildren(GameTool);
	
	for(var gameTool : GameTool in inventoryTools) {
		
		var toolTile : ToolTile = gameTool.getToolTile();
		
		if(toolTile) {
			toolTile.setTool(gameTool);
			toolTile.transform.parent = gameObject.transform;
		}
		
		
	}
	
}

function attachSlotsFromInventory() {
	var inventorySlots = inventory.GetComponentsInChildren(InventorySlot);
	
	for(var inventorySlot : InventorySlot in inventorySlots) {
		inventorySlot.transform.parent = gameObject.transform;
	}
}

function attachSlotsFromSchematic() {
	
	var schematicSlotsInSchematic = schematic.GetComponentsInChildren(SchematicSlot);
	
	for(var schematicSlot : SchematicSlot in schematicSlotsInSchematic) {
		
		// attach the slot from the schematic to the schematic hud
		schematicSlot.transform.parent = gameObject.transform;
		
	}
	
}

function setSchematicSlots() {
	
	currentX = slotOrigin.x;
	currentY += (spaceBetweenSections + slotSize);
	var i = 0;
	
	
	var schematicSlots = getSchematicSlots();
	
	for(var slot : SchematicSlot in schematicSlots) {
			
		// because inventory slot inherits from schematic slot
		// it gets returned in GetComponenetsInChildren
		if(slot.GetType() != InventorySlot) {
			
			// set the location rectange for a single slot
			slot.setLocationRect(currentX, currentY, slotSize);
			slot.setLoosenOffset(loosenOffset);
			
			currentX += (slotSize + spacing);
			
		}
		
	}
	
}

function setInventorySlots() {
	
	currentX = slotOrigin.x;
	currentY += (spaceBetweenSections + slotSize);
	var i = 0;
	
	
	var inventorySlots = gameObject.GetComponentsInChildren(InventorySlot);
	
	for(var inventorySlot : InventorySlot in inventorySlots) {
	
		inventorySlot.setLocationRect(currentX, currentY, slotSize);
		currentX += (slotSize + spacing);
		
	}	
	
}

function setToolTiles() {
	
	currentX = slotOrigin.x;
	var i = 0;
	
	var toolTiles = gameObject.GetComponentsInChildren(ToolTile);

	for(var toolTile : ToolTile in toolTiles) {
		
		toolTile.setLocationRect(currentX, currentY, slotSize);
		currentX += (slotSize + spacing);
		
	}	
	
} 

function powerUpAllSchematicSlots() {
	
	var schematicSlots = getSchematicSlots();
	
	for (var schematicSlot : SchematicSlot in schematicSlots) {
		
		schematicSlot.powerUp(this, objectWithSchematic);
		
	}
}



