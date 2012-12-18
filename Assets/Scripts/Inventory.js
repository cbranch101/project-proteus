#pragma strict
private var itemLookUpTable : Hashtable;
private var itemTable : Hashtable;
var mainCamera : GameObject;
var equippedObject : GameObject;
private var lastPressedKey : String;


function Update() {
	
	handleEquippedItemButtonPresses();
	
}

function Awake() {
	
	itemLookUpTable = new Hashtable();
	itemLookUpTable['1'] = "ScrewDriver";
	itemLookUpTable['2'] = "MachineGun";
	
	itemTable = new Hashtable();
	
	for(var storageKey : String in itemLookUpTable.Keys) {
		
		var findString : String = "Main Camera/" + itemLookUpTable[storageKey];
		var foundObject : GameObject = GameObject.Find(findString);
		
		if(foundObject) {
			foundObject.SetActiveRecursively(false);
		}
		
		itemTable[storageKey] = foundObject;
		
	}
}

function handleEquippedItemButtonPresses() {
	
	// If the user has pressed any key
	if(Input.anyKeyDown) {
		
		// get the key they pressed
		var pressedKey = Input.inputString;
		
		// if the key they pressed is associated with an object to equip
		if(itemTable.Contains(pressedKey)) {
			
			// if the player isn't trying to equip an object that is already equipped
			if(pressedKey != lastPressedKey) {
				
				// set the last pressed key we can be sure the player can't equip the
				// same object twice
				lastPressedKey = pressedKey;
				
				// find the object to equip
				var objectToEquip : GameObject =  itemTable[pressedKey];
												
				if(objectToEquip) {
					// equip the object
					equipObject(objectToEquip, pressedKey);
				}
				
				
			}
		}
	}
	
}

function equipObject(objectToEquip : GameObject, pressedKey : String) {
	if(equippedObject) {
		unEquipCurrentlyEquippedObject();
	}
	
	equippedObject = objectToEquip;
	
	// make the equipped object the child of the main camera
	
	equippedObject.SetActiveRecursively(true);
	
	
	
}

function unEquipCurrentlyEquippedObject() {
	
	// make the currently equipped object the child of the inventory
	
	// disable the current equipped class
	equippedObject.SetActiveRecursively(false);
	
	// set the equipped object as null
	equippedObject = null;
}