// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
var url = 'nothing';
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
    navigator.mozNfc.ontagfound = function (event) {
      console.debug('nfc event', event);
      var tag = event.tag;
    };
    navigator.mozNfc.onpeerfound = function (evt) {
      var message = document.querySelector('.message');
      var peer = evt.peer;
      var ndefHelper = new NDEFHelper();
      var record = ndefHelper.createURI(url);
      var ndefRecords = [record];
      peer.sendNDEF(ndefRecords).then(() => {
        message.innerHTML = 'Sharing gif successful!';
        message.classList.add('message--success');
      message.classList.remove('message--error');
        message.classList.remove('hidden');
        console.log('SENT URL ' + url);
      }).catch((err) => {
        message.innerHTML = 'Something went wrong sharing your gif!';
        message.classList.add('message--error');
        message.classList.remove('message--success');
        message.classList.remove('hidden');
        console.log('NFC ERROR: ' + err);
      });
      console.log('peer', peer);
    };

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

});


function isHeldUp(beta) {
  return beta > 80 && beta < 100;
}

function copy() {
  console.log('executes copy');
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

function updateImage(newUrl) {
  url = newUrl;
  document.body.style.backgroundImage = `url(${url})`
}



