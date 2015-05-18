
// copied from http://stackoverflow.com/questions/6848121/javascript-crop-image-client-side
var CropCtrl = function(model){
  this.cropImage = function(e){
    e.preventDefault && e.preventDefault();
    var image, canvas, i;
    var images = 'files' in e.target ? e.target.files : 'dataTransfer' in e ? e.dataTransfer.files : [];
    if(images && images.length) {
      for(var i in images) {  
        if(typeof images[i] != 'object') continue;
          image = new Image();
          image.src = createObjectURL(images[i]);
          image.onload =  function(e){
            model.my.pic = resizeCrop( e.target, 64, 64 ).toDataURL('image/jpg', 90);
        }
      }           
    }
  }

  var resizeCrop = function( src, width, height ){
    var crop = width == 0 || height == 0;
    // not resize
    if(src.width && width && height == 0){
        height = src.height * (width / src.width);
    }

    // check scale
    var xscale = width  / src.width;
    var yscale = height / src.height;
    var scale  = crop ? Math.min(xscale, yscale) : Math.max(xscale, yscale);
    // create empty canvas
    var canvas = document.createElement("canvas");                  
    canvas.width  = width ? width   : Math.round(src.width  * scale);
    canvas.height = height ? height : Math.round(src.height * scale);
    canvas.getContext("2d").scale(scale,scale);
    // crop it top center
    canvas.getContext("2d").drawImage(src, ((src.width * scale) - canvas.width) * -.5 , ((src.height * scale) - canvas.height) * -.5 );
    return canvas;
  }

  var createObjectURL = function(i){ 
    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    return URL.createObjectURL(i);
  }
}