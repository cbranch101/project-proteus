var emptyTexture : Texture;
public var locationRect : Rect;
var piece : Piece;
private var size : int;

function SchematicSlot(newEmptyTexture : Texture) {
	emptyTexture = newEmptyTexture;
}

function setEmptyTexture(newTexture : Texture){
	emptyTexture = newTexture;
}

function setLocationRect(x : int, y : int, mySize : int) {
	size = mySize;
	locationRect = new Rect(x, y, size, size);
}

function draw() {
	var textureToDraw;
	if(piece) {
		textureToDraw = piece.getTexture();
	} else {
		textureToDraw = emptyTexture;
	}
	GUI.DrawTexture(locationRect, textureToDraw);
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

function pickUpPiece() {
	var currentPiece = piece ? piece : null;
	if(currentPiece) {
		disconnectPiece();
		piece = null;
	}
	return currentPiece;
}

function placePiece(pieceToPlace : Piece) {
	 piece = pieceToPlace;
	connectPiece();
}

function connectPiece() {
	piece.connectSlot(this);
}

function disconnectPiece() {
	piece.disconnectSlot();
}

function isMousedOver(mousePos : Vector2) {
	return locationRect.Contains(mousePos);
}

