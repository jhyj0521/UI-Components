const $openButton = document.querySelector('.open-button');
const $modalBackground = document.querySelector('.modal-background');
const $closeButton = document.querySelector('.close-button');
const $modalForm = document.querySelector('.modal-form');
const $modalInput = document.querySelector('.modal-input');
const $cancelButton = document.querySelector('.cancel-button');
const $popupMessage = document.querySelector('.popup-message');

$openButton.onclick = () => {
  $modalBackground.classList.add('is-active');
};

$closeButton.onclick = () => {
  $modalBackground.classList.remove('is-active');
};

$cancelButton.onclick = () => {
  $modalBackground.classList.remove('is-active');
};

// [$closeButton, $cancelButton].forEach($el => {
//   $el.onclick = () => $modalBackground.classList.remove('is-active');
// });

$modalForm.onsubmit = e => {
  e.preventDefault();

  $modalBackground.classList.remove('is-active');

  const content = $modalInput.value.trim();
  if (content) $popupMessage.textContent = 'from popup : ' + content;

  $modalInput.value = '';
};
