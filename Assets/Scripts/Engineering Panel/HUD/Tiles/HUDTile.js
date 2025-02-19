#pragma strict

protected var locationRect : Rect;
protected var textureToDraw : Texture;
protected var size;

@System.NonSerialized
var pieceIsLoosened = false;


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

function placePiece(pieceToPlace : Piece, placeLoosely : boolean) {
	
}

function tightenPiece() {
	
}

function hasLoosenedPiece() {

	return false;
}

function breakCurrentPiece() {
	
}

function currentPieceIsLoosened() {
	return false;
}




