#pragma strict

var door : GameObject;

function OnTriggerStay() {

		
		if(Input.GetKeyDown('e')) {
			
			var panelAnimation = gameObject.GetComponent(Animation);
				
				var doorAnimations = door.GetComponentsInChildren(Animation);
				
				for( var animation : Animation in doorAnimations) {
					animation["ConcreteWall_01"].speed = 1;
					animation.Play();
				}

		}

}

function OnTriggerEnter(collider : Collider) {
	

}

function OnTriggerExit() {
	
	var doorAnimations = door.GetComponentsInChildren(Animation);
	
	for( var animation : Animation in doorAnimations) {
		animation["ConcreteWall_01"].speed = -1;
		animation.Play();
	}

}
