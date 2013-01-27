#pragma strict

function OnTriggerEnter() {
	var newColor = Vector3(1, 0, 0);
	networkView.RPC("setColor", RPCMode.AllBuffered, newColor);
}

@RPC
function setColor(newColor : Vector3) {
	renderer.material.color = Color(newColor.x, newColor.y, newColor.z, 1);
}