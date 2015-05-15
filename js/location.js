//Location services

function geohash( coord, resolution ) {
var rez = Math.pow( 10, resolution || 0 );
return Math.floor(coord * rez) / rez;
}

function getCoord(position) { //Callback-funktion som hanterar
	var usrLat = position.coords.latitude; //Fullösning att göra dessa publika?
	var usrLng = position.coords.longitude;
	geohashChannel = geohash(position.coords.latitude,2) + '' + geohash(position.coords.longitude,2); //Geohashar området till en kanal
	console.log(geohashChannel);
}

function getLocation() { //tar fram koordinater
  	if (navigator.geolocation) {
      	navigator.geolocation.getCurrentPosition(getCoord);
  	}
  	else { 
      	console.log("Geolocation is not supported by this browser.");
  	}
}

var mapOptions = {
	zoom: currZoom,
	center: new google.maps.LatLng(lat, lng),
	//disableDefaultUI: true,
	panControl: false,
	zoomControl: false,
	mapTypeControl: false,
	scaleControl: false,
	streetViewControl: false,
	overviewMapControl: false,
	draggable: false,
	disableDoubleClickZoom: true
}
map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions); //fullösning att göra denna publik?