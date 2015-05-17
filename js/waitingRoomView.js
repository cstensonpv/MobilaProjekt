var WaitingRoomView = function(container,model,shakeCtrl){
	//this.randomButton = container.find("#randomButton");
	var wMapDiv = this.wMapDiv = $("#myMapPosition")[0];
	this.randomButton = $("#randomButton");
	this.btnDeny = $("#btnDeny");
	this.btnAccept = $("#btnAccept");
	this.header = $("#header");

	console.log(this.header.height());
	var mateLocation = null;
	var wMap;

	var initialize = function() {
		wMapDiv.style.height = window.innerHeight.toFixed(0)-44 + 'px';
	    console.log("Initializing google maps");
	    var stockholm = new google.maps.LatLng(59.3275, 18.0675);
	    var mapOptions = {
	      zoom:12,
	      center: stockholm,
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
	}

	var setMatePos = function(){
		if(mateLocation != null || (mateLocation != null && model.mate.pos == null)){
			console.log("remove marker");
			mateLocation.setMap(null);
		}
		if(model.mate.pos != null){
			console.log("set mate pos");
			console.log(wMap);
			console.log(model.mate.pos);
			console.log(model.my.pos)
		    mateLocation = new google.maps.Marker({
			    clickable: false,
			    icon: new google.maps.MarkerImage('http://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Red_pog.svg/64px-Red_pog.svg.png',
	                new google.maps.Size(22,22),
	                new google.maps.Point(0,18),
	                new google.maps.Point(11,11)),
			    shadow: null,
			    zIndex: 999,
			    map: wMap
			});

			mateLocation.setPosition(model.mate.pos);
		}
	}

	var requestPrompt = function(){
		console.log("emil feels chatty!")
		var promptBox = new google.maps.InfoWindow({content:'<div>' + model.mate.name + ' wants to chat with you!</div>'})
		promptBox.open(wMap,mateLocation);
		$("#waitingRoomFooter").show("fast");
	}


	this.update = function(code){
		console.log("update view");
		for (var msg in code){
			if("updateMatePos" === code[msg]){
				setMatePos();
			}else if("requestPrompt" === code[msg]){
				requestPrompt();
			}
		}
	}

	model.addObserver(this);
	initialize();
	var waitingRoomViewCtrl = new WaitingRoomViewCtrl(this, model,shakeCtrl);
}