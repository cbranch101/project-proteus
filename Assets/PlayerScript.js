#pragma strict

function OnNetworkInstantiate(info : NetworkMessageInfo ) {
	var isOwned : boolean = false;
	
	if(!networkView.isMine) {
	
		disableControl();
	}
	
	
}

function disableControl() {

	var camera : Camera = gameObject.GetComponentInChildren(Camera);
	camera.enabled = false;
	
		
	


	var networkView : NetworkView = gameObject.GetComponent(NetworkView);
	networkView.enabled = true;
	
}