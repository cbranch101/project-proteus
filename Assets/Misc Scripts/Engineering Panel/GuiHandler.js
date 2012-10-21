#pragma strict

public var GuiScript : MyGui;
var firstPersonController : GameObject;
var mainCamera : MouseLook;
var launcher : MissileLauncher;

function Update () {
	
	
	if(Input.GetKeyDown('e')) {
		mainCamera.enabled = mainCamera.enabled == true ? false : true;
		launcher.enabled = launcher.enabled == true ? false : true;
		var allComponents = firstPersonController.GetComponents(MonoBehaviour);
		for(var component : MonoBehaviour in allComponents) {
			component.enabled = component.enabled == true ? false : true;
		}
		
		GuiScript.enabled = GuiScript.enabled == true ? false : true;
	}
	
}

function Start () {
	GuiScript.enabled = false;
}