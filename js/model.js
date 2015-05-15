//Model

var Model = function () {

  var model = this;
  this.usrLatLng = "falsk frukt";
  this.state = 0;

  // 0 - waitingRoom
  // 1 - sent REQ redan här borde användarna unsubba från waiting och gå in i ett privat rum ^^
  
  this.observers = [];
  this.mate = {id : null, pos : null, name : null}; //man borde ha ett eget sådant här obj också
  model.chatRoom; //Det rum två chattande personer är i
  // this.matePos = null;
  // this.mateID = null;


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
  var userId = UUID//pubnub.uuid();
  var users = [];
  model.activeChannels = ['moo'];

  
  console.log(userId);

  this.addObserver = function(obs){
    this.observers.push(obs);
  }

  this.notifyObservers = function(code){
    for (var i in this.observers){
      this.observers[i].update(code);
    }
  }

  this.waitingRoom = function(){
  	// unsubscribe
  	//subscribe till det allmänna för gällande geo hash samt de intillliggande
  	//dvs subscrive till lat:long , lat+1:long, lat-1:long, lat:long+1 osv
  	//bevaka public channel
  	//for(var i in geoHash){}
  	this.unsubAll();
  	model.activeChannels.push("waitingRoom"); //byt med geo
  	pubnub.subscribe({
      	'channel'   : 'waitingRoom', //byt ut sedan
      	'callback'  : function(msg) {
      		
          	if (userId === msg.reciever){
          		console.log(msg);
            		if(msg.mtype==="REQ"){
                  console.log('Request detected');//notifyObservers(); //respondToRequest(msg.sender);
                  model.mate.pos = new google.maps.LatLng(msg.pos.A,msg.pos.F);
                  model.mate.id = msg.sender;
                  givePosition(msg.sender);
                  model.notifyObservers(['updateMatePos','requestPrompt']);
            		}
                else if(msg.mtype==="POS"){
                  console.log('Position returned');//notifyObservers(); //respondToRequest(msg.sender);
                  model.mate.pos = new google.maps.LatLng(msg.pos.A,msg.pos.F);
                  model.notifyObservers(['updateMatePos']);
                }
            		else if(msg.mtype==="RES") {
                  console.log('response detected');//notifyObservers(); //
                  model.enterChat(msg.sender ,userId);
                  //notifyObservers('');
            		}
            		else if(msg.mtype === "DEN"){
            			console.log('Denial detected');//notifyObservers(); //sök efter ny partner?
                  model.mate.pos = null;
                  model.notifyObservers(['updateMatePos']);
            		}
          	}
      	},
      	presence: function(m){
          if (m.action === "join"){
      		  users.push(m.uuid);
          }else if (m.action === "timeout" || m.action === "leave"){
            users.splice(users.indexOf(m.uuid),1);
          }
      	}
    	});
  }

  this.unsubAll = function() {
  	for(var x in model.activeChannels){
  		pubnub.unsubscribe({'channel': model.activeChannels[x]})
  	}
  model.activeChannels = [];
  }

  this.requestChat = function(){
  	//slumpa någon ur waitingRoom och skicka en request
    if (users.length > 1) { //Om det finns andra att chatta med än en själv
    	var chatPartner = this.randomElement(users); //Väljer en random chatpartner
    	pubnub.publish({
        'channel' : 'waitingRoom',
        'message' : {"mtype": "REQ", "sender":userId, "reciever":chatPartner, 'pos' : model.usrLatLng}
    	});
      model.state = 1;
      model.mate.id = chatPartner;
    }
    else {
      alert("There are no available partners in this area, please move.");
    }
  }

  var givePosition = function(initiator){
    //slumpad användare blir tillfrågad
    //skicka bekräftelse tillbaka
    console.log(model.usrLatLng);
    pubnub.publish({
          'channel' : 'waitingRoom',
          'message' : {"mtype": "POS", "sender":userId, "reciever":initiator, 'pos' : model.usrLatLng}
      });
  }


  this.acceptRequest = function(){
  	//slumpad användare blir tillfrågad
  	//skicka bekräftelse tillbaka
  	pubnub.publish({
          'channel' : 'waitingRoom',
          'message' : {"mtype": "RES", "sender":userId, "reciever":model.mate.id}
    	});
    	model.enterChat(userId, model.mate.id);
  }

  this.denyRequest = function(){
  	//slumpad användare blir tillfrågad
  	//skicka bekräftelse tillbaka
    console.log("model deny " + model.mate.id);
  	pubnub.publish({
          'channel' : 'waitingRoom',
          'message' : {"mtype": "DEN", "sender":userId, "reciever":model.mate.id}
    	});
    model.mate.id = null;
    model.mate.pos = null;
    model.mate.name = null;
    model.notifyObservers(['updateMatePos'])
  }

  this.randomElement = function() {
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

  this.enterChat = function(uuidA,uuidB) {
  	//Unsub från public channels
  	//sub to unique (uuidA+UUidB)
  	model.unsubAll();
    // pubnub.subscribe({
    //   'channel'   : uuidA+':'+uuidB,
    //   'callback'  : function(msg) {
    //     if (msg.sender === userId) {
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

  this.leaveChat = function() {
    pubnub.unsubscribe({
      'channel' : chatRoom //unsubscribear en från aktuellt chatrum
    })
  	//unsub från unique/s
  	//call waitingRoom()

  }

  this.getLocation = function(callback) { //tar fram koordinater
    	 if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          model.usrLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); //Fullösning att göra dessa publika?
          callback(model.usrLatLng);
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

  // this.sendMsg = function(contents) {
  //   pubnub.publish({
  //     'channel' : chatRoom,
  //     'message' : {"contents" : contents, "sender" : userId, "reciever" : chatPartner}
  //   });
  // }
//kanske kan vara lite längre?
  this.waitingRoom()
  
}