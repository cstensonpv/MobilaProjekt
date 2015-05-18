var WaitingRoomView = function(container,model,shakeCtrl){
	var wMapDiv = this.wMapDiv = $("#myMapPosition")[0];
	this.randomButton = $("#randomButton");
	this.btnDeny = $("#btnDeny");
	this.btnAccept = $("#btnAccept");
	this.header = $("#header");

	var mateLocation = null;
	var wMap;

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

	var setMatePos = function(){
		if(mateLocation != null || (mateLocation != null && model.mate.pos == null)){
			console.log("remove marker");
			mateLocation.setMap(null);
			$("#waitingRoomFooter").hide("fast");
		}
		if(model.mate.pos != null){
			console.log("set mate pos");
			console.log(wMap);
			console.log(model.mate.pos);
			console.log(model.my.pos)
		    mateLocation = new google.maps.Marker({
			    clickable: false,
			    icon: {url: "http://simile.mit.edu/timeline/api/images/dark-red-circle.png",
			      // This marker is 20 pixels wide by 32 pixels tall.
			      size: new google.maps.Size(16, 16),
			      // The origin for this image is 0,0.
			      origin: new google.maps.Point(0,0),
			      // The anchor for this image is the base of the flagpole at 0,32.
			      anchor: new google.maps.Point(8, 8)
			    },
			    shadow: null,
			    zIndex: 999,
			    map: wMap
			});

			mateLocation.setPosition(model.mate.pos);
		}
	}

	var requestPrompt = function(){
		console.log("emil feels chatty!")
		var promptBox = new google.maps.InfoWindow({content:'<div><img src="'+model.mate.pic+'" class="profileThumb"/><p>' + model.mate.name + ' wants to chat with you!</p></div>'})
		promptBox.open(wMap,mateLocation);
		$("#waitingRoomFooter").show("fast");
		$("#mateName").hide("fast");
	}


	var updateMap = function(){
		initialize();
		console.log("fixa kartan");
	}
	

	this.update = function(code){
		console.log("update view");
		for (var msg in code){
			if("updateMatePos" === code[msg]){
				setMatePos();
			}else if("requestPrompt" === code[msg]){
				requestPrompt();
			}else if("renderMap" === code[msg]){
				updateMap();
			}else if("hideRequest" === code[msg]){
				$("#mateName").hide("fast");
			}
		}
	}

	model.addObserver(this);
	initialize();



	var waitingRoomViewCtrl = new WaitingRoomViewCtrl(this, model,shakeCtrl);
}