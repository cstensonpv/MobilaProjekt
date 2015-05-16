var ProfileCtrl = function(view,model){

	view.selectPic.change(function(evt){
		console.log("Nu körs picChange");
		view.picChange(evt);
	});


	view.sendName.click(function() {
		view.takePic();
	})

	//http://www.html5rocks.com/en/tutorials/getusermedia/intro/

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