const $nav = document.querySelector('nav');
const $main = document.querySelector('main');
const $toggle = document.querySelector('.toggle');

window.addEventListener('DOMContentLoaded', () => {
  // toggle이 없으면 추가
  if (!localStorage.getItem('toggle')) localStorage.setItem('toggle', false);

  // toggle이 있으면
  $nav.classList.toggle('active', JSON.parse(localStorage.getItem('toggle')));

  // 처음 로드될때는 트랜지션 없음
  [$nav, $main, $toggle].forEach($el => {
    $el.classList.add('notransition');
  });
});

$toggle.onclick = () => {
  localStorage.setItem('toggle', !JSON.parse(localStorage.getItem('toggle')));

  $nav.classList.toggle('active', JSON.parse(localStorage.getItem('toggle')));

  [$nav, $main, $toggle].forEach($el => {
    $el.classList.remove('notransition');
  });
};
