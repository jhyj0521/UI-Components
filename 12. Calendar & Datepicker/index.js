import store from './store.mjs';

const $body = document.querySelector('body');
const $datePicker = document.querySelector('.date-picker');
const $calendar = document.querySelector('.calendar');

const createCalendar = () => {
  $calendar.style.setProperty('--calendar-size', '400px');
  store.setToday();
};

const format = n => (n < 10 ? '0' + n : n + '');

window.addEventListener('DOMContentLoaded', createCalendar);

$body.onclick = ({ target }) => {
  if (!target.matches('.date-picker')) $calendar.classList.add('hidden');
};

$datePicker.onclick = () => {
  $calendar.classList.remove('hidden');
};

$calendar.onclick = e => {
  e.stopPropagation();

  if (!e.target.matches('.calendar button')) return;

  let { year, month, date } = store.getDate();

  year =
    month === 0 && e.target.classList.contains('prevMonth')
      ? year - 1
      : month === 11 && e.target.classList.contains('nextMonth')
      ? year + 1
      : year;

  month = e.target.classList.contains('prevMonth')
    ? (month + 11) % 12
    : e.target.classList.contains('nextMonth')
    ? (month = (month + 13) % 12)
    : month;

  if (e.target.classList.contains('date')) {
    date = +e.target.textContent;
    $calendar.classList.add('hidden');
  }

  const formatDate = `${year}-${format(month + 1)}-${format(date)}`;

  $datePicker.value = formatDate;
  console.log(formatDate);

  store.setDate({ year, month, date });
};
