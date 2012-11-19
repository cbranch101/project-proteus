#pragma strict

public var schematicHud : SchematicHud;
var firstPersonController : GameObject;
var mainCamera : MouseLook;


function Start() {
	schematicHud.enabled = false;
}

function toggleCameraAndControlFunction() {
	mainCamera.enabled = mainCamera.enabled == true ? false : true;
	var allComponents = firstPersonController.GetComponents(MonoBehaviour);
	for(var component : MonoBehaviour in allComponents) {
		component.enabled = component.enabled == true ? false : true;
	}
}

function showHUD(schematic : Schematic) {
	
	toggleCameraAndControlFunction();
	schematicHud.enabled = true;
	schematicHud.showHudForSchematic(schematic);	
	
}

function hideHUD() {
	toggleCameraAndControlFunction();
	schematicHud.enabled = false;
}




