let darked = false;

const $body = document.querySelector('body');
const $toggleButton = document.querySelector('.toggle-button');

$toggleButton.onclick = () => {
  darked = !darked;
  localStorage.setItem('darked', darked);
  $body.classList.toggle('dark', darked);
};
