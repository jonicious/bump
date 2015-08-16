function copyy(textToCopy) {
  var message = document.querySelector('.message');
  //message.textContent = textToCopy;

  var range = document.createRange();
  range.selectNode(message);
  window.getSelection().addRange(range);

  try {
    message.innerHTML = textToCopy;
    message.contentEditable = true;
    var successful = document.execCommand('copy', false, null);
    message.style.display = 'block';

    if (successful) {
      message.classList.add('message--success');
    } else {
      message.classList.add('message--error');
      message.innerHTML = 'Nay! Not copied the text :(';
    }

  } catch (err) {
    console.log('Oops, unable to copy', err);
    message.classList.add('message--error');
    message.innerHTML = 'Nay! Not copied the text :(';
  }

  window.getSelection().removeAllRanges();

}

// document.addEventListener('copy', (e) => {
//   e.clipboardData.setData('text/plain', 'hello test');
//   e.preventDefault();
// });