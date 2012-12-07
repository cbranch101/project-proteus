class PowerSlot extends SchematicSlot {
	
	function onPowerUp(requiredSlots, objectWithSchematic : GameObject) {
		Debug.Log(objectWithSchematic);
		objectWithSchematic.SendMessage('onPowerUp');
	}
	
	function onPowerDown(requiredSlots, objectWithSchematic : GameObject) {
		objectWithSchematic.SendMessage('onPowerDown');
	}
	
}