const $accordion = document.querySelector('.accordion');
const $active = document.querySelector('.active');

window.onload = () => {
  $active.lastElementChild.style.height = 'auto';
  $active.lastElementChild.style.height = `${$active.lastElementChild.scrollHeight}px`;
};

$accordion.onclick = ({ target }) => {
  if (!target.classList.contains('menu')) return;

  [...$accordion.children].forEach($el => {
    $el.classList.remove('active');
    $el.lastElementChild.style.height = '0';
  });
  target.parentNode.classList.add('active');

  target.nextElementSibling.style.height = `${target.nextElementSibling.scrollHeight}px`;
};
