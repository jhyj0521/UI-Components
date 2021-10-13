let currentSlide = 1;
let imageLength = 0;

const $carousel = document.querySelector('.carousel');

const carousel = ($container, images) => {
  imageLength = images.length;

  const imageTag = `
    <img src="${images[imageLength - 1]}" />
    ${images.map(image => `<img src="${image}" />`).join('')}
    <img src="${images[0]}" />`;

  $container.innerHTML = `
    <div class="carousel-slides">
      ${imageTag}
    </div>
    <button class="carousel-control prev">&laquo;</button>
    <button class="carousel-control next">&raquo;</button>`;

  document
    .querySelector('.carousel-slides')
    .style.setProperty('--currentSlide', currentSlide);
};

const setCurrentSlide = isPrev => {
  const $carouselSlides = document.querySelector('.carousel-slides');

  currentSlide = isPrev ? currentSlide - 1 : currentSlide + 1;
  $carouselSlides.style.setProperty('--currentSlide', currentSlide);

  if (
    (isPrev && currentSlide === 0) ||
    (!isPrev && currentSlide === imageLength + 1)
  ) {
  }

  const endOfSlide = isPrev ? 0 : imageLength + 1;
  if (currentSlide === endOfSlide) {
    currentSlide = isPrev ? imageLength : 1;
    setTimeout(() => {
      $carouselSlides.style.setProperty('--duration', '0');
      $carouselSlides.style.setProperty('--currentSlide', currentSlide);
    }, 200);
  }
  $carouselSlides.style.setProperty('--duration', '200');
};

window.onload = () => {
  const $carouselSlides = document.querySelector('.carousel-slides');

  // TODO: scrollWidth와 naturalWidth 중 사용할 것 결정하기
  $carousel.style.width = $carouselSlides.firstElementChild.scrollWidth + 'px';
  $carouselSlides.style.setProperty('--duration', '200');
};

$carousel.onclick = e => {
  if (!e.target.classList.contains('carousel-control')) return;

  e.target.classList.contains('prev')
    ? setCurrentSlide(true)
    : setCurrentSlide(false);
};

carousel($carousel, [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);
