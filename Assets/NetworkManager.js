#pragma strict

var playerPrefab:GameObject;
var spawnObject:Transform;
private var gameName:String = "Project_Protues_Networking_Test";
private var hostData:HostData[];

private var buttonX:float;
private var buttonY:float;
private var buttonHeight:float;
private var buttonWidth:float;
private var isTested:boolean = false;

private var refreshing:boolean = false;

function Start() {
	buttonX = Screen.width * .05;
	buttonY = Screen.height * .05;
	buttonHeight = Screen.width * .1;
	buttonWidth = Screen.width * .1;
}

function Update() {
	if(refreshing) {
		if(MasterServer.PollHostList().Length > 0) {
			refreshing = false;
			hostData = MasterServer.PollHostList();
		}
	}
	if(!isTested) {
		Debug.Log(Network.TestConnection());
	}
	
}

function refreshHostList() {
	MasterServer.RequestHostList(gameName);
	refreshing = true;
}

function startServer() {
	Network.InitializeServer(32, 25001, !Network.HavePublicAddress);
	MasterServer.RegisterHost(gameName, "Clay and Bob's Game");	
	MasterServer.PollHostList();
}


function OnServerInitialized() {
	Debug.Log("Server Intialized");
	spawnPlayer();
}

function spawnPlayer() {
	Network.Instantiate(playerPrefab, spawnObject.position, Quaternion.identity, 0);
}

function OnConnectedToServer() {
	Debug.Log('connected');
	spawnPlayer();
}

function OnMasterServerEvent(masterServerEvent: MasterServerEvent) {
	if(masterServerEvent == MasterServerEvent.RegistrationSucceeded) {
		Debug.Log("Registered Server");
	}
}

function OnGUI() {
	if(!Network.isClient && !Network.isServer) {
		if(GUI.Button(Rect(buttonX, buttonY, buttonWidth, buttonHeight), "Start Server")) {
			Debug.Log("starting server");
			startServer();
		}
		
		if(GUI.Button(Rect(buttonX, buttonY * 1.2 + buttonHeight, buttonWidth, buttonHeight), "Refresh Hosts")) {
			Debug.Log("Refreshing");
			refreshHostList();
		}
		if(hostData) {
			for(var i:int = 0; i<hostData.length; i++) {
				if(GUI.Button(Rect(buttonX * 1.5 + buttonWidth, buttonY * 1.2 + (buttonHeight * i), buttonWidth * 3, buttonHeight * .5), hostData[i].gameName)) {
					Network.Connect(hostData[i]);
				} 
			}
		}
	}
		
}

