var ShakeCtrl = function(){
	//uses the lib/shake.js 
	//https://github.com/alexgibson/shake.js/
	
	//initiate the shake object.
	var myShakeEvent = new Shake({
	  threshold: 15, // optional shake strength threshold
	  timeout: 1000 // optional, determines the frequency of event generation
	});

	myShakeEvent.start();

	//activate sake eventlistner with function to fire
	this.activateShake = function(functionToFire){
	    //alert("activateShake");
	    window.addEventListener('shake', functionToFire, false); // ändra till functionToFire
	};

	//disable shake listner
	this.disableShake = function(){
	    //alert("disableShake");
	    window.removeEventListener('shake', shakeEventDidOccur, false);
	};
}