import store from './store.mjs';

const $body = document.querySelector('body');

const resetVaildateCheck = () => {
  const inputContainers = document.querySelectorAll('.input-container');

  [...inputContainers].forEach($inputContainer => {
    $inputContainer.querySelector('.icon-success').classList.add('hidden');
    $inputContainer.querySelector('.icon-error').classList.add('hidden');

    $inputContainer.querySelector('.error').textContent = '';
    document.querySelector('.signin.button').disabled = 'disabled';
    document.querySelector('.signup.button').disabled = 'disabled';
  });
};

$body.onkeyup = ({ target }) => {
  const $inputContainer = target.parentNode;

  if (!$inputContainer.classList.contains('input-container')) return;

  store.setValue(target.name, target.value);

  const validated = store.getValidated(target.name);
  const currentPage = store.getCurrentPage();

  $inputContainer.querySelector('.error').textContent = validated
    ? ''
    : store.getErrorMessage(target.name);

  $inputContainer
    .querySelector('.icon-success')
    .classList.toggle('hidden', !validated);
  $inputContainer
    .querySelector('.icon-error')
    .classList.toggle('hidden', validated);

  document.querySelector(`.${currentPage}.button`).disabled =
    store.isValidForm() ? '' : 'disabled';
};

$body.onsubmit = e => {
  e.preventDefault();

  console.log('POST /signin', {
    email: store.getValue('userid'),
    password: store.getValue('password')
  });

  if (e.target.classList.contains('signin')) {
    const $div = document.createElement('div');
    $div.innerHTML = `
        <h4 class="toast-heading">Well done!</h4>
        <div class="toast-message">
          <svg width="24" height="24">
            <use xlink:href="#success" />
          </svg>
          <p>${store.getCurrentPage()} Successfully</p>
        </div>
        <a class="close">&times;</a>`;

    $div.setAttribute('class', `toast toast-success`);
    $div.style.bottom = '0';
    $body.appendChild($div);

    setTimeout(() => {
      $body.removeChild($div);
    }, 3000);
  }
};

$body.onclick = e => {
  if (!e.target.parentNode.classList.contains('link')) return;

  [...document.querySelectorAll('form')].forEach($el => {
    $el.classList.toggle('hidden');
    $el.reset();
  });
  store.resetForm();
  resetVaildateCheck();

  store.toggleCurrentPage();
};
