const $accordion = document.querySelector('.accordion');
const $active = document.querySelector('.active');

window.addEventListener('DOMContentLoaded', () => {
  console.log($active.firstElementChild);

  $active.lastElementChild.style.height = '133px';
});

$accordion.onclick = e => {
  if (!e.target.classList.contains('menu')) return;

  [...$accordion.children].forEach($el => {
    $el.classList.remove('active');
    $el.lastElementChild.style.height = '';
  });
  e.target.parentNode.classList.add('active');

  e.target.parentNode.lastElementChild.style.height = '133px';
};
