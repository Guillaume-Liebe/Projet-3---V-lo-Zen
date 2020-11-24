var slider_content = document.getElementById("images");


var image = ["img/velov_3","img/velov_4","img/velov_5","img/velov_6","img/velov_2"];

var i = image.length;

// function pour les images suivantes

function prewImage() {
    if (i< image.length) {
        i= i+1;
    } else {
        i = 1;
    }
    slider_content.innerHTML = "<img src="+image[i-1]+".jpg>";
}


//function pour les images précédentes
function nextImage() {
    if (i< image.length+1 && i>1) {
        i= i-1;
    } else {
        i = image.length;
    }
    slider_content.innerHTML = "<img src="+image[i-1]+".jpg>";
}


// images en défilement automatiques
setInterval(prewImage, 6000);