#pragma strict

private var locationRect : Rect;
private var textureToDraw : Texture;


function setLocationRect(x : int, y : int, mySize : int) {
	size = mySize;
	locationRect = new Rect(x, y, size, size);
}

function isMousedOver(mousePos : Vector2) {
	return locationRect.Contains(mousePos);
}

function onMouse1Down() {
	
}

function onMouse1Up() {
	
}

function draw() {
	setTextureToDraw();
	GUI.DrawTexture(locationRect, textureToDraw);
}

function setTextureToDraw() {
	
}



function Start () {

}

function Update () {

}