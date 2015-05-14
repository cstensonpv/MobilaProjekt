
//initiate the shake object.
var myShakeEvent = new Shake({
  threshold: 15, // optional shake strength threshold
  timeout: 1000 // optional, determines the frequency of event generation
});

myShakeEvent.start();

//function to call when shake occurs
function shakeEventDidOccur () {
    //put your own code here etc.
    alert('shake!');
    functionToFire();
}

function activateShake(functionToFire){
    //alert("activateShake");
    window.addEventListener('shake', shakeEventDidOccur, false); // ändra till functionToFire
}

function disableShake(){
    //alert("disableShake");
    window.removeEventListener('shake', shakeEventDidOccur, false);
}