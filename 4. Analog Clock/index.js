const MINUTES_IN_AN_HOUR = 60;
const SECONDS_IN_AN_HOUR = 3600;
const SECONDS_IN_A_MINUTE = 60;
const DEGREES_PER_HOUR = 30;
const DEGREES_PER_MINUTE = 6;
const DEGREES_PER_SECOND = 6;

const $hour = document.querySelector('.hour');
const $minute = document.querySelector('.minute');
const $second = document.querySelector('.second');

window.addEventListener('DOMContentLoaded', () => {
  setInterval(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    $hour.style.setProperty(
      '--deg',
      (hour + minute / MINUTES_IN_AN_HOUR + second / SECONDS_IN_AN_HOUR) *
        DEGREES_PER_HOUR
    );
    $minute.style.setProperty(
      '--deg',
      (minute + second / SECONDS_IN_A_MINUTE) * DEGREES_PER_MINUTE
    );
    $second.style.setProperty('--deg', second * DEGREES_PER_SECOND);
  }, 1000);
});
