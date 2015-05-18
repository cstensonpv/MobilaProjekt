var ChatViewCtrl = function(view,model){

	view.shrinkMap.click(function(){
		view.mapShrink()
	});

	view.expandMap.click(function(){
		view.mapExpand();
	});

	view.btnChat.click(function(){
		console.log("send msg: " + view.txtChat.val());
		model.sendMsg(view.txtChat.val());
		view.txtChat.val('');
	});

	view.btnLeave.click(function(){
		model.mate = {id : null, pos : null, name : null};
		model.notifyObservers(["updateMatePos"]);
		window.location = '#waitingRoom';
		model.getLocation( model.geohash );
		$("#chatOutput").html("");
	});

	//this is fine...
	// this.refreshController = function(){
	// 	console.log("refreshing controller")
	// 	$("#btnChat").click(function(){
	// 		console.log("send msg: " + $("#txtChat").val());
	// 		model.sendMsg($("#txtChat").val());
	// 		$("#txtChat").val('');
	// 	});
	// }

}