import view from './view.mjs';

const MILLISECONDS_IN_A_DAY = 86400000;
const DAYS_OF_THE_WEEK = 7;

let selectedDate = {
  year: null,
  month: null,
  date: null
};
let todayDate = {
  year: null,
  month: null,
  date: null
};

const setSelectedDate = newDate => {
  selectedDate = newDate;
  view.render();
};

const setToday = () => {
  const today = new Date();

  todayDate = {
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate()
  };

  setSelectedDate({ ...todayDate });
};

const getSelectedDate = () => selectedDate;

const getLastDateOfPrevMonth = () => {
  const date = new Date(selectedDate.year, selectedDate.month, 1);
  date.setTime(date - MILLISECONDS_IN_A_DAY);
  return date.getDate();
};

const getFirstDayOfMonth = () =>
  new Date(selectedDate.year, selectedDate.month, 1).getDay();

const getLastDateOfMonth = () =>
  new Date(selectedDate.year, selectedDate.month + 1, 0).getDate();

const getLastDayOfMonth = () =>
  new Date(
    selectedDate.year,
    selectedDate.month,
    getLastDateOfMonth()
  ).getDay();

const getCalendarOfMonth = () =>
  Array.from({ length: getLastDateOfMonth() }, (_, index) => index + 1);

const getPartOfPrevMonth = () =>
  Array.from(
    { length: getFirstDayOfMonth() },
    (_, index) => getLastDateOfPrevMonth() - index
  ).reverse();

const getPartOfNextMonth = () =>
  Array.from(
    { length: DAYS_OF_THE_WEEK - 1 - getLastDayOfMonth() },
    (_, index) => index + 1
  );

const isToday = date =>
  selectedDate.year === todayDate.year &&
  selectedDate.month === todayDate.month &&
  date === todayDate.date;

const store = {
  setSelectedDate,
  setToday,
  getSelectedDate,
  getFirstDayOfMonth,
  getCalendarOfMonth,
  getPartOfPrevMonth,
  getPartOfNextMonth,
  isToday
};

export default store;
