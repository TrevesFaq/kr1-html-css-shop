const carousel = document.querySelector('.carousel');

if (carousel) {
  const slides = Array.from(carousel.querySelectorAll('.carousel__slide'));
  const dots = Array.from(carousel.querySelectorAll('.carousel__dot'));
  let activeIndex = 0;
  let timer;

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, itemIndex) => {
      const active = itemIndex === activeIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      dots[itemIndex].classList.toggle('is-active', active);
      dots[itemIndex].setAttribute('aria-current', String(active));
    });
  }

  function startTimer() {
    window.clearInterval(timer);
    timer = window.setInterval(() => showSlide(activeIndex + 1), 5000);
  }

  carousel.querySelector('.carousel__arrow--prev').addEventListener('click', () => {
    showSlide(activeIndex - 1);
    startTimer();
  });
  carousel.querySelector('.carousel__arrow--next').addEventListener('click', () => {
    showSlide(activeIndex + 1);
    startTimer();
  });
  dots.forEach((dot, index) => dot.addEventListener('click', () => {
    showSlide(index);
    startTimer();
  }));
  carousel.addEventListener('mouseenter', () => window.clearInterval(timer));
  carousel.addEventListener('mouseleave', startTimer);
  carousel.addEventListener('focusin', () => window.clearInterval(timer));
  carousel.addEventListener('focusout', startTimer);
  startTimer();
}

const menuButton = document.querySelector('.site-nav__toggle');
const menu = document.querySelector('.site-nav__list');
if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const productSelect = document.getElementById('order-product');
if (productSelect) {
  const requestedProduct = new URLSearchParams(window.location.search).get('product');
  if (requestedProduct) productSelect.value = requestedProduct;
}

const orderForm = document.getElementById('page-order-form');
if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!orderForm.reportValidity()) return;
    document.getElementById('form-success').hidden = false;
    orderForm.reset();
  });
}
