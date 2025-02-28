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

document.addEventListener('DOMContentLoaded', function() {
  // --- Carrossel dos Forros ---
  const forrosTrack = document.querySelector('.forros-carousel-track');
  const forrosCards = document.querySelectorAll('.forros-card');
  const forrosPrev = document.querySelector('.forros-prev');
  const forrosNext = document.querySelector('.forros-next');
  const forrosRange = document.querySelector('.forros-range');

  let cardsPerView = window.innerWidth > 768 ? 4 : 1;
  const totalCards = forrosCards.length;

  // Configure o slider para movimento contínuo
  forrosRange.step = 0.01; // permite valores fracionários

  // Atualiza a posição do carrossel com base no valor do slider
  function updateForrosCarousel() {
    const cardWidth = forrosCards[0].clientWidth;
    const currentValue = parseFloat(forrosRange.value);
    forrosTrack.style.transform = `translateX(-${currentValue * cardWidth}px)`;
  }

  // Anima o valor do slider de startValue até targetValue de forma linear
  function animateSlider(targetValue) {
    const startValue = parseFloat(forrosRange.value);
    const duration = 500; // duração em ms
    const startTime = performance.now();
    
    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1); // progressão linear (0 a 1)
      const newValue = startValue + (targetValue - startValue) * progress;
      forrosRange.value = newValue;
      updateForrosCarousel();
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }

  // Define o valor máximo do slider (quantos "passos" cabem)
  function updateSliderMax() {
    let maxIndex = totalCards - cardsPerView;
    if (maxIndex < 0) maxIndex = 0;
    forrosRange.max = maxIndex;
  }

  updateSliderMax();
  updateForrosCarousel();

  // Botão "Próximo": incrementa em 1 (pode ser valor fracionário)
  forrosNext.addEventListener('click', function() {
    const currentValue = parseFloat(forrosRange.value);
    const maxIndex = parseFloat(forrosRange.max);
    let target = currentValue + 1;
    if (target > maxIndex) target = maxIndex;
    animateSlider(target);
  });

  // Botão "Anterior": decrementa em 1
  forrosPrev.addEventListener('click', function() {
    const currentValue = parseFloat(forrosRange.value);
    let target = currentValue - 1;
    if (target < 0) target = 0;
    animateSlider(target);
  });

  // Atualiza o carrossel em tempo real quando o usuário manipula o slider
  forrosRange.addEventListener('input', function() {
    updateForrosCarousel();
  });

  // Atualiza o número de cards visíveis e o slider ao redimensionar a janela
  window.addEventListener('resize', function() {
    cardsPerView = window.innerWidth > 768 ? 4 : 1;
    updateSliderMax();
    updateForrosCarousel();
  });
});

