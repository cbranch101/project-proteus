class Screwdriver extends GameTool {
	
	var mainCamera : Camera;
	var hudHandler : HUDHandler;
	var openRange : int = 30;
	private var objectIsOpen;
				
	function Update() {
		if(Input.GetKeyDown('e')) {
			if(!objectIsOpen) {
				tryToOpenObject();	
			} else {
				objectIsOpen = false;
				hudHandler.hideHUD();
			}
		}
	}
	
	function tryToOpenObject() {
		var hit : RaycastHit;
		var direction = transform.TransformDirection(Vector3.forward);
		if(Physics.Raycast(transform.position, direction, hit, openRange)) {
			openedObject = hit.collider;
			var schematicHandler = openedObject.GetComponent(SchematicHandler);
			if(schematicHandler) {
				schematic = schematicHandler.schematic;
				objectIsOpen = true;
				hudHandler.showHUD(schematic);
			}
		}
	}
	
	
		
}