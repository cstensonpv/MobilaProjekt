

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var dMap;

function initialize() {
  console.log("Initializing google maps");
  var stockholm = new google.maps.LatLng(59.3275, 18.0675);
  var mapOptions = {
    zoom:2,
    center: stockholm,
    disableDefaultUI: true
  };
  var mapDiv = document.getElementById("map-directions");
  var chatDiv = document.getElementById("chatDiv");
  dMap = new google.maps.Map(mapDiv, mapOptions);
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(dMap);
  newControl(dMap,'');
  mapDiv.style.height = (window.innerHeight*0.17).toFixed(0) + 'px'; // avrundar till 0 decimaler pga. intern avrunding annars.
  chatDiv.style.height = (window.innerHeight*0.83).toFixed(0)-44.375 + 'px'; // 44.375 är höjden på headern i iPhone 5.
  calcRoute("karlaplan,stockholm","odenplan,stockholm");
}

function mapExpand(){  
  // kollar ifall kartan är liten, om så, ändrar storlek till stor. Visar Stäng Karta knapp och gömmer chatten.
  var map = $('#map-directions');
  var smallMapHeight = (window.innerHeight*0.17).toFixed(0) + 'px';
  var bigMapHeight = (window.innerHeight).toFixed(0)-44.375+ 'px'; // 44.375 är höjden på headern i iPhone 5.

  if(map.css('height') == smallMapHeight){
    console.log("Expanding map");
    map.animate({height : bigMapHeight},200,'swing',function(){ // när animationen är klar, gör detta:
      $('#chatDiv').hide();
      $('#closeMap').show();
      calcRoute("karlaplan,stockholm","odenplan,stockholm");
      google.maps.event.trigger(dMap, 'resize'); //uppdaterar rendrering på kartan. Resizar kartan för fönsterstorleken.
    });
  }
}

function mapShrink(){
  // Ändrar kartstorlek till liten. Gömmer Stäng Karta knapp och visar chatten.
  console.log("Shrinks map");
  var map = $('#map-directions');
  var smallMapHeight = (window.innerHeight*0.17).toFixed(0) + 'px';

  map.animate({height : smallMapHeight},200,'swing',function(){
    $('#closeMap').hide();
    //calcRoute("karlaplan,stockholm","odenplan,stockholm");
    google.maps.event.trigger(dMap, 'resize');
  });
  $('#chatDiv').show();
}

function calcRoute(yourPos, otherPos) {
  var request = {
      origin:yourPos,
      destination:otherPos,
      travelMode: google.maps.TravelMode.WALKING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      document.getElementById("durationTime").innerHTML = response.routes[0].legs[0].duration.text;
    }else if(status == google.maps.DirectionsStatus.OVER_QUERY_LIMIT){
      alert("API anrop slut!");
    };
  });
};

function newControl(map, text) { //Funktion för diverse kontrollknappar.

  // Set CSS for the control border
  var controlDiv = document.createElement('div');
  controlDiv.id="durationDiv"

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.id= "durationTime";

  var img = document.createElement('img');
  img.id="durationImg";
  img.src ="https://cdn0.iconfinder.com/data/icons/education-15/500/Student-512.png";
  img.width = "20px";
  controlDiv.appendChild(img);

  controlText.innerHTML = text;
  controlDiv.appendChild(controlText);

  // Setup the click event listeners: simply set the map to
  // stockholm
  google.maps.event.addDomListener(controlDiv);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);

}

google.maps.event.addDomListener(window, 'load', initialize);
