#pragma strict

var buildPrompt : Switch;
var buildPopUp : Switch;
var promptDelay = 2.0;

function OnTriggerEnter(collider : Collider) {
	if(collider.GetType() == CharacterController) {
		buildPrompt.toggleSeen();
		buildPopUp.toggleSeen();
	}
}

function OnTriggerExit() {
	yield WaitForSeconds(promptDelay);
	buildPrompt.toggleSeen();
	buildPopUp.toggleSeen();
}

