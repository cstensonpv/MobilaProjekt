var ProfileView = function(container, model, cropCtrl){
  console.log(window.location);
  this.sendName = $('#sendName');
  this.selectPic = $('#selectPic');
  this.photoCanvas = document.getElementById("capturedPhoto"); //måste vara ett pure canvas obj, kan inte vara jQuery
  this.video = document.getElementById("video");
  this.body = $('#body');
  this.videoObj = { "video": true }
  this.context = this.photoCanvas.getContext("2d");

  model.shareLocation();

  this.errBack = function(error) {
      console.log("Video capture error: ", error.code); 
    };

  this.picChange = function(e) {
    // var reader = new FileReader();
    // console.log("picChange");
    // var fileInput = evt.target.files;
    // if(fileInput.length>0){

    //   reader.onload = function (e) {
    //     model.my.pic = e.target.result;
    //     //model.my.pic = resizeCrop( e.target.result, 64, 64 ).toDataURL('image/jpg', 90);
    //     console.log(model.my.pic);
    //     console.log(typeof(model.my.pic));
    //    };
    //   reader.readAsDataURL(fileInput[0]);

    // }
    cropCtrl.cropImage(e);
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
