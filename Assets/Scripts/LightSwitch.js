#pragma strict

var isWorking : boolean = false;
var lightsOn : boolean = false;


function OnTriggerStay() {
	
	
	if(Input.GetKeyDown('e')) {
		
		if(isWorking) {
			
			var switchAnimation : Animation = gameObject.GetComponent(Animation);
			var currentSpeed = lightsOn ? 1 : -1;
			switchAnimation["Take 001"].speed = currentSpeed;
			switchAnimation.Play();
			
		}
				
	}
	
}

function onPowerUp() {
	isWorking = true;
}

function onPowerDown() {
	isWorking = false;
}