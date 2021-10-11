// state
let count = 0;
let timeoutId = null;
let displayTime = null;
let startTime = null;
let time = null;

const $display = document.querySelector('.display');
const [$leftButton, $rightButton] = [...document.querySelectorAll('.control')];
const $laps = document.querySelector('.laps');
const $lapTitle = [...document.querySelectorAll('.lap-title')];

const render = record => {
  $lapTitle.forEach($el => {
    $el.style.display = count === 0 ? 'none' : 'block';
  });

  const $fragment = document.createDocumentFragment();

  Object.keys(record).forEach(key => {
    const $div = document.createElement('div');
    const textNode = document.createTextNode(record[key]);

    $div.appendChild(textNode);
    $fragment.appendChild($div);
  });

  $laps.appendChild($fragment);
};

window.addEventListener('DOMContentLoaded', () => {
  render({});
});

$leftButton.onclick = () => {
  // TODO: Refactoring
  if ($leftButton.textContent === 'Start') {
    $leftButton.textContent = 'Stop';
    $rightButton.textContent = 'Lap';

    startTime = startTime || new Date();
    timeoutId = setInterval(() => {
      time = new Date() - startTime;
      const minute = Math.floor(time / 1000 / 60);
      const second = Math.floor((time / 1000) % 60);
      const millisecond = Math.floor((time / 10) % 100);
      displayTime = [minute, second, millisecond]
        .map(unit => (unit + '').padStart(2, '0'))
        .join(':');

      $display.textContent = displayTime;
    }, 100);
  } else {
    $leftButton.textContent = 'Start';
    $rightButton.textContent = 'Reset';

    clearInterval(timeoutId);
  }
};

$rightButton.onclick = () => {
  // Laps 일때만
  count += 1;
  render({ lap: 1, time: '00:00:65' });
};
