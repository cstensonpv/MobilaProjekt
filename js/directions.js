

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var dMap;

function initialize() {
  console.log("initialize");
  directionsDisplay = new google.maps.DirectionsRenderer();
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
    zoom:7,
    center: chicago,
    disableDefaultUI: true
  };
  dMap = new google.maps.Map(document.getElementById("map-directions"), mapOptions);
  directionsDisplay.setMap(dMap);
  console.log(dMap);
  newControl(dMap,'');
  calcRoute("karlaplan,stockholm","odenplan,stockholm");
}

function mapExpand(){

  
  var map = document.getElementById("map-directions");
  var chat = document.getElementById("chat");
  if(map.style.height != "50%"){
    console.log("expand");
    map.style.height = '50%';
    calcRoute("karlaplan,stockholm","odenplan,stockholm");
  }
 
}
function mapShrink(){
  
  var map = document.getElementById("map-directions");
  if(map.style.height !== "10%"&&map.style.height !==""){
    console.log("shrink");
    map.style.height = "10%";
    calcRoute("karlaplan,stockholm","odenplan,stockholm");
  }
  
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
      // Chicago
      google.maps.event.addDomListener(controlDiv);
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);

    }

google.maps.event.addDomListener(window, 'load', initialize);
