const $openButton = document.querySelector('.open-button');
const $modalBackground = document.querySelector('.modal-background');
const $modalForm = document.querySelector('.modal-form');
const $modalInput = document.querySelector('.modal-input');
const $popupMessage = document.querySelector('.popup-message');

$openButton.onclick = () => {
  $modalBackground.classList.add('is-active');
};

$modalBackground.onclick = ({ target }) => {
  if (target.matches('button')) $modalBackground.classList.remove('is-active');
};

$modalForm.onsubmit = e => {
  e.preventDefault();

  const content = $modalInput.value.trim();
  if (content) $popupMessage.textContent = 'from popup : ' + content;

  $modalInput.value = '';
};
