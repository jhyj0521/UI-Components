const $body = document.querySelector('body');

const toaster = (() => {
  let count = 0;
  return {
    add({ type, title, message }) {
      const $div = document.createElement('div');
      $div.innerHTML = `
        <h4 class="toast-heading">${title} ${count}</h4>
        <div class="toast-message">
          <svg width="24" height="24">
            <use xlink:href="#${type}" />
          </svg>
          <p>${message}</p>
        </div>
        <a class="close">&times;</a>
      `;

      $div.setAttribute('class', `toast toast-${type}`);

      $body.appendChild($div);

      count += 1;

      setTimeout(() => {
        $body.removeChild($div);
        count -= 1;
      }, 3000);
    }
  };
})();

const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning'
};

const createToastAction = (type, title, message) => ({ type, title, message });

// Button click Event Handlers
document.querySelector('.show-success').onclick = () =>
  toaster.add(
    createToastAction(
      TOAST_TYPE.SUCCESS,
      'Well done!',
      'This is a success alert'
    )
  );

document.querySelector('.show-error').onclick = () =>
  toaster.add(
    createToastAction(
      TOAST_TYPE.ERROR,
      'Check it out!',
      'This is a error alert'
    )
  );

document.querySelector('.show-warning').onclick = () =>
  toaster.add(
    createToastAction(
      TOAST_TYPE.WARNING,
      'Check it out!',
      'This is a warning alert'
    )
  );
