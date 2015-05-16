var WaitingRoomViewCtrl = function(view,model,shakeCtrl){
	//console.log(view.randomButton);
	console.log(shakeCtrl);
	shakeCtrl.activateShake(function(){
		window.navigator.vibrate(1000);
		if (model.state == 1){
			model.denyRequest()
		} 
		model.requestChat();
		});

	view.randomButton.click(function(){
		window.navigator.vibrate(1000);
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