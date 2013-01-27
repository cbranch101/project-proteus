#pragma strict

var speed:int = 5;
var gravity = 5;
private var characterController:CharacterController;


function Start () {
	characterController = GetComponent(CharacterController);
}

function Update () {
	if(networkView.isMine) {
		characterController.Move(Vector3(Input.GetAxis("Horizontal") * speed * Time.deltaTime, -gravity * Time.deltaTime, Input.GetAxis("Vertical") * speed * Time.deltaTime));
	} else {
		enabled = false;
	}
}