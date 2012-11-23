class PowerSlot extends SchematicSlot {
	
	function onPowerUp(allSchematicSlots : SchematicSlot[], objectWithSchematic : GameObject) {
		objectWithSchematic.SendMessage("setOnMaterial");
	}
	
}