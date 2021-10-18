import store from './store.mjs';

const FIRST_MONTH_OF_THE_YEAR = 0;
const LAST_MONTH_OF_THE_YEAR = 11;
const MONTHS_OF_THE_YEAR = 12;

const $body = document.querySelector('body');
const $datePicker = document.querySelector('.date-picker');
const $calendar = document.querySelector('.calendar');

const createCalendar = () => {
  $calendar.style.setProperty('--calendar-size', '400px');
  store.setToday();
};

const dateFormat = n => (n < 10 ? '0' + n : n + '');

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

  let { year, month, date } = store.getSelectedDate();

  year =
    month === FIRST_MONTH_OF_THE_YEAR &&
    e.target.classList.contains('prevMonth')
      ? year - 1
      : month === LAST_MONTH_OF_THE_YEAR &&
        e.target.classList.contains('nextMonth')
      ? year + 1
      : year;

  month = e.target.classList.contains('prevMonth')
    ? (month + MONTHS_OF_THE_YEAR - 1) % MONTHS_OF_THE_YEAR
    : e.target.classList.contains('nextMonth')
    ? (month + MONTHS_OF_THE_YEAR + 1) % MONTHS_OF_THE_YEAR
    : month;

  if (e.target.classList.contains('date')) {
    date = +e.target.textContent;
    $calendar.classList.add('hidden');
  }

  const formatDate = `${year}-${dateFormat(month + 1)}-${dateFormat(date)}`;

  $datePicker.value = formatDate;
  console.log(formatDate);

  store.setSelectedDate({ year, month, date });
};
