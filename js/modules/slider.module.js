("use strict");

let currentIndex = 0;
let meals = [];
let circles = [];
let nextBtn;
let prevBtn;

export function initSlider(mealsList, circlesList, next, prev) {
  meals = mealsList;
  circles = circlesList;
  nextBtn = next;
  prevBtn = prev;

  nextBtn?.addEventListener("click", () => changeSlider(1));
  prevBtn?.addEventListener("click", () => changeSlider(-1));

  circles?.forEach((circle) => {
    circle.addEventListener("click", (e) => {
      const imageIndex = +e.target.dataset.number;
      goToSlide(imageIndex);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") changeSlider(1);
    if (e.key === "ArrowLeft") changeSlider(-1);
  });
}
//Changes the current slide to a specific index.
function goToSlide(index) {
  // Remove active class from the current slide and circle
  circles[currentIndex].classList.remove("active");
  meals[currentIndex].classList.remove("current");
  // Update the index

  currentIndex = index;
  // Add active class to the new current slide and circle

  meals[currentIndex].classList.add("current");
  circles[currentIndex].classList.add("active");
}

// Moves the slider by a step (forward or backward).
function changeSlider(step) {
  circles[currentIndex].classList.remove("active");

  meals[currentIndex].classList.remove("current");
  currentIndex = currentIndex + step;
  currentIndex < 0 && (currentIndex = meals.length - 1);
  currentIndex >= meals.length && (currentIndex = 0);

  meals[currentIndex].classList.add("current");

  circles[currentIndex].classList.add("active");
}
let id = setInterval(() => {
  changeSlider(1);
}, 8000);
