import store from './store.mjs';

const $calendar = document.querySelector('.calendar');

window.addEventListener('DOMContentLoaded', store.setToday);

$calendar.onclick = ({ target }) => {
  if (!target.classList.contains('calendar-control')) return;

  let { year, month, date } = store.getDate();
  year =
    month === 0 && target.classList.contains('prev')
      ? year - 1
      : month === 11 && target.classList.contains('next')
      ? year + 1
      : year;

  month = target.classList.contains('prev')
    ? (month + 11) % 12
    : (month + 13) % 12;

  store.setDate({ year, month, date });
};
