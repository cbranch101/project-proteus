#pragma strict

static var show = false;

function Start () {
/* 	toggle = GetComponent(Toggle); */
}

function Update () {
	renderer.enabled = show;
}

function toggleSeen() {
	show = !show;
}

