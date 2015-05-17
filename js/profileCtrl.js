var ProfileCtrl = function(view,model){
	console.log("profileCtrl");
	view.selectPic.change(function(evt){
		console.log("Nu körs picChange");
		view.picChange(evt);
	});


	//view.sendName.click(function() {
	$("#sendName").click(function() {
		console.log($("#selectPic"));
		console.log("click");
		//view.takePic();
		window.location = "#waitingRoom";
		model.my.name = $("#inputName").val();

		var input = $('#selectPic');
		console.log(input);
		if (input.files && input.files[0]) {
       		var reader = new FileReader();
            reader.onload = function (e) {
                convertImgToBase64URL(e.target.result, function(base64Img){
		   		model.my.pic = base64img;
		   		console.log(model.my.pic);
				});
            }
            
            reader.readAsDataURL(input.files[0]);
        }
		// convertImgToBase64URL($('#selectPic').val(), function(base64Img){
	 //   		model.my.pic = base64img;
	 //   		console.log(model.my.pic);
		// });
		
	})

	//lånat från http://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript
	function convertImgToBase64URL(url, callback, outputFormat){
	    var img = new Image();
	    img.crossOrigin = 'Anonymous';
	    img.onload = function(){
	        var canvas = document.createElement('CANVAS'),
	        ctx = canvas.getContext('2d'), dataURL;
	        canvas.height = img.height;
	        canvas.width = img.width;
	        ctx.drawImage(img, 0, 0);
	        dataURL = canvas.toDataURL(outputFormat);
	        callback(dataURL);
	        canvas = null; 
	    };
	    img.src = url;
	}





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