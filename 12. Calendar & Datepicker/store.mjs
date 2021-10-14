import view from './view.mjs';

let date = {};

const getDate = () => date;

const setDate = newDate => {
  date = newDate;
  view.render();
};

const store = { setDate, getDate };

export default store;
