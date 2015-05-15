var ChatViewCtrl = function(view,model){

	view.shrinkMap.click(function(){
		view.mapShrink()
	});

	view.expandMap.click(function(){
		view.mapExpand();
	});

}