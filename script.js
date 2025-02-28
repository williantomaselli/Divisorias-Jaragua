document.addEventListener('DOMContentLoaded', function() {
  // Script para o Carousel (já existente)
  const carouselSlide = document.querySelector('.carousel-slide');
  const carouselImages = document.querySelectorAll('.carousel-slide img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let counter = 0;
  let size = carouselSlide.clientWidth;

  function updateCarousel() {
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  }

  nextBtn.addEventListener('click', function() {
    if (counter >= carouselImages.length - 1) return;
    counter++;
    updateCarousel();
  });

  prevBtn.addEventListener('click', function() {
    if (counter <= 0) return;
    counter--;
    updateCarousel();
  });

  setInterval(() => {
    counter = (counter + 1) % carouselImages.length;
    updateCarousel();
  }, 5000);

  window.addEventListener('resize', function() {
    size = carouselSlide.clientWidth;
    updateCarousel();
  });

  // Script para o painel de produtos (abas)
  const btnDivisorias = document.getElementById('btn-divisorias');
  const btnForros = document.getElementById('btn-forros');
  const divisoriasContent = document.getElementById('divisorias-content');
  const forrosContent = document.getElementById('forros-content');

  btnDivisorias.addEventListener('click', function() {
    btnDivisorias.classList.add('active');
    btnForros.classList.remove('active');
    divisoriasContent.classList.add('active');
    forrosContent.classList.remove('active');
  });

  btnForros.addEventListener('click', function() {
    btnForros.classList.add('active');
    btnDivisorias.classList.remove('active');
    forrosContent.classList.add('active');
    divisoriasContent.classList.remove('active');
  });
});
