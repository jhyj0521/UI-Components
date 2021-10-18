import store from './store.mjs';

const $body = document.querySelector('body');

const renderToaster = () => {
  const $div = document.createElement('div');
  $div.innerHTML = `
      <h4 class="toast-heading">Well done!</h4>
      <div class="toast-message">
        <svg width="24" height="24">
          <use xlink:href="#success" />
        </svg>
        <p>${
          store.getCurrentPage().charAt(0).toUpperCase() +
          store.getCurrentPage().slice(1)
        } Successfully</p>
      </div>
      <a class="close">&times;</a>`;

  $div.setAttribute('class', `toast toast-success`);
  $div.style.bottom = '0';
  $body.appendChild($div);

  setTimeout(() => {
    $body.removeChild($div);
  }, 3000);
};

export default renderToaster;
