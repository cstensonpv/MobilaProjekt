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

}