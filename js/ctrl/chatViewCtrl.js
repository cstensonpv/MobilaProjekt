var ChatViewCtrl = function(view,model){
	
	// function that's beeing used when the map is collapsing to a smaller area
	view.shrinkMap.click(function(){
		view.mapShrink()
	});
	
	// function that's beeing used when the map is expanding to full screen
	view.expandMap.click(function(){
		view.mapExpand();
	});
	
	// listener on the 'Send Message' button, communicates with the model
	view.btnChat.click(function(){
		console.log("send msg: " + view.txtChat.val());
		model.sendMsg(view.txtChat.val());
		view.txtChat.val('');
	});
	
	// listener on the 'leave chat' button. The chatmate object is reset and we notify the views to update themselves.
	// the chat output is also beeing cleared.
	view.btnLeave.click(function(){
		model.mate = {id : null, pos : null, name : null};
		model.notifyObservers(["updateMatePos"]);
		window.location = '#waitingRoom';
		model.getLocation( model.geohash );
		$("#chatOutput").html("");
	});

	// At the beginning of the project we needed a function that refreshed the html elements as they were beeing rebuilt every time.
	// Later on, this 'bug' seemed to solve itself and therefore this code is outcommented.
	
	// this.refreshController = function(){
	// 	console.log("refreshing controller")
	// 	$("#btnChat").click(function(){
	// 		console.log("send msg: " + $("#txtChat").val());
	// 		model.sendMsg($("#txtChat").val());
	// 		$("#txtChat").val('');
	// 	});
	// }

}
