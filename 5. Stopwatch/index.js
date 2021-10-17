(() => {
  let lapNo = 0;
  let displayTime = 0;
  let savedTime = 0;
  let started = false;
  let timeoutId = '';

  const $display = document.querySelector('.display');
  const [$startStopToggleButton, $resetLapToggleButton] = [
    ...document.querySelectorAll('.control')
  ];
  const $laps = document.querySelector('.laps');
  const $lapTitle = [...document.querySelectorAll('.lap-title')];

  const parseDisplayTime = () => {
    const minute = Math.floor(displayTime / 1000 / 60);
    const second = Math.floor((displayTime / 1000) % 60);
    const millisecond = Math.floor((displayTime / 10) % 100);

    return [minute, second, millisecond]
      .map(unit => (unit + '').padStart(2, '0'))
      .join(':');
  };

  const renderButton = () => {
    $startStopToggleButton.textContent = started ? 'Stop' : 'Start';
    $resetLapToggleButton.textContent = started ? 'Lap' : 'Reset';
    $resetLapToggleButton.disabled = '';
  };

  const renderReset = () => {
    $display.textContent = parseDisplayTime();
    $resetLapToggleButton.disabled = 'disabled';
    $laps.innerHTML = '';

    $lapTitle.forEach($el => $laps.appendChild($el));

    $lapTitle.forEach($el => {
      $el.style.display = 'none';
    });
  };

  const startStopwatch = () => {
    const startTime = new Date();

    timeoutId = setInterval(() => {
      displayTime = savedTime + (new Date() - startTime);
      $display.textContent = parseDisplayTime();
    }, 30);
  };

  const stopStopwatch = () => {
    savedTime = displayTime;
    clearInterval(timeoutId);
  };

  const resetStopwatch = () => {
    lapNo = 0;
    savedTime = 0;
    displayTime = 0;

    renderReset();
  };

  const lapTime = () => {
    lapNo += 1;

    $lapTitle.forEach($el => {
      $el.style.display = 'block';
    });

    const $fragment = document.createDocumentFragment();

    [lapNo, parseDisplayTime()].forEach(value => {
      const $div = document.createElement('div');
      const textNode = document.createTextNode(value);

      $div.appendChild(textNode);
      $fragment.appendChild($div);
    });

    $laps.appendChild($fragment);
  };

  window.addEventListener('DOMContentLoaded', renderReset);

  $startStopToggleButton.onclick = () => {
    started ? stopStopwatch() : startStopwatch();

    started = !started;

    renderButton();
  };

  $resetLapToggleButton.onclick = () => {
    started ? lapTime() : resetStopwatch();
  };
})();
