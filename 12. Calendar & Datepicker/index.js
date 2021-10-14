import store from './store.mjs';

window.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  store.setDate({
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate()
  });
});
