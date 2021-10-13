import store from './store.mjs';

const $body = document.querySelector('body');

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
          <p>Signin Successfully</p>
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
