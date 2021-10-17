let currentSlide = 1;
let imageLength = 0;
const SLIDES_TRANSITION_DURATION = 300;

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

const setCurrentSlide = () => {
  const $carouselSlides = document.querySelector('.carousel-slides');

  currentSlide = currentSlide ? 1 : imageLength;

  setTimeout(() => {
    $carouselSlides.style.setProperty('--duration', '0');
    $carouselSlides.style.setProperty('--currentSlide', currentSlide);
  }, SLIDES_TRANSITION_DURATION);
};

window.onload = () => {
  const $carouselSlides = document.querySelector('.carousel-slides');

  $carousel.style.width = $carouselSlides.firstElementChild.scrollWidth + 'px';
  $carousel.style.opacity = 1;
  $carouselSlides.style.setProperty('--duration', SLIDES_TRANSITION_DURATION);
};

const clickControlButton = ({target}) => {
  if (!target.classList.contains('carousel-control')) return;

  $carousel.removeEventListener('click', clickControlButton);

  const $carouselSlides = document.querySelector('.carousel-slides');

  currentSlide = target.classList.contains('prev')
    ? currentSlide - 1
    : currentSlide + 1;

  $carouselSlides.style.setProperty('--currentSlide', currentSlide);

  if (currentSlide === 0 || currentSlide === imageLength + 1) setCurrentSlide();
  $carouselSlides.style.setProperty('--duration', SLIDES_TRANSITION_DURATION);
};

$carousel.ontransitionend = () => {
  $carousel.addEventListener('click', clickControlButton);
};

$carousel.addEventListener('click', clickControlButton);

carousel($carousel, [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);
