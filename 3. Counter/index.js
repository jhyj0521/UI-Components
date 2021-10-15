const $increase = document.querySelector('.increase');
const $counter = document.querySelector('.counter');
const $decrease = document.querySelector('.decrease');

const Counter = (() => {
  let count = 0;

  return {
    increase() {
      count += 1;
      return count;
    },
    decrease() {
      count = count > 0 ? count - 1 : 0;
      return count;
    }
  };
})();

$increase.onclick = () => {
  $counter.textContent = Counter.increase();
};

$decrease.onclick = () => {
  $counter.textContent = Counter.decrease();
};
