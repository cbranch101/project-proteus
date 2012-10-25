
var slots: SchematicSlot[];
var emptyTexture : Texture;
var slotSize: int = 20;
private var slotOrigin : Vector2;
private var slotAreaRect : Rect;
var slotAreaHeight : int = 200;
var slotAreaWidth : int = 400;
var slotAreaOffset : int = 50;
var spacing = 10;
var spaceBetweenSections : int = 20;
var inventory : Inventory;
private var mousePos : Vector2;
private var pickedUpPiece : Piece;
private var lastSlotForPickedUpPiece : SchematicSlot;
private var inventorySlotCount = 5;

function Awake() {
	inventory = GetComponent(Inventory);
}

function Start() {
		slotOrigin = new Vector2(Screen.width / 2, Screen.height / 2);
		setSlots();
		
}

function setSlots() {
	boxes = new Array();
	var currentX;
	var currentY;
	var i = 0;
	for(var slot : SchematicSlot in slots) {
		currentX = (slotSize + spacing) * i;
		currentY = 0;
		slot.setLocationRect(currentX, currentY, slotSize);
		if(!slot.isEmpty()) {
			slot.connectPiece();
		}
		i++;
	}
	
}

function draw() {
	setMousePosition();
	handleClicks();
	if(isPiecePickedUp()) {
		var slotSize = lastSlotForPickedUpPiece.getSize();
		pickedUpPiece.drawWhilePickedUp(mousePos, slotSize);
	}
	
	drawSlots();
}

function handleClicks() {
	
	if(leftMouseWentDown()) {
		// if there's not already a piece that's picked up
		if(!isPiecePickedUp()) {
			lastSlotForPickedUpPiece = getMousedOverSlot(mousePos);
			pickedUpPiece = pickUpPieceFromSlot(lastSlotForPickedUpPiece);
		}
		
	}
	
	if(leftMouseButtonWentUp()) {
		if(isPiecePickedUp()) {
			var pieceToPlace = pickedUpPiece ? pickedUpPiece : null;		
			if(pieceToPlace) {
				var newSlotForPiece = getMousedOverSlot(mousePos);
				var slotToPlaceIn = newSlotForPiece ? newSlotForPiece : lastSlotForPickedUpPiece;
				var pieceInNewSlot = pickUpPieceFromSlot(newSlotForPiece);
			}
			if(pieceToPlace) {
				placePieceInSlot(slotToPlaceIn, pieceToPlace);
			}
			pickedUpPiece = pieceInNewSlot ? pieceInNewSlot : null;	
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

function leftMouseWentDown() {
	return Input.GetMouseButtonDown(0);
}

function leftMouseButtonWentUp() {
	return Input.GetMouseButtonUp(0);
}

function setMousePosition() {
	mousePos = new Vector2(Event.current.mousePosition.x, Event.current.mousePosition.y);
}

function getMousedOverSlot(mousePos : Vector2) {
	var mousedOverSlot = null;
	for(var slot : SchematicSlot in slots) {
		if(slot.isMousedOver(mousePos)) {
			mousedOverSlot = slot;
			break;
		}
	}
	return mousedOverSlot;
}

function drawSlots() {
	for(var slot : SchematicSlot in slots) {
		slot.draw();
	}
}

function isPiecePickedUp() {
	return pickedUpPiece != null;
}

