import store from './store.mjs';

const $body = document.querySelector('body');

const renderVaildateCheck = () => {
  const currentPage = store.getCurrentPage();
  const inputContainers = document.querySelectorAll(
    `.${currentPage}.form .input-container`
  );

  [...inputContainers].forEach($inputContainer => {
    const $input = $inputContainer.querySelector('input');
    const $iconSuccess = $inputContainer.querySelector('.icon-success');
    const $iconError = $inputContainer.querySelector('.icon-error');
    const $error = $inputContainer.querySelector('.error');
    const validated = store.getValidated($input.name);
    const value = store.getValue($input.name);

    console.log($input, value);

    if (validated) {
      $error.textContent = '';
      $iconSuccess.classList.remove('hidden');
      $iconError.classList.add('hidden');
    } else if (value === '') {
      $error.textContent = '';
      $iconSuccess.classList.add('hidden');
      $iconError.classList.add('hidden');
    } else {
      $error.textContent = store.getErrorMessage($input.name);
      $iconSuccess.classList.add('hidden');
      $iconError.classList.remove('hidden');
    }

    // $error.textContent = validated ? '' : store.getErrorMessage($input.name);

    // $iconSuccess.classList.toggle('hidden', !validated);
    // $iconError.classList.toggle('hidden', validated);
  });
};

$body.onkeyup = ({ target }) => {
  const $inputContainer = target.parentNode;

  if (!$inputContainer.classList.contains('input-container')) return;

  store.setValue(target.name, target.value);
  renderVaildateCheck();

  const currentPage = store.getCurrentPage();

  document.querySelector(`.${currentPage}.button`).disabled =
    store.isValidForm() ? '' : 'disabled';
};

$body.onsubmit = e => {
  e.preventDefault();

  console.log(`POST /${store.getCurrentPage()}`, {
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
  renderVaildateCheck();

  store.toggleCurrentPage();
};
