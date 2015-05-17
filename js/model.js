//Model

var Model = function () {

  var model = this;
  //this.usrLatLng = "falsk frukt";
  this.state = 0;

  // 0 - waitingRoom
  // 1 - sent REQ redan här borde användarna unsubba från waiting och gå in i ett privat rum ^^
  
  this.observers = [];
  this.my = {id : null, pos : null, name : "Me!!"};
  this.mate = {id : null, pos : null, name : null}; //man borde ha ett eget sådant här obj också
  this.chatRoom; //Det rum två chattande personer är i
  this.users = [];
  this.usersPos = {};
  this.activeChannels = [];

  

  //Get UUID from user and specify PubNub keys
  var UUID = PUBNUB.db.get('session') || (function(){ 
    var uuid = PUBNUB.uuid(); 
    PUBNUB.db.set('session', uuid);
    console.log(uuid);
    return uuid;
  })();


  var pubnub = this.pubnub = PUBNUB.init({
    	publish_key   : "pub-c-7fd548b4-2815-463d-9c1c-5187d45d49f5",
    	subscribe_key : "sub-c-bea78536-e9a9-11e4-91d3-0619f8945a4f",
    	uuid : UUID
  });
  this.my.id = UUID//pubnub.uuid();

  this.addObserver = function(obs){
    model.observers.push(obs);
  }

  this.notifyObservers = function(code){
    for (var i in this.observers){
      model.observers[i].update(code);
    }
  }

  this.subscribe = function(){
  	// unsubscribe
  	//subscribe till det allmänna för gällande geo hash samt de intillliggande
  	//dvs subscrive till lat:long , lat+1:long, lat-1:long, lat:long+1 osv
  	//bevaka public channel
  	//for(var i in geoHash){}
  	//model.unsubAll();
  	//model.activeChannels.push("waitingRoom"); //byt med geo
  	pubnub.subscribe({
    	'channel'   : model.activeChannels, //byt ut sedan
    	'callback'  : function(msg) {
        //console.log(msg.mtype);
    		
      	if (model.my.id == msg.reciever){
      		console.log(msg);
      		if(msg.mtype==="REQ"){
            console.log('Request detected');//notifyObservers(); //respondToRequest(msg.sender);
            model.mate = msg.sender;
            model.mate.pos = new google.maps.LatLng(msg.sender.pos.A,msg.sender.pos.F);
            givePosition(msg.sender.id);
            model.notifyObservers(['updateMatePos','requestPrompt']);
      		}
          else if(msg.mtype==="POS"){
            console.log('Position returned');//notifyObservers(); //respondToRequest(msg.sender);
            model.mate = msg.sender;
            model.mate.pos = new google.maps.LatLng(msg.sender.pos.A,msg.sender.pos.F);
            model.notifyObservers(['updateMatePos']);
          }
      		else if(msg.mtype==="RES") {
            console.log('response detected');//notifyObservers(); //
            model.enterChat(msg.sender.id,model.my.id);
            //notifyObservers('');
      		}
      		else if(msg.mtype === "DEN"){
      			console.log('Denial detected');//notifyObservers(); //sök efter ny partner?
            model.mate.pos = null;
            model.notifyObservers(['updateMatePos']);
      		}
          ///////////////////////////
      	}else if(msg.mtype==="OPO"){
          //console.log('ONLYPosition returned');//notifyObservers(); //respondToRequest(msg.sender);
          //console.log(msg.sender.id +" : "+msg.sender.pos.A+" : "+msg.sender.pos.F);
          model.usersPos[msg.sender.id] = msg.sender //new google.maps.LatLng(msg.sender.pos.A,msg.sender.pos.F);

      }
    	},
    	presence: function(m){
        console.log(this.channel);
        if (m.action === "join" && model.users.indexOf(m.uuid) === -1){
    		  model.users.push(m.uuid);
          //model.sendPosition();
          console.log("pushat i presence! "+ m.uuid);
        }else if (m.action === "timeout" || m.action === "leave"){
          console.log(m.action);
          if(model.users.indexOf(m.uuid) != -1){
            console.log( m.uuid)
            model.users.splice(model.users.indexOf(m.uuid),1);
          }
        }
    	}
    });
    hereNow();
  }

  var hereNow = function(){
    for(var closeChannel in model.activeChannels){
      pubnub.here_now({
        channel: model.activeChannels[closeChannel],
        callback: function(m){
          for(var user in m.uuids){
            if(model.users.indexOf(m.uuids[user]) === -1){
              console.log('pushar user i here_now!');
              model.users.push(m.uuids[user]);
            } 
          }
        }
      });
    }
  }

  this.unsubAll = function() {
  	for(var x in model.activeChannels){
  		model.unsubscribe(model.activeChannels[x]);
  	}
    model.activeChannels =[];
  }

  this.requestChat = function(partnerUuid){

    console.log(partnerUuid);
  	//slumpa någon ur waitingRoom och skicka en request
    if (model.users.length > 1) { //Om det finns andra att chatta med än en själv
      if(!partnerUuid){
        var chatPartner = model.randomElement(model.users); //Väljer en random chatpartner
      }else{
        var chatPartner = model.users[model.users.indexOf(partnerUuid)];
      }
    	console.log(chatPartner);
      console.log(model.my.id);
      pubnub.publish({
        'channel' : model.chatRoom,
        'message' : {"mtype": "REQ", "sender": model.my, "reciever":chatPartner}
    	});
      model.state = 1;
      model.mate.id = chatPartner;
    }
    else {
      alert("There are no available partners in this area, please move.");
    }
  }
/////////////////////
  this.sendPosition = function(){
    pubnub.publish({
      'channel' : model.chatRoom,
      'message' : {"mtype": "OPO", "sender": model.my},
    });
  }
////////////////////////

  var givePosition = function(initiator){
    //slumpad användare blir tillfrågad
    //skicka bekräftelse tillbaka
    console.log("Sending my positon");
    pubnub.publish({
          'channel' : model.chatRoom,
          'message' : {"mtype": "POS", "sender": model.my, "reciever":initiator}
      });
  }


  this.acceptRequest = function(){
  	//slumpad användare blir tillfrågad
  	//skicka bekräftelse tillbaka
  	pubnub.publish({
          'channel' : model.chatRoom,
          'message' : {"mtype": "RES", "sender":model.my, "reciever":model.mate.id}
    	});
    	model.enterChat(model.my.id, model.mate.id);
  }

  this.denyRequest = function(){
  	//slumpad användare blir tillfrågad
  	//skicka bekräftelse tillbaka
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
    console.log(lArray);
  	lArray.splice(lArray.indexOf(model.my.id),1);
    console. log(lArray);
  	var item = lArray[Math.floor(Math.random()*lArray.length)];
    console.log("Request: " + item);
    return item; //selects a random element
  }

  this.enterChat = function(uuidA,uuidB) {
  	//Unsub från public channels
  	//sub to unique (uuidA+UUidB)
  	model.unsubAll();
    // pubnub.subscribe({
    //   'channel'   : uuidA+':'+uuidB,
    //   'callback'  : function(msg) {
    //     if (msg.sender === model.my.pos) {
    //       $("#output").append(printMsg("sentMsg", msg.contents, msg.sender)); //senare ska vi skicka namn istället för msg.sender
    //     }
    //     else {
    //       $("#output").append(printMsg("recievedMsg", msg.contents, msg.reciever));
    //     }
    //   }
    // });
    model.activeChannels.push(uuidA+':'+uuidB);
    window.location = "#chat";
    model.notifyObservers(["enterChat"]);
    console.log(uuidA+':'+uuidB);
  }

  // this.leaveChat = function() {
  //   pubnub.unsubscribe({
  //     'channel' : chatRoom //unsubscribear en från aktuellt chatrum
  //   })
  // 	//unsub från unique/s
  // 	//call waitingRoom()

  // }

  this.getLocation = function(callback) { //tar fram koordinater
    	 if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          model.my.pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); //Fullösning att göra dessa publika?
          callback(model.my.pos);

          ////////////////////////////
          model.sendPosition();//skickar din egen position till alal andra
          model.notifyObservers(['updateUserPositions'])
        });
    	}
    	else { 
        	console.log("Geolocation is not supported by this browser.");
    	}
  }


//detta borde ske i ctrl
  // this.printMsg = function(id, msg, name){
  //   return '<div id='+id+'>' + msg+" : "+name+'</div>';
  // }

  this.sendMsg = function(content) {
    var timestamp = new Date();
    timestamp = ((timestamp.getHours() < 10)? "0":"") + timestamp.getHours() + ":" + ((timestamp.getMinutes() < 10)? "0":"") + timestamp.getMinutes();
    pubnub.publish({
      'channel' : model.activeChannels[0],
      'message' : {"mtype": "DEN", "sender": model.my, "reciever":model.mate, "content":content, "timestamp":timestamp}
    });
  }

  this.geohash = function( coord, resolution ) {
    var rez = Math.pow( 10, resolution || 0 );
    geohashLat = Math.floor(coord.A * rez);//returns an integer / rez;
    geohashLng = Math.floor(coord.F * rez);//returns an integer / rez; 
    subscribeChannels(geohashLat, geohashLng);
    model.chatRoom = geohashLat+" : "+geohashLng;
  }

  var subscribeChannels = function(geohashLat, geohashLng){
      
    var newChannels = [];
    var channelChanged = false;
    //console.log(model.activeChannels);
    //console.log(geohashLat);
    for(var lat = geohashLat -1; lat <= geohashLat+1; lat++){
      for(var lng = geohashLng -1; lng <= geohashLng+1; lng++){
        newChannels.push(lat +" : "+ lng);
      }
    }
    //console.log(newChannels);
    for(var channel = 0; channel<9; channel++){
      if(model.activeChannels.indexOf(newChannels[channel]) === -1){
        //ny subscribe
        channelChanged = true;
        model.activeChannels.push(newChannels[channel]);
        //console.log("sub: "+ newChannels[channel])
      }
      if(newChannels.indexOf(model.activeChannels[channel]) === -1){
        //unsubscribe
        //console.log(activeChannels);
        channelChanged = true;
        console.log("unsub: "+ model.activeChannels[channel])
        model.unsubscribe(model.activeChannels[channel]);
        model.activeChannels.splice(channel, 1);
      }
    }
    model.subscribe();
    //console.log(model.activeChannels);
  }

  this.unsubscribe = function(channelName){
    console.log('unsubbar från: ' + channelName)
    pubnub.unsubscribe({
      channel: channelName
    });
  }

  this.getLocation( model.geohash );
  
}