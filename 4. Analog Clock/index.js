const $hour = document.querySelector('.hour');
const $minute = document.querySelector('.minute');
const $second = document.querySelector('.second');

window.addEventListener('DOMContentLoaded', () => {
  setInterval(() => {
    const today = new Date();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();

    $hour.style.setProperty('--deg', (hour + minute / 60 + second / 3600) * 30);
    $minute.style.setProperty('--deg', (minute + second / 60) * 6);
    $second.style.setProperty('--deg', second * 6);
  }, 1000);
});
