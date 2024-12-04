document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel-container');
  const items = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;

  // Add initial hidden class
  carousel.classList.add('carousel-hidden');
  items.forEach(item => {
    item.classList.add('carousel-item-hidden');
  });

  const showItem = (index) => {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
      item.classList.toggle('carousel-item-hidden', i !== index);
    });
  };

  document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(currentIndex);
  });

  document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
  });

  // Fade in effect
  const fadeInCarousel = () => {
    const carouselTop = carousel.offsetTop;
    const windowBottom = window.innerHeight + window.scrollY;
    
    if (windowBottom > carouselTop + 50) {
      carousel.classList.remove('carousel-hidden');
      carousel.classList.add('carousel-visible');
    }
  };

  window.addEventListener('scroll', fadeInCarousel);
  fadeInCarousel(); // Initial check
  showItem(currentIndex);
});