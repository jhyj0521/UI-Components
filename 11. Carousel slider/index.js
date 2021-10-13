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

window.onload = () => {
  const $carouselSlides = document.querySelector('.carousel-slides');

  // TODO: scrollWidth와 naturalWidth 중 사용할 것 결정하기
  $carousel.style.width = $carouselSlides.firstElementChild.scrollWidth + 'px';
  $carouselSlides.style.setProperty('--duration', '200');
};

$carousel.onclick = e => {
  if (!e.target.classList.contains('carousel-control')) return;

  const $carouselSlides = document.querySelector('.carousel-slides');

  if (e.target.classList.contains('prev')) {
    currentSlide -= 1;
    $carouselSlides.style.setProperty('--currentSlide', currentSlide);
    if (currentSlide === 0) {
      currentSlide = imageLength;
      setTimeout(() => {
        $carouselSlides.style.setProperty('--duration', '0');
        $carouselSlides.style.setProperty('--currentSlide', currentSlide);
      }, 200);
    }
  } else {
    currentSlide += 1;
    $carouselSlides.style.setProperty('--currentSlide', currentSlide);
    if (currentSlide === imageLength + 1) {
      currentSlide = 1;
      setTimeout(() => {
        $carouselSlides.style.setProperty('--duration', '0');
        $carouselSlides.style.setProperty('--currentSlide', currentSlide);
      }, 200);
    }
  }
  $carouselSlides.style.setProperty('--duration', '200');
};

carousel($carousel, [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);
