const $hour = document.querySelector('.hour');
const $minute = document.querySelector('.minute');
const $second = document.querySelector('.second');

window.addEventListener('DOMContentLoaded', () => {
  setInterval(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    const now = new Date();
    const totalSecond = Math.round((now - today) / 1000);
    const hour = (totalSecond / 3600) % 12;
    const minute = totalSecond / 60 - now.getHours() * 60;
    const second = Math.ceil(
      totalSecond - now.getHours() * 3600 - now.getMinutes() * 60
    );

    $hour.style.setProperty('--deg', hour * 30);
    $minute.style.setProperty('--deg', minute * 6);
    $second.style.setProperty('--deg', second * 6);
  }, 1000);
});
