//Model


//Get UUID from user and specify PubNub keys
var usrLat;
var usrLng;

var UUID = PUBNUB.db.get('session') || (function(){ 
  var uuid = PUBNUB.uuid(); 
  PUBNUB.db.set('session', uuid);
  console.log(uuid);
  return uuid; 
})();


var pubnub = PUBNUB.init({
  	publish_key   : "pub-c-7fd548b4-2815-463d-9c1c-5187d45d49f5",
  	subscribe_key : "sub-c-bea78536-e9a9-11e4-91d3-0619f8945a4f",
  	uuid : UUID
});
var userId = UUID//pubnub.uuid();
var users =[];
var activeChannels = ['moo']

setInterval(getLocation(), 1000);
console.log(userId);


function waitingRoom(){
	// unsubscribe
	//subscribe till det allmänna för gällande geo hash samt de intillliggande
	//dvs subscrive till lat:long , lat+1:long, lat-1:long, lat:long+1 osv
	//bevaka public channel
	//for(var i in geoHash){}
	unsubAll();
	activeChannels.push("waitingRoom"); //byt med geo
	pubnub.subscribe({
    	'channel'   : 'waitingRoom', //byt ut sedan
    	'callback'  : function(msg) {
    		
        	if (userId === msg.reciever || userId === msg.sender){
        		console.log(msg);
          		if(msg.mtype==="RES") {
          			console.log('response detected');//notifyObservers(); //enterChat(msg.sender ,userId);
          		}
          		else if(msg.mtype==="REQ"){
          			console.log('Request detected');//notifyObservers(); //respondToRequest(msg.sender);
          		}
          		else if(msg.mtype === "DEN"){
          			console.log('Denial detected');//notifyObservers(); //sök efter ny partner?
          		}
        	}
    	},
    	presence: function(m){
    		console.log(m);
    		users.push(m.uuid);
    	}
  	});
}

function unsubAll() {
	for(var x in activeChannels){
		pubnub.unsubscribe({'channel': activeChannels[x]})
		activeChannels = [];
	}
}

function requestChat(){
	//slumpa någon ur waitingRoom och skicka en request
	var randomReciever = randomElement(users);
	pubnub.publish({
        'channel' : 'waitingRoom',
        'message' : {"mtype": "REQ", "sender":userId, "reciever":randomReciever}
  	});
}

function acceptRequest(initiator){
	//slumpad användare blir tillfrågad
	//skicka bekräftelse tillbaka
	pubnub.publish({
        'channel' : 'waitingRoom',
        'message' : {"mtype": "RES", "sender":userId, "reciever":initiator}
  	});
  	enterChat(userId, initiator);
}

function denyRequest(initiator){
	//slumpad användare blir tillfrågad
	//skicka bekräftelse tillbaka
	pubnub.publish({
        'channel' : 'waitingRoom',
        'message' : {"mtype": "DEN", "sender":userId, "reciever":initiator}
  	});
}

function randomElement() {
	//Randomizes users array and selects a random element
	var array = users;
	for (var id in array) {
		if (array[id] === userId){
			array.splice(id,1);
			break;
		}
	}
	var item = array[Math.floor(Math.random()*array.length)];
  	return item; //selects a random element
}

function enterChat(uuidA,uuidB) {
	//Unsub från public channels
	//sub to unique (uuidA+UUidB)
	unsubAll();

}
function leaveChat() {
	//unsub från unique/s
	//call waitingRoom()

}

function getLocation() { //tar fram koordinater
  	if (navigator.geolocation) {
      	navigator.geolocation.getCurrentPosition(getCoord);
  	}
  	else { 
      	console.log("Geolocation is not supported by this browser.");
  	}
}

function getCoord(position) { //Callback-funktion som hanterar
	usrLat = position.coords.latitude; //Fullösning att göra dessa publika?
	usrLng = position.coords.longitude;
	//geohashChannel = geohash(position.coords.latitude,2) + '' + geohash(position.coords.longitude,2); //Geohashar området till en kanal
	//console.log(geohashChannel);
}
/*

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
*/