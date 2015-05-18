var ShakeCtrl = function(){
	//initiate the shake object.
	var myShakeEvent = new Shake({
	  threshold: 15, // optional shake strength threshold
	  timeout: 1000 // optional, determines the frequency of event generation
	});

	myShakeEvent.start();

	//function to call when shake occurs
	this.shakeEventDidOccur = function() {
	    //put your own code here etc.
	    window.navigator.vibrate(3000);
	};

	this.activateShake = function(functionToFire){
	    //alert("activateShake");
	    window.addEventListener('shake', functionToFire, false); // ändra till functionToFire
	};

	this.disableShake = function(){
	    //alert("disableShake");
	    window.removeEventListener('shake', shakeEventDidOccur, false);
	};
}