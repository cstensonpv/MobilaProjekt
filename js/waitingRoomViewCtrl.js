var WaitingRoomViewCtrl = function(view,model){
	//console.log(view.randomButton);
	view.randomButton.click(function(){
		if (model.state == 1){
			model.denyRequest()
		} 
		model.requestChat();
	});

	view.btnDeny.click(function(){
		console.log("deny")
		model.denyRequest();
	});
	view.btnAccept.click(function(){
		model.acceptRequest();
	});
}