var ProfileCtrl = function(view,model, cropCtrl){
	view.selectPic.change(function(evt){
		cropCtrl.cropImage(evt);
	});

	$("#btnLocation").click(function(){
		model.shareLocation();}
	);

	$("#sendName").click(function() {
		userName = $("#inputName").val();
		if(userName == ''){
			alert('please fill in name!')
		}else{
			window.location = "#waitingRoom";
			model.my.name = userName;
			localStorage.setItem('name', model.my.name);
			localStorage.setItem('img',model.my.pic);
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