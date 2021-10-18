import store from './store.mjs';

const DAYS_OF_THE_WEEK = 7;
const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const $month = document.querySelector('.month');
const $year = document.querySelector('.year');
const $dateContainer = document.querySelector('.date-container');

const render = () => {
  const FIRST_SUNDAY_DATE =
    (DAYS_OF_THE_WEEK + 1 - store.getFirstDayOfMonth()) % DAYS_OF_THE_WEEK;
  const selectedDate = store.getSelectedDate();

  $month.textContent = MONTH[selectedDate.month];
  $year.textContent = selectedDate.year;

  const partOfPrevMonth = store
    .getPartOfPrevMonth()
    .map(date => `<button class="date prevMonth">${date}</button>`);

  const calendarOfMonth = store.getCalendarOfMonth().map(
    date =>
      `<button class="date 
        ${store.isToday(date) ? 'today' : ''} 
        ${date === selectedDate.date ? 'selected' : ''}
        ${FIRST_SUNDAY_DATE === date % DAYS_OF_THE_WEEK ? 'sunday' : ''}">
        ${date}
      </button>`
  );

  const partOfNextMonth = store
    .getPartOfNextMonth()
    .map(date => `<button class="date nextMonth">${date}</button>`);

  const calendar = [
    ...partOfPrevMonth,
    ...calendarOfMonth,
    ...partOfNextMonth
  ].join('');

  $dateContainer.innerHTML = calendar;
};

const view = { render };

export default view;
