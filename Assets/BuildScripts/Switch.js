#pragma strict

private var show = false;


function Update () {
	renderer.enabled = show;
}

function toggleSeen() {
	show = !show;
}

