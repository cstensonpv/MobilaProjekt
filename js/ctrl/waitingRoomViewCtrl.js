var WaitingRoomViewCtrl = function(view,model,shakeCtrl){
	// If user shakes the phone, it vibrates and sends a request to a random person. If a previous request is still pending, we clear that request.
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
	
	// If user clicks on the 'Shake' button a request is sent to a random person. If a previous request is still pending, we clear that request.
	view.randomButton.click(function(){
		if (model.state == 1){
			model.denyRequest()
		} 
		model.requestChat();
	});
	
	// onClick listener for the 'Deny' button.
	view.btnDeny.click(function(){
		model.denyRequest();
		$("#waitingRoomFooter").hide("fast");
	});
	
	// onClick listener for the 'Accept' button.
	view.btnAccept.click(function(){
		$("#waitingRoomFooter").hide("fast");
		model.acceptRequest();
	});
}
