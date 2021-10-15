let isSideNavigationOpen = null;

const $nav = document.querySelector('nav');
const $main = document.querySelector('main');
const $toggle = document.querySelector('.toggle');

window.addEventListener('DOMContentLoaded', () => {
  isSideNavigationOpen = !!JSON.parse(localStorage.getItem('toggle'));

  if (!isSideNavigationOpen) localStorage.setItem('toggle', false);

  $nav.classList.toggle('active', isSideNavigationOpen);

  [$nav, $main, $toggle].forEach($el => {
    $el.classList.add('notransition');
  });
});

$toggle.onclick = () => {
  isSideNavigationOpen = !isSideNavigationOpen;

  localStorage.setItem('toggle', isSideNavigationOpen);

  $nav.classList.toggle('active', isSideNavigationOpen);

  [$nav, $main, $toggle].forEach($el => {
    $el.classList.remove('notransition');
  });
};
