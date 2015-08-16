// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {

  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';

  var translate = navigator.mozL10n.get;
  var orientation = {};

  // We want to wait until the localisations library has loaded all the strings.
  // So we'll tell it to let us know once it's ready.
  navigator.mozL10n.once(init);
  function init() {
    updateImage('img/default.gif');
    //window.addEventListener('devicemotion', handleMotion, false);
    window.addEventListener('deviceorientation', handleMotion, false);
    var myShakeEvent = new Shake();
    myShakeEvent.start();
    window.addEventListener('shake', shakeEventDidOccur, false);
    function shakeEventDidOccur () {
      handleShake();
    }
  }

  function handleMotion(event) {
    var current = event.accelerationIncludingGravity;
    var  beta = event.beta;
    console.log(isLaying(beta));
  }
});

function isLaying(beta) {
  return beta >= -22 && beta <= 38;
}

function fetchRandomGif() {
  const url = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&';
  const data = {
    mode: 'cors'
  };
  return window.fetch(url, data)
    .then((res) => res.json(), (res) => console.error(res))
    .then((json) => json.data.image_original_url);
}

function handleShake() {
  navigator.vibrate(300);
  return fetchRandomGif()
    .then(updateImage);
}

function updateImage(url) {
  document.body.style.backgroundImage = `url(${url})`
}


