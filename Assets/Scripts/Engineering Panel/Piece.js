#pragma strict

var texture : Texture;
private var slot : SchematicSlot;


function getTexture() {
	return texture;
}

function drawWhilePickedUp(mousePos : Vector2, slotSize : int) {
	GUI.DrawTexture(Rect(mousePos.x, mousePos.y, slotSize, slotSize), texture);
}

function removeFromSlot() {
	var currentSlot = slot;
	slot = null;
	return currentSlot;
}

function connectSlot(mySlot : SchematicSlot) {
	slot = mySlot;
}

function disconnectSlot() {
	slot = null;
}

