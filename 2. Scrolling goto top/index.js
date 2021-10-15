const $scrollIcon = document.querySelector('.scroll-icon');

const throttle = (callback, delay) => {
  let timerId;

  return event => {
    if (timerId) return;
    timerId = setTimeout(
      () => {
        callback(event);
        timerId = null;
      },
      delay,
      event
    );
  };
};

window.onscroll = throttle(() => {
  $scrollIcon.style.display = window.pageYOffset >= 100 ? 'block' : 'none';
}, 100);

$scrollIcon.onclick = () => {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
};
