var WaitingRoomViewCtrl = function(view,model,shakeCtrl){
	//console.log(view.randomButton);
	shakeCtrl.activateShake(function(){
		if(window.navigator.vibrate){
			window.navigator.vibrate(1000);
		}else{
			console.log("shaek");
		}
		if (model.state == 1){
			model.denyRequest()
		} 
		model.requestChat();
		});

	view.randomButton.click(function(){
		//window.navigator.vibrate(1000);
		if (model.state == 1){
			model.denyRequest()
		} 
		model.requestChat();
	});

	view.btnDeny.click(function(){
		console.log("deny")
		model.denyRequest();
		$("#waitingRoomFooter").hide("fast");
	});
	view.btnAccept.click(function(){
		model.acceptRequest();
		$("#waitingRoomFooter").hide("fast");
	});
}