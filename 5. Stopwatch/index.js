(() => {
  let count = 0;
  let displayTime = 0;
  let savedTime = 0;
  let started = false;
  let timeoutId = '';

  const $display = document.querySelector('.display');
  const [$leftButton, $rightButton] = [
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
    $rightButton.disabled = !started && !displayTime;
    $display.textContent = parseDisplayTime();
  };

  const renderLaps = record => {
    $lapTitle.forEach($el => {
      $el.style.display = count ? 'block' : 'none';
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
    if (started) {
      $leftButton.textContent = 'Stop';
      $rightButton.textContent = 'Lap';
    } else {
      $leftButton.textContent = 'Start';
      $rightButton.textContent = 'Reset';
    }

    $rightButton.disabled = !started && !displayTime;
  };

  const renderReset = () => {
    $laps.innerHTML = '';
    $lapTitle.forEach($el => $laps.appendChild($el));

    $lapTitle.forEach($el => {
      $el.style.display = 'none';
    });
  };

  const setStarted = () => {
    started = !started;

    renderButton();
  };

  const setDisplayTime = time => {
    displayTime = time;

    renderDisplayTime();
  };

  const startTime = () => {
    const startTime = new Date();

    timeoutId = setInterval(() => {
      setDisplayTime(savedTime + (new Date() - startTime));
    }, 30);
  };

  const stopTime = () => {
    savedTime = displayTime;
    clearInterval(timeoutId);
  };

  const resetTime = () => {
    count = 0;
    savedTime = 0;

    setDisplayTime(0);
    renderReset();
  };

  const lapTime = () => {
    count += 1;

    renderLaps({ lap: count, time: parseDisplayTime() });
  };

  window.addEventListener('DOMContentLoaded', () => {
    renderLaps({});
  });

  $leftButton.onclick = () => {
    started ? stopTime() : startTime();

    setStarted();
  };

  $rightButton.onclick = () => {
    started ? lapTime() : resetTime();
  };
})();
