import view from './view.mjs';

let date = {};
let today = {};

const setDate = newDate => {
  date = newDate;
  view.render();
};

const setToday = () => {
  const _today = new Date();
  const _date = {
    year: _today.getFullYear(),
    month: _today.getMonth(),
    date: _today.getDate()
  };

  today = _date;
  setDate({ ..._date });
};

const getDate = () => date;

const getLastDateOfPrevMonth = () => {
  const _date = new Date(date.year, date.month, 1);
  _date.setTime(_date - 86400000);
  return _date.getDate();
};

const getFirstDayOfMonth = () => new Date(date.year, date.month, 1).getDay();

const getLastDateOfMonth = () =>
  new Date(date.year, date.month + 1, 0).getDate();

const getLastDayOfMonth = () =>
  new Date(date.year, date.month, getLastDateOfMonth()).getDay();

const getCalendarOfMonth = () =>
  Array.from({ length: getLastDateOfMonth() }, (_, index) => index + 1);

const getPartOfPrevMonth = () =>
  Array.from(
    { length: getFirstDayOfMonth() },
    (_, index) => getLastDateOfPrevMonth() - index
  ).reverse();

const getPartOfNextMonth = () =>
  Array.from({ length: 6 - getLastDayOfMonth() }, (_, index) => index + 1);

const isToday = () => date.year === today.year && date.month === today.month;

const store = {
  setDate,
  setToday,
  getDate,
  getFirstDayOfMonth,
  getCalendarOfMonth,
  getPartOfPrevMonth,
  getPartOfNextMonth,
  isToday
};

export default store;
