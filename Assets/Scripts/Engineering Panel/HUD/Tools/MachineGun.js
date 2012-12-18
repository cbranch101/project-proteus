#pragma strict

var fireRate : float = 1;
private var lastFireTime : float = 0;
var mainCamera : Camera;
var muzzleFlash : ParticleRenderer;

function Start () {

}

function Update () {
	if(Input.GetMouseButtonDown(0)) {
		tryToFire();
	}
}

function tryToFire() {
	var timeSinceLastFire : float = Time.time - lastFireTime;
	if(timeSinceLastFire >= fireRate) {
		fire();
	}
}

function fire() {
	lastFireTime = Time.time;
	muzzleFlash.enabled = true;
	
	simulateBullet();
	yield WaitForSeconds(.25);
	muzzleFlash.enabled = false;
}

function simulateBullet() {
	var bulletRay : Ray = mainCamera.ViewportPointToRay (Vector3(0.5,0.5,0));
	var hit : RaycastHit;
	if (Physics.Raycast(bulletRay, hit)) {
		Debug.Log(hit.collider.gameObject);
	}
}





