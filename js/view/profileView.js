var ProfileView = function(container, model, cropCtrl){
  this.sendName = $('#sendName');
  this.selectPic = $('#selectPic');
  this.photoCanvas = document.getElementById("capturedPhoto"); //måste vara ett pure canvas obj, kan inte vara jQuery
  this.video = document.getElementById("video");
  this.body = $('#body');

  model.shareLocation(); // user location is collected and stored.

  // Checks if the user has stored information in the localStorage.
  if (localStorage.name && localStorage.img) {
    model.my.name = localStorage.getItem("name");
    model.my.pic = localStorage.getItem("img");
    console.log("Cookies finns sparade sedan tidigare")
    window.location.hash = "#waitingRoom";
  }
  else {
    console.log("Cookies finns inte sparade");
  }

  this.errBack = function(error) {
    console.log("Video capture error: ", error.code); 
  };

  var profileCtrl = new ProfileCtrl(this, model, cropCtrl);
}
