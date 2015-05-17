var WaitingRoomView = function(container,model,shakeCtrl){
	//this.randomButton = container.find("#randomButton");
	var wMapDiv = this.wMapDiv = $("#myMapPosition")[0];
	this.randomButton = $("#randomButton");
	this.btnDeny = $("#btnDeny");
	this.btnAccept = $("#btnAccept");
	this.header = $("#header");

	//console.log(this.header.height());
	var mateLocation = null;
	var wMap;
	var usersMarkers={};
	var other_image = {
      url: "http://katehazlittnd.ca/site/wp-content/plugins/sexybookmarks/images/circle_yellow.png",
      // This marker is 20 pixels wide by 32 pixels tall.
      size: new google.maps.Size(16, 16),
      // The origin for this image is 0,0.
      origin: new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      anchor: new google.maps.Point(8, 8)
    };

    var request_image = {
      url: "http://simile.mit.edu/timeline/api/images/dark-red-circle.png",
      // This marker is 20 pixels wide by 32 pixels tall.
      size: new google.maps.Size(16, 16),
      // The origin for this image is 0,0.
      origin: new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      anchor: new google.maps.Point(8, 8)
    };
    

	var initialize = function() {
		wMapDiv.style.height = window.innerHeight.toFixed(0)-44 + 'px';
	    var mapOptions = {
	      zoom:12,
	      center: model.my.pos,
	      disableDefaultUI: true
	    };

	    wMap = new google.maps.Map(wMapDiv, mapOptions);
	    model.getLocation(function(pos){wMap.setCenter(pos)});

	    var myLocation = new google.maps.Marker({
		    clickable: false,
		    icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
                new google.maps.Size(22,22),
                new google.maps.Point(0,18),
                new google.maps.Point(11,11)),
		    shadow: null,
		    zIndex: 998,
		    map: wMap
		});


	    
	   	var updateMyLocation = function(pos){
	    	myLocation.setPosition(pos);
	    }
	    setInterval(function(){
	    	model.getLocation(updateMyLocation);
	    }, 200);

		$(document).bind('pageshow',function(event, data){
			console.log("wop");
			google.maps.event.trigger(wMap,'resize');
			wMap.setCenter(model.my.pos);
		});
	}

	var setMatePos = function(uuid){
		console.log("setmate "+uuid);
		if(model.mate.pos != null){
			console.log(usersMarkers[uuid]);
			//usersMarkers[uuid].setIcon = request_image;

			console.log("set mate pos");
			//console.log(wMap);
			//console.log(model.mate.pos);
			//console.log(model.my.pos)
			//marker.setIcon= request_image;

			//return addMarker(request_image,model.mate.pos,"Request sent!");
		}
	}

	var addMarker = function(image, LatLng, content){ // skapar en ny marker och om content finns med ett info
      console.log(content);
      var newMarker = new google.maps.Marker({
        map:wMap,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: LatLng,
        icon: image 
      })
      if(content){
      	console.log("addscontent");
        var info = new google.maps.InfoWindow({
              content: content
          });
        info.open(wMap,newMarker);
        google.maps.event.addListener(newMarker, 'click', function() {
            info.open(wMap,newMarker);
          });
      }
      return newMarker;     
    }

	var requestPrompt = function(uuid){
		console.log("emil feels chatty!")
		var promptBox = new google.maps.InfoWindow({content:'<div><img src="'+model.mate.pic+'" class="profileThumb"/><p>' + model.mate.name + ' wants to chat with you!</p></div>'})
		promptBox.open(wMap,usersMarkers[uuid]);
		$("#waitingRoomFooter").show("fast");
	}

	var updateUserPositions = function(usersPos){
		for(user in usersPos){
			if(user != model.my.id){
				var pos = new google.maps.LatLng(usersPos[user].pos.A,usersPos[user].pos.F);
				if(usersMarkers[user]){
					changeMarkerPosition(usersMarkers[user],pos);
				}else{
					var button = document.createElement("button");
					button.onclick = function(){model.requestChat(user)}; 
					var textnode = document.createTextNode("Request chat with "+usersPos[user].name);
					button.appendChild(textnode);
					var content="<button onclick='model.requestChat("+user+")'> Request chat with "+usersPos[user].name +"</button>";
					usersMarkers[user] = addMarker(other_image,pos,button);
				};
			}
		}
		//console.log("userMarkers");
		//console.log(usersMarkers);
	}

	function changeMarkerPosition(marker,newLatLng){
		//console.log(marker);
		marker.setPosition(newLatLng);
		//console.log("updates Marker position");
	}	


	var updateMap = function(){
		initialize();
		console.log("fixa kartan");
	}
	

	this.update = function(code){
		//console.log("update view");
		for (var msg in code){
			if("updateMatePos" === code[msg]){
				console.log(model.mate.id)
				setMatePos(model.mate.id);
			}else if("requestPrompt" === code[msg]){
				requestPrompt(model.mate.id);
			}else if("updateUserPositions" === code[msg]){
				//console.log("update positions");
				updateUserPositions(model.usersPos);
			}else if("renderMap" === code[msg]){
				updateMap();
			}
		}
	}

	model.addObserver(this);
	initialize();



	var waitingRoomViewCtrl = new WaitingRoomViewCtrl(this, model,shakeCtrl);
}