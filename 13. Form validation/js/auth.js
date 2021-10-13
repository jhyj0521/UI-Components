import store from './store.mjs';

const $body = document.querySelector('body');
const $form = document.querySelector('.form');

$body.onkeyup = ({ target }) => {
  const $inputContainer = target.parentNode;

  if (!$inputContainer.classList.contains('input-container')) return;

  store.setValue(target.name, target.value);

  const validated = store.getValidated(target.name);

  $inputContainer.querySelector('.error').textContent = validated
    ? ''
    : store.getErrorMessage(target.name);

  $inputContainer
    .querySelector('.icon-success')
    .classList.toggle('hidden', !validated);
  $inputContainer
    .querySelector('.icon-error')
    .classList.toggle('hidden', validated);

  document.querySelector('.signin.button').disabled =
    store.getValidated('userid') && store.getValidated('password')
      ? ''
      : 'disabled';
};

$form.onsubmit = e => {
  e.preventDefault();
  console.log('POST /signin', {
    email: store.getValue('userid'),
    password: store.getValue('password')
  });
};
