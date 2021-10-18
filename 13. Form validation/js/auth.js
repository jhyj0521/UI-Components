import store from './store.mjs';
import renderToaster from './toast.mjs';

const $body = document.querySelector('body');

const validateCheck = (target, inputType) => {
  const validated = store.getValidated(inputType);
  const errorMessage = store.getErrorMessage(inputType);

  target.querySelector('.error').textContent = validated ? '' : errorMessage;
  target.querySelector('.icon-success').classList.toggle('hidden', !validated);
  target.querySelector('.icon-error').classList.toggle('hidden', validated);
};

const resetVaildateCheck = () => {
  const inputContainers = document.querySelectorAll('.input-container');

  [...inputContainers].forEach($inputContainer => {
    $inputContainer.querySelector('.icon-success').classList.add('hidden');
    $inputContainer.querySelector('.icon-error').classList.add('hidden');

    $inputContainer.querySelector('.error').textContent = '';
    document.querySelector(`.${store.getCurrentPage()}.button`).disabled =
      'disabled';
  });
};

$body.onkeyup = ({ target }) => {
  const $inputContainer = target.parentNode;
  const currentPage = store.getCurrentPage();

  if (!$inputContainer.classList.contains('input-container')) return;

  store.setValue(target.name, target.value);
  validateCheck($inputContainer, target.name);

  if (
    currentPage === 'signup' &&
    target.name === 'password' &&
    store.getValue('confirm-password')
  )
    validateCheck($inputContainer.nextElementSibling, 'confirm-password');

  document.querySelector(`.${currentPage}.button`).disabled =
    store.isValidForm() ? '' : 'disabled';
};

$body.onsubmit = e => {
  e.preventDefault();
  store.printLog();
  renderToaster();
};

$body.onclick = ({ target }) => {
  if (!target.parentNode.classList.contains('link')) return;

  [...document.querySelectorAll('form')].forEach($el => {
    $el.classList.toggle('hidden');
    $el.reset();
  });
  store.resetForm();
  store.toggleCurrentPage();
  resetVaildateCheck();
};
