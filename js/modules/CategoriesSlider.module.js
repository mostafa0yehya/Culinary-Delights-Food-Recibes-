export function setupSlider(visibleSlides = 4) {
  const slider = document.querySelector(`.categories-container .slider`);
  const slide = slider.querySelector(".categories-container .col-lg-6");
  const totalSlides = slider.querySelectorAll(".slide").length;
  let currentIndex = 0;
  function updateVisibleSlides() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1200) {
      visibleSlides = 4;
    } else if (screenWidth >= 768) {
      visibleSlides = 2;
    } else {
      visibleSlides = 1;
    }
  }
  function updateSlider() {
    let slideWidth = slide.offsetWidth;

    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function nextSlide() {
    if (currentIndex < totalSlides - visibleSlides) {
      currentIndex++;
      updateSlider();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }

  document
    .querySelector(`.categories .next`)
    .addEventListener("click", nextSlide);
  document
    .querySelector(`.categories .prev`)
    .addEventListener("click", prevSlide);
  window.addEventListener("resize", () => {
    updateVisibleSlides();
    currentIndex = 0;
    updateSlider();
  });
}
