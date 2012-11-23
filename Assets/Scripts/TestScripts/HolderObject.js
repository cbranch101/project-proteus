#pragma strict

var testPiece : GameObject;

function testFunction() {
	
	var schematicSlots = GetComponentsInChildren(SchematicSlot);
	
	for(var schematicSlot : SchematicSlot in schematicSlots) {
		
		var currentTestPiece : GameObject = Instantiate(testPiece, Vector3(0, 0, 0), transform.rotation);
		currentTestPiece.transform.parent = schematicSlot.transform;
		
	}
	
	for(var schematicSlot : SchematicSlot in schematicSlots) {

			var piece : Piece = schematicSlot.GetComponentInChildren(Piece);
			Debug.Log(piece);
			if(piece) {
				
				piece.transform.parent = null;
				
			}
			
	
	}
	
	
	for(var schematicSlot : SchematicSlot in schematicSlots) {

			piece = schematicSlot.GetComponentInChildren(Piece);
			
	
	}

}