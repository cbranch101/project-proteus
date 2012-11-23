#pragma strict

var texture : Texture;
var brokenTexture : Texture;
private var isBroken : boolean;
var isLoosened : boolean = false;


function getTexture() {
	if(isBroken) {
		return brokenTexture;
	} else {
		return texture;
	}
}

function drawWhilePickedUp(mousePos : Vector2, slotSize : int) {
	GUI.DrawTexture(Rect(mousePos.x, mousePos.y, slotSize, slotSize), getTexture());
}

function breakSelf() {
	isBroken = true;
}

function loosen() {
	isLoosened = true;
}

function tighten() {
	isLoosened = false;
}

