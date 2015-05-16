//app.js
$(function () {
	//instantierar modellen i appen
	
	var model = new Model();
	console.log(model);
	//Här instansierar vi resten av views och controllers
	var chatView = new ChatView($("#chat"), model);
	//var startView = new StartView($("#chat"), model);
	var shakeCtrl = new ShakeCtrl();
	var waitingRoomView = new WaitingRoomView($("#chat"), model,shakeCtrl);
	var profileView = new ProfileView($("#profile"), model);
	//var profileCtrl = new ProfileCtrl(profileView, model);

});