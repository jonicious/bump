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
    var beta = event.beta;
    var isUp = isHeldUp(beta);
    if(isUp) {
      copy();
    }
  }

  navigator.mozNfc.ontagfound = function (event) {
    var tag = event.tag;
    console.log(tag instanceof MozNFCTag); // should print true
  }
});

function isHeldUp(beta) {
  return beta > 80 && beta < 100;
}

function copy() {
  console.log('executes copy');
  //const gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"]
                                   //.getService(Components.interfaces.nsIClipboardHelper);
  //gClipboardHelper.copyString("Put me on the clipboard, please.");
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
  document.querySelector('.intro-headline').classList.add('hidden');
  return fetchRandomGif()
    .then(updateImage);
}

function updateImage(url) {
  document.body.style.backgroundImage = `url(${url})`
}


