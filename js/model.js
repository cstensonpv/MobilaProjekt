//Model


//Get UUID from user and specify PubNub keys

var userId = PUBNUB.uuid();
var pubnub = PUBNUB.init({
  	publish_key   : "pub-c-7fd548b4-2815-463d-9c1c-5187d45d49f5",
  	subscribe_key : "sub-c-bea78536-e9a9-11e4-91d3-0619f8945a4f",
});
var users;

function subscribe(channel){
  pubnub.subscribe({
    'channel'   : channel,
    'callback'  : function(message) {
    //  if(heading == message.heading){
        if (message.id == id){
          var user = "Me";
          var msgType = "myMsg"
        }else{
          var user = message.user;
          var msgType = "theirMsg"
        }
        output.html(output.html() + '<div class="'+msgType+'"><b>' + user +"</b> (" + message.timestamp + "):<br/>" + message.msg + '</div>');
        output.animate({scrollTop: output[0].scrollHeight - output.height()}, 500);
    //  }
    },
    presence: function(m){
    	users=m.uuids;
    }
  });
}


// send messages
buttonSend.on('click', function() {
  var timestamp = new Date();
  timestamp = ((timestamp.getHours() < 10)? "0":"") + timestamp.getHours() + ":" + ((timestamp.getMinutes() < 10)? "0":"") + timestamp.getMinutes();

  pubnub.publish({
    'channel' : channel,
    'message' : {"msg": msg.val(), "heading":heading, "user":user, "timestamp":timestamp, "id":id}
  });
  msg.val("");
});

// check history
buttonHistory.on('click', function() {
  getHistory();
});

function getHistory(){
  output.html("");
  pubnub.history({
    count : 100,
    channel : channel,
    callback : function (message) {
      for(var x in message[0]){
    //    if(message[0][x].heading == heading){
          if (message[0][x].id == id){
            var user = "Me";
            var msgType = "myMsg"
          }else{
            var user = message[0][x].user;
            var msgType = "theirMsg"
          }
          output.html(output.html() + '<div class="' + msgType + '"><b> Sir ' + user +" </b>(" + message[0][x].timestamp + "):<br/>" + message[0][x].msg + '</div>');
      //  }
      }
    }
  });
  output.animate({scrollTop: output[0].scrollHeight - output.height()}, 0);
}



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