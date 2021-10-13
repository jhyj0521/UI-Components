const $accordion = document.querySelector('.accordion');
const $active = document.querySelector('.active');

window.onload = () => {
  $active.lastElementChild.style.height = 'auto';
  $active.lastElementChild.style.height = `${$active.lastElementChild.scrollHeight}px`;
};

$accordion.onclick = e => {
  if (!e.target.classList.contains('menu')) return;

  [...$accordion.children].forEach($el => {
    $el.classList.remove('active');
    $el.lastElementChild.style.height = '0';
  });
  e.target.parentNode.classList.add('active');

  e.target.nextElementSibling.style.height = `${e.target.nextElementSibling.scrollHeight}px`;
};
