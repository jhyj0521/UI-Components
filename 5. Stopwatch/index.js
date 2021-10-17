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

  const renderDisplayTime = () => {
    $resetLapToggleButton.disabled = !started && !displayTime;
    $display.textContent = parseDisplayTime();
  };

  const renderLaps = record => {
    $lapTitle.forEach($el => {
      $el.style.display = lapNo ? 'block' : 'none';
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

  const renderButton = () => {
    $startStopToggleButton.textContent = started ? 'Stop' : 'Start';
    $resetLapToggleButton.textContent = started ? 'Lap' : 'Reset';
    $resetLapToggleButton.disabled = !started && !displayTime;
  };

  const renderReset = () => {
    $laps.innerHTML = '';
    $lapTitle.forEach($el => $laps.appendChild($el));

    $lapTitle.forEach($el => {
      $el.style.display = 'none';
    });
  };

  const startTime = () => {
    const startTime = new Date();

    timeoutId = setInterval(() => {
      displayTime = savedTime + (new Date() - startTime);
      renderDisplayTime();
    }, 30);
  };

  const stopTime = () => {
    savedTime = displayTime;
    clearInterval(timeoutId);
  };

  const resetTime = () => {
    lapNo = 0;
    savedTime = 0;
    displayTime = 0;

    renderDisplayTime();
    renderReset();
  };

  const lapTime = () => {
    lapNo += 1;

    renderLaps({ lapNo, time: parseDisplayTime() });
  };

  window.addEventListener('DOMContentLoaded', () => {
    renderLaps({});
    renderButton();
  });

  $startStopToggleButton.onclick = () => {
    started ? stopTime() : startTime();

    started = !started;

    renderButton();
  };

  $resetLapToggleButton.onclick = () => {
    started ? lapTime() : resetTime();
  };
})();
