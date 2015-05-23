var ProfileCtrl = function(view,model, cropCtrl){
	// function that's beeing called when an image is either selected or taken from the camera.
	// We crop the image to a smaller size using our cropCtrl.js
	view.selectPic.change(function(evt){
		cropCtrl.cropImage(evt);
	});
	
	// onClick listener on the button that shows when a user hasn't shared their location.
	$("#btnLocation").click(function(){
		model.shareLocation();}
	);
	
	// onCLick listener on the 'Done' button. Redirects user to the Waiting Room. Error handling if user hasn't filled in any name. 
	$("#sendName").click(function() {
		userName = $("#inputName").val();
		if(userName == ''){
			alert('please fill in name!')
		}else{
			window.location = "#waitingRoom";
			model.my.name = userName;
			localStorage.setItem('name', model.my.name); // Saves the username into localStorage (cookies)
			localStorage.setItem('img',model.my.pic); // Saves the croped image into localStorage (cookies)
		}
	});

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
}
