document.addEventListener('DOMContentLoaded', function() {
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
  
    let counter = 0;
    let size = carouselImages[0].clientWidth;
  
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
  
    // Auto slide a cada 5 segundos
    setInterval(() => {
      counter = (counter + 1) % carouselImages.length;
      updateCarousel();
    }, 5000);
  
    // Atualiza o tamanho do slide em caso de redimensionamento da janela
    window.addEventListener('resize', function() {
      size = carouselImages[0].clientWidth;
      updateCarousel();
    });
  });
  