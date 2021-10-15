import store from './store.mjs';

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
const $calendarGrid = document.querySelector('.calendar-grid');

const render = () => {
  const FIRST_SUNDAY_DATE = (8 - store.getFirstDayOfMonth()) % 7;
  const _date = store.getDate();

  $month.textContent = MONTH[_date.month];
  $year.textContent = _date.year;

  const partOfPrevMonth = store
    .getPartOfPrevMonth()
    .map(date => `<button class="date prevMonth">${date}</button>`);

  const calendarOfMonth = store.getCalendarOfMonth().map(
    date =>
      `<button class="date 
        ${store.isToday(date) ? 'today' : ''} 
        ${date === _date.date ? 'selected' : ''}
        ${FIRST_SUNDAY_DATE === date % 7 ? 'sunday' : ''}">${date}</button>`
  );

  const partOfNextMonth = store
    .getPartOfNextMonth()
    .map(date => `<button class="date nextMonth">${date}</button>`);

  const calendar = [
    ...partOfPrevMonth,
    ...calendarOfMonth,
    ...partOfNextMonth
  ].join('');

  $calendarGrid.innerHTML = `
    <div class="day">SUN</div>
    <div class="day">MON</div>
    <div class="day">TUE</div>
    <div class="day">WED</div>
    <div class="day">THU</div>
    <div class="day">FRI</div>
    <div class="day">SAT</div>
    ${calendar}`;
};

const view = { render };

export default view;
