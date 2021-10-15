(() => {
  // state
  let count = 0;
  let currentTime = 0;
  let savedTime = 0;
  let started = false;
  let timeoutId = '';

  const $display = document.querySelector('.display');
  const [$leftButton, $rightButton] = [
    ...document.querySelectorAll('.control')
  ];
  const $laps = document.querySelector('.laps');
  const $lapTitle = [...document.querySelectorAll('.lap-title')];

  const parseCurrentTime = () => {
    const minute = Math.floor(currentTime / 1000 / 60);
    const second = Math.floor((currentTime / 1000) % 60);
    const millisecond = Math.floor((currentTime / 10) % 100);

    return [minute, second, millisecond]
      .map(unit => (unit + '').padStart(2, '0'))
      .join(':');
  };

  const renderCurrentTime = () => {
    $rightButton.disabled = !started && !currentTime;
    $display.textContent = parseCurrentTime();
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

    $rightButton.disabled = !started && !currentTime;
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

  const setCurrentTime = time => {
    currentTime = time;

    renderCurrentTime();
  };

  const startTime = () => {
    const startTime = new Date();

    timeoutId = setInterval(() => {
      setCurrentTime(savedTime + (new Date() - startTime));
    }, 30);
  };

  const stopTime = () => {
    savedTime = currentTime;
    clearInterval(timeoutId);
  };

  const resetTime = () => {
    count = 0;
    savedTime = 0;

    setCurrentTime(0);
    renderReset();
  };

  const lapTime = () => {
    count += 1;

    renderLaps({ lap: count, time: parseCurrentTime() });
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
