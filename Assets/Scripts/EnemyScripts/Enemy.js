#pragma strict

var player : GameObject;
var rotationSpeed = .05;
var moveSpeed : float = 1;

function Start () {
	
	animation.wrapMode = WrapMode.Loop;
	animation.Play("Enemy01");
	
	
}

function Update() {
	var direction = player.transform.position - transform.position;
	direction.y = 0;
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	GetComponent(CharacterController).SimpleMove(direction * moveSpeed);
}


