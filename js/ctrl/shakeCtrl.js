var ShakeCtrl = function(){
	//uses the lib/shake.js 
	//from https://github.com/alexgibson/shake.js/
	
	//initiate the shake object.
	var myShakeEvent = new Shake({
	  threshold: 15, // optional shake strength threshold
	  timeout: 1000 // optional, determines the frequency of event generation
	});

	myShakeEvent.start();

	//activate sake eventlistner with function to fire
	this.activateShake = function(functionToFire){
	    window.addEventListener('shake', functionToFire, false);
	};

	//disable shake listner
	this.disableShake = function(){
	    window.removeEventListener('shake', shakeEventDidOccur, false);
	};
}
