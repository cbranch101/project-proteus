#pragma strict

private var selectedTool : GameTool;
private var pickedUpPiece : Piece;
private var allowPickUp = false;
private var lastTileForPickedUpPiece : HUDTile;
private var usedTool : GameTool;
private var toolOrigin : Vector2;

@System.NonSerialized
var toolIsWorking : boolean = false;

function Start () {

}

function Update () {

}

function setToolOrigin(newToolOrigin : Vector2) {

	toolOrigin = newToolOrigin;
	
}


function updateToolHUD() {
	selectedTool.updateToolHUD();
}

function draw(mousePos) {
	
	if(pickedUpPiece) {
	
		var tileSize = lastTileForPickedUpPiece.getSize();
		pickedUpPiece.drawWhilePickedUp(mousePos, tileSize);
		
	}
	
	if(selectedTool) {
		selectedTool.draw();
	}
	
}

function manipulateTile(tile : HUDTile, mouseEvent : String) {	
	
	if(tile.GetType() == ToolTile) {
		manipulateToolTile(tile, mouseEvent);
		
	} else {
	
		if(tile.GetType() == InventorySlot) {
		
			manipulateInventorySlot(tile, mouseEvent);
			
		} else {
		
			manipulateSchematicSlot(tile, mouseEvent);
			
			
		}
		
	}
	
}

function onTileNotFound(mouseEvent: String) {
	if(leftMouseWentUp(mouseEvent)) {
				
		if(pickedUpPiece) {
			lastTileForPickedUpPiece.placePiece(pickedUpPiece);
			pickedUpPiece = null;
		}
		
	}
}


function manipulateInventorySlot(inventorySlot : HUDTile, mouseEvent : String) {
	
	if(leftMouseWentDown(mouseEvent)) {
		
		if(!pickedUpPiece) {
												
					
			pickedUpPiece = inventorySlot.tryToPickUpPiece();
			
			// if there a piece was picked up, store if for later
			if(pickedUpPiece) {
				
				lastTileForPickedUpPiece = inventorySlot;
				
			}
			
		}
		
	}
	
	if(leftMouseWentUp(mouseEvent)) {
		if(pickedUpPiece) {
			inventorySlot.placePiece(pickedUpPiece);
			pickedUpPiece = null;
		}
	}
		
}

function onToolFinishedWorking(slot : SchematicSlot) {
		
		if(selectedTool.picksUpPieceWhenFinishedWorking) {
			
			if(slot.pieceIsLoosened) {
				
				pickUpPieceFromTile(slot);
				
			}	
			
		}
		
		toolIsWorking = false;
		selectedTool = null;
	
}

function pickUpPieceFromTile(tile : HUDTile) {
	
	pickedUpPiece = tile.tryToPickUpPiece();
	
	// if there a piece was picked up, store if for later
	if(pickedUpPiece) {
		lastTileForPickedUpPiece = tile;
	}
}

function manipulateSchematicSlot(schematicSlot : HUDTile, mouseEvent : String) {
	if(leftMouseWentDown(mouseEvent)) {
		
		if(!pickedUpPiece) {
			
			if(selectedTool) {
			
				useSelectedToolOnTile(schematicSlot);
				
				toolIsWorking = true;
								
			} else {
									
					
				pickUpPieceFromTile(schematicSlot);
				
			}
			
		}
		
	}
	
	if(leftMouseWentUp(mouseEvent)) {
		if(pickedUpPiece) {
			schematicSlot.placePiece(pickedUpPiece);
			pickedUpPiece = null;
		}
	}
	
}

function leftMouseWentDown(mouseEvent : String) {
	return mouseEvent == 'left_mouse_went_down';
}

function leftMouseWentUp(mouseEvent : String) {
	return mouseEvent == 'left_mouse_went_up';
}


function manipulateToolTile(toolTile : HUDTile, mouseEvent : String) {
	
	// you can only manipulate tool tiles if you don't have a piece currently in hand
	if(!pickedUpPiece) {
		
		if(leftMouseWentDown(mouseEvent)) {
		
			selectedTool = toolTile.getTool();
			selectedTool.setToolOrigin(toolOrigin);
		}
		
	}
	
}

function onLeftMouseDown(tile : HUDTile) {
	
	if(!pickedUpPiece) {
		
		var toolFromTile : GameTool = tile.getTool();
		
		if(toolFromTile) {
				
			if(!selectedTool) {
				
				// if there's a tool in the current tile
				
				// select the tool
				selectedTool = toolFromTile;
				
			}
			
				
			
			// if there's no tool to select in the tile being clicked
		} else {
						
			// if you're clicking on an inventory or schematic slot with a selected tool
			if(selectedTool) {
				
				
				// use the tool
				useSelectedToolOnTile(tile);
				
				
				// reset the selected tool
				
				selectedTool = null;
				
				allowPickUp = false;
				
			// if you're clicking on an inventory slot or schematic slot without a tool selected
			} else {
				
				if(allowPickUp) {
					
					
					pickedUpPiece = tile.tryToPickUpPiece();
					if(pickedUpPiece) {
						lastTileForPickedUpPiece = tile;
					}
					
				}
				
				// try to pick up a piece out of the slot
				
				
			}
		
		}
	}
	
}

function onLeftMouseUp(tile : HUDTile) {
	
}

function useSelectedToolOnTile(tile : HUDTile) {
	selectedTool.useOnTile(tile);
}

