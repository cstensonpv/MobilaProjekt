var ProfileView = function(container, model){
  console.log("profileview");
  this.sendName = $('#sendName');
  this.selectPic = $('#selectPic');
  this.photoCanvas = document.getElementById("capturedPhoto"); //måste vara ett pure canvas obj, kan inte vara jQuery
  this.video = document.getElementById("video");
  this.body = $('#body');
  this.videoObj = { "video": true }
  //this.context = this.photoCanvas.getContext("2d"),

  this.errBack = function(error) {
      console.log("Video capture error: ", error.code); 
    };

  this.picChange = function(evt) {
    console.log("picChange");
    var fileInput = evt.target.files;
    if(fileInput.length>0){
      var windowURL = window.URL || window.webkitURL;
      var picURL = windowURL.createObjectURL(fileInput[0]);
      var ctx = this.photoCanvas.getContext("2d");
      var photo = new Image();
      photo.onload = function(){
        ctx.drawImage(photo, 0, 0, 500, 400);
      }
      photo.src = picURL;
      windowURL.revokeObjectURL(picURL);
    }
  }

  // this.takePic = function() {
  //   this.context.drawImage(video, 0, 0, 640, 480);
  // }

  //   if(navigator.getUserMedia) { // Standard
  //     navigator.getUserMedia(this.videoObj, function(stream) {
  //       this.video.src = stream;
  //       this.video.play();
  //     }, this.errBack);
  //   } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
  //     navigator.webkitGetUserMedia(this.videoObj, function(stream){
  //       this.video.src = window.webkitURL.createObjectURL(stream);
  //       this.video.play();
  //     }, this.errBack);
  //   }
  //   else if(navigator.mozGetUserMedia) { // Firefox-prefixed
  //     navigator.mozGetUserMedia(this.videoObj, function(stream){
  //       this.video.src = window.URL.createObjectURL(stream);
  //       this.video.play();
  //     }, this.errBack);
  //   }

  // model.addObserver(this);

  // this.update = function(code){
  //   console.log("update view");
  //   for (var msg in code){
  //     if("enterChat" === code[msg]){
  //       enterChat();
  //     }
  //   }
  // }


  var profileCtrl = new ProfileCtrl(this, model);
}
