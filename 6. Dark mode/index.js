let isDarkMode = null;
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const $body = document.querySelector('body');
const $toggleButton = document.querySelector('.toggle-button');

window.addEventListener('DOMContentLoaded', () => {
  $body.style.display = 'none';

  isDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));

  if (isDarkMode === null) {
    isDarkMode = darkModeMediaQuery.matches;
    localStorage.setItem('isDarkMode', darkModeMediaQuery.matches);
  }

  $body.classList.toggle('dark', isDarkMode);

  setTimeout(() => {
    $body.style.display = 'block';
  }, 0);
});

$toggleButton.onclick = () => {
  isDarkMode = !isDarkMode;
  localStorage.setItem('isDarkMode', isDarkMode);
  $body.classList.toggle('dark', isDarkMode);
};
