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
  const date = store.getDate();

  $calendar.innerHTML = `
    <div class="calendar-nav">
        <button class="calendar-control prev">
          <i class="fas fa-caret-left"></i>
        </button>
        <div>
          <div class="month">${MONTH[date.month]}</div>
          <div class="year">${date.year}</div>
        </div>
        <button class="calendar-control next">
          <i class="fas fa-caret-right"></i>
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
    </div>
  `;
};

const view = { render };

export default view;
