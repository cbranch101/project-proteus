#pragma strict

protected var locationRect : Rect;
protected var textureToDraw : Texture;
protected var size;

function setLocationRect(x : int, y : int, mySize : int) {
	size = mySize;
	locationRect = new Rect(x, y, size, size);
}

function isMousedOver(mousePos : Vector2) {
	return locationRect.Contains(mousePos);
}

function draw() {
	setTextureToDraw();
	GUI.DrawTexture(locationRect, textureToDraw);
}

function setTextureToDraw() {
	return null;
}

function getTool() {
	return null;
}

function tryToPickUpPiece() {
	return null;
}

function removalIsSuccessful() {
	return true;
}

function getSize() {
	return size;
}

function loosenPiece() {
	
}

function placePiece(pieceToPlace : Piece) {
	
}

function tightenPiece() {
	
}

function hasLoosenedPiece() {

	return false;
}



