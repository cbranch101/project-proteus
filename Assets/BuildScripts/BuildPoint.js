#pragma strict

var buildPrompt : GameObject;
var promptDelay = 2.0;

function OnTriggerEnter(collider : Collider) {
	if(collider.GetType() == CharacterController) {
		buildPrompt.GetComponent(BuildPrompt).toggleSeen();
	}
}

function OnTriggerExit() {
	yield WaitForSeconds(promptDelay);
	buildPrompt.GetComponent(BuildPrompt).toggleSeen();
}