console.log('JS file connected!');

// for alert messages
const closeAlert = document.getElementsByClassName('close-alert-btn');
if (closeAlert != 'undefined') {
  for (let x = 0; x < closeAlert.length; x++) {
    closeAlert[x].addEventListener('click', () => {
      let parentEle = closeAlert[x].parentElement;
      parentEle.style.opacity = "0";
      // hide parent element after 600ms (same transition as it were in the alert css style)
      setTimeout(() => {
        parentEle.style.display = "none";
      }, 600);
    });
  }
}