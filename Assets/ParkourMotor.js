#pragma strict

private var motor : CharacterMotor;

function Awake() {
	motor = GetComponent(CharacterMotor);
	Debug.Log(motor);
}