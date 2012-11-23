#pragma strict

var onMaterial : Material;
var offMaterial : Material;

function Start () {

}

function Update () {
	
}

function setOnMaterial() {

	Debug.Log('on material firing');
	renderer.material = onMaterial;
	
}

function setOffMaterial() {

	renderer.material = offMaterial;
	
}

