//app.js
$(function () {
	//instantierar modellen i appen
	var model = new Model();
	//Här instantierar vi resten av views och controllers
	var chatView = new ChatView($("#chat"), model);
	var shakeCtrl = new ShakeCtrl();
	var cropCtrl = new CropCtrl(model);
	var waitingRoomView = new WaitingRoomView($("#chat"), model,shakeCtrl);
	var profileView = new ProfileView($("#profile"), model, cropCtrl);


});
