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

const $calendar = document.querySelector('.calendar');

const render = () => {
  const FIRST_SUNDAY_DATE = (8 - store.getFirstDayOfMonth()) % 7;
  const _date = store.getDate();

  const partOfPrevMonth = store
    .getPartOfPrevMonth()
    .map(date => `<button class="date prevMonth">${date}</button>`)
    .join('');

  const calendarOfMonth = store
    .getCalendarOfMonth()
    .map(
      date =>
        `<button class="date 
        ${store.isToday() && date === _date.date ? 'today' : ''} 
        ${date === _date.date ? 'selected' : ''}
        ${FIRST_SUNDAY_DATE === date % 7 ? 'sunday' : ''}">${date}</button>`
    )
    .join('');

  const partOfNextMonth = store
    .getPartOfNextMonth()
    .map(date => `<button class="date nextMonth">${date}</button>`)
    .join('');

  const calendar = partOfPrevMonth + calendarOfMonth + partOfNextMonth;

  $calendar.innerHTML = `
    <div class="calendar-nav">
        <button class="calendar-control prev">
          &#9664;
        </button>
        <div>
          <div class="month">${MONTH[_date.month]}</div>
          <div class="year">${_date.year}</div>
        </div>
        <button class="calendar-control next">
          &#9654;
        </button>
    </div>
    <div class="calendar-grid">
        <div class="day">SUN</div>
        <div class="day">MON</div>
        <div class="day">TUE</div>
        <div class="day">WED</div>
        <div class="day">THU</div>
        <div class="day">FRI</div>
        <div class="day">SAT</div>
        ${calendar} 
    </div>
  `;
};

const view = { render };

export default view;
