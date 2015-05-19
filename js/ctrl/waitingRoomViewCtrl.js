var WaitingRoomViewCtrl = function(view,model,shakeCtrl){
	shakeCtrl.activateShake(function(){
		if(window.location.hash == "#waitingRoom"){
			if(window.navigator.vibrate){
				window.navigator.vibrate(1000);
			}
			if (model.state == 1){
				model.denyRequest()
			} 
			model.requestChat();
			}
		});

	view.randomButton.click(function(){
		if (model.state == 1){
			model.denyRequest()
		} 
		model.requestChat();
	});

	view.btnDeny.click(function(){
		model.denyRequest();
		$("#waitingRoomFooter").hide("fast");
	});

	view.btnAccept.click(function(){
		$("#waitingRoomFooter").hide("fast");
		model.acceptRequest();
	});
}