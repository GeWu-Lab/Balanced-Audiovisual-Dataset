window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/videos";
var NUM_INTERP_FRAMES = 200;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i+= 10) {
    var path = INTERP_BASE + '/' + String(i) + '.mp4';
    // console.log("create", path)
    const video = document.createElement('video');
    video.controls = true;
    video.muted = false;
    video.height = 360; // in px
    video.width = 480; // in px
    video.src = path
    interp_images[i] = video;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  
  // image.ondragstart = function() { return false; };
  // image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);

}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    fetch('./static/images/corresponding.json')
    .then(response => response.json())
    .then(data => {
      // Use the loaded JSON data here
      console.log(data);
    })
    .catch(error => {
      // Handle any errors that occurred during the loading process
      console.error('Error:', error);
    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})
