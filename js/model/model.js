//Model

var Model = function () {

  var model = this;

  // 0 - waitingRoom
  // 1 - sent REQ redan här borde användarna unsubba från waiting och gå in i ett privat rum ^^
  this.state = 0; //används state?
  
  this.observers = [];
  this.my = {id : null, pos : null, name : null, pic : "data:image/png;base64,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"};
  this.mate = {id : null, pos : null, name : null}; 
  this.chatRoom; //private chatroom or main channel (core of geohash);
  this.users = [];// all users online at the moment
  this.activeChannels = [];

  //Get UUID from user and specify PubNub keys
  var UUID = PUBNUB.db.get('session') || (function(){ 
    var uuid = PUBNUB.uuid(); 
    PUBNUB.db.set('session', uuid);
    console.log('uuid: ' + uuid);
    return uuid;
  })();
  this.my.id = UUID //sets your pubnub.uuid

  //initiate PubNub with keys
  var pubnub = this.pubnub = PUBNUB.init({
    	publish_key   : "pub-c-7fd548b4-2815-463d-9c1c-5187d45d49f5",
    	subscribe_key : "sub-c-bea78536-e9a9-11e4-91d3-0619f8945a4f",
    	uuid : UUID
  });
 
  // sets update intervall on herNow which updates the list of users
  setInterval(function(){
    hereNow()
  }, 1000);

  this.addObserver = function(obs){
    model.observers.push(obs);
  }

  this.notifyObservers = function(code){
    for (var i in this.observers){
      model.observers[i].update(code);
    }
  }

  this.subscribe = function(){
    //subscribes to all Activechannels (the active channels are defined in geohash)
  	pubnub.subscribe({
    	'channel'   : model.activeChannels,
    	'callback'  : function(msg) {
    		
      	if (model.my.id == msg.reciever){
      		console.log(msg);
      		if(msg.mtype==="REQ"){
            console.log('Request detected');
            model.mate = msg.sender;
            model.mate.pos = new google.maps.LatLng(msg.sender.pos.A,msg.sender.pos.F);
            givePosition(msg.sender.id);
            model.notifyObservers(['updateMatePos','requestPrompt']);
      		}
          else if(msg.mtype==="POS"){
            console.log('Position returned');
            model.mate = msg.sender;
            model.mate.pos = new google.maps.LatLng(msg.sender.pos.A,msg.sender.pos.F);
            model.notifyObservers(['updateMatePos','showRequest']);
          }
      		else if(msg.mtype==="RES") {
            console.log('response detected');
            model.enterChat(msg.sender.id,model.my.id);
      		}
      		else if(msg.mtype === "DEN"){
      			console.log('Denial detected');
            model.mate.pos = null;
            model.notifyObservers(['updateMatePos','hideRequest']);
      		}
      	}
    	},
    	presence: function(m){
        //at a presence event we need to update the users list using hereNow.
        //we use the intervall to ensure a better consistency due to some latency in the pubnub-service.
        hereNow()
    	}
    });
    hereNow();
  }

  var hereNow = function(){
    //updates user list to currently active users in the core(center room)
    pubnub.here_now({
      channel: model.chatRoom,
      callback: function(m){
        if(m.uuids){
          model.users = m.uuids;
        }else{//you are always online even if pubnub sometimes have other opinions..
          model.users = [model.my.id];
        }
        //console.log(model.users.length);
        $("#usersOnline").html(model.users.length + ' users online');
      }
    });
  }

  this.unsubAll = function() {
    //unsubscribes from all activeChannels
  	for(var x in model.activeChannels){
  		model.unsubscribe(model.activeChannels[x]);
  	}
    model.activeChannels =[];
  }

  this.requestChat = function(){
  	//gets random user to send a chatRequest to
    if (model.users.length > 1) { //Tests if there is an other user avalible to chat with
    	var chatPartner = model.randomElement(model.users);
      pubnub.publish({
        'channel' : model.chatRoom,
        'message' : {"mtype": "REQ", "sender": model.my, "reciever":chatPartner}
    	});
      model.state = 1;
      model.mate.id = chatPartner;
      model.notifyObservers(['sentTo']);
    }
    else {
      alert("There are no available partners in this area, please move.");
    }
  }

  var givePosition = function(initiator){
    //sends when an request is detected and confirms that it has arrived, with position.
    //skicka bekräftelse tillbaka
    console.log("Sending my positon");
    pubnub.publish({
          'channel' : model.chatRoom,
          'message' : {"mtype": "POS", "sender": model.my, "reciever":initiator}
      });
  }


  this.acceptRequest = function(){
  	//when a chat is accepted sends users to chat.
  	//skicka bekräftelse tillbaka
  	pubnub.publish({
          'channel' : model.chatRoom,
          'message' : {"mtype": "RES", "sender":model.my, "reciever":model.mate.id}
    	});
    	model.enterChat(model.my.id, model.mate.id);
  }

  this.denyRequest = function(){
    //when a chat is denied restores everything to startvalues.
    console.log("model deny " + model.mate.id);
  	pubnub.publish({
          'channel' : model.chatRoom,
          'message' : {"mtype": "DEN", "sender":model.my, "reciever":model.mate.id}
    	});
    model.mate.id = null;
    model.mate.pos = null;
    model.mate.name = null;
    model.notifyObservers(['updateMatePos'])
  }

  this.randomElement = function(userArray) {
  	//Randomizes users array and selects a random element
  	var lArray = $.extend(true, [], userArray); //deepc copy users
  	lArray.splice(lArray.indexOf(model.my.id),1);// take away yourself from the Array
  	var item = lArray[Math.floor(Math.random()*lArray.length)];
    return item; //selects a random element
  }

  this.enterChat = function(uuidA,uuidB) {
  	//Unsub från public channels
  	//sub to unique chatroom(uuidA+UUidB)
    //moves user to the chatroom
  	model.unsubAll();
    model.activeChannels.push(uuidA+':'+uuidB);
    window.location = "#chat";
    model.notifyObservers(["enterChat","hideRequest"]);
    console.log('Private chat room: ' + uuidA+':'+uuidB);
  }

  this.getLocation = function(callback) { 
    //gets the location from the smartphone
    	 if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          model.my.pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); //Fullösning att göra dessa publika?
          if(window.location.hash != "#chat"){ 
            callback(model.my.pos);
          }
        });
    	}
    	else { 
        	console.log("Geolocation is not supported by this browser.");
    	}
  }

  this.sendMsg = function(content) {
    //sends msg in private chatroom. 
    //(only one channel in activechannels which is the private chatroom)
    var timestamp = new Date();
    timestamp = ((timestamp.getHours() < 10)? "0":"") + timestamp.getHours() + ":" + ((timestamp.getMinutes() < 10)? "0":"") + timestamp.getMinutes();
    pubnub.publish({
      'channel' : model.activeChannels[0],
      'message' : {"mtype": "DEN", "sender": model.my, "reciever":model.mate, "content":content, "timestamp":timestamp}
    });
  }

  this.geohash = function( coord ) {
    //gets geohashed coordinates (always in integers to be asier to handle in subscribeChannels)
    var rez = Math.pow( 10,  2 );
    geohashLat = Math.floor(coord.A * rez);//returns an integer / rez;
    geohashLng = Math.floor(coord.F * rez);//returns an integer / rez;
    subscribeChannels(geohashLat, geohashLng);
    model.chatRoom = geohashLat+" : "+geohashLng;
  }

  var subscribeChannels = function(geohashLat, geohashLng){
    // subscribes to all the chatrooms close to you (3x3 rooms)
    //checks if you have moved and should change activechannels
    // in that case you only un/subscribes to the changed rooms.
    var newChannels = [];
    var channelChanged = false;
    for(var lat = geohashLat -1; lat <= geohashLat+1; lat++){
      for(var lng = geohashLng -1; lng <= geohashLng+1; lng++){
        newChannels.push(lat +" : "+ lng);
      }
    }
    for(var channel = 0; channel<9; channel++){
      if(model.activeChannels.indexOf(newChannels[channel]) === -1){
        //ny subscribe
        channelChanged = true;
        model.activeChannels.push(newChannels[channel]);
        //console.log("sub: "+ newChannels[channel])
      }
      if(newChannels.indexOf(model.activeChannels[channel]) === -1){
        //unsubscribe
        //console.log("unsub: "+ model.activeChannels[channel])
        model.unsubscribe(model.activeChannels[channel]);
        model.activeChannels.splice(channel, 1);
      }
    }
    if(channelChanged){
      model.subscribe();
    }
    
  }

  this.unsubscribe = function(channelName){
    //unsubscribes from a specific channel
    console.log('unsubbar från: ' + channelName)
    pubnub.unsubscribe({
      channel: channelName
    });
  }

  this.shareLocation = function(){
    //checks if you have already entered user information or not. and sends you to the right page.
    navigator.geolocation.getCurrentPosition(function(){
      if(!(localStorage.name && localStorage.img) ){
        console.log('skickar till profile')
        window.location = '#profile';
      }else{
        console.log('skickar till waitingRoom')
        window.location = '#waitingRoom';
      }
    },function(){alert("Location not found");window.location = '#shareLocation';});
  }

  this.getLocation(model.geohash);
}