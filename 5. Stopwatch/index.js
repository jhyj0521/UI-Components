// state
let count = 0;

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
  } else {
    $leftButton.textContent = 'Start';
    $rightButton.textContent = 'Reset';
  }
};

$rightButton.onclick = () => {
  // Laps 일때만
  count += 1;
  render({ lap: 1, time: '00:00:65' });
};
