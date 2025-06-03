"use strict";
import { initSlider } from "./modules/slider.module.js";
import {
  displayIngredients,
  displayCategories,
  displayAreas,
  displayCatgoriesInSlider,
  renderPopular,
  displayMeals,
  displayFilters,
  displayFilterdMeals,
  displayResultOfSearch,
} from "./modules/rendering.module.js";

import {
  getData,
  getMeals,
  getMeal,
  getArea,
  getByIngredient,
} from "./modules/api.module.js";
import { addLoad, removeLoad } from "./modules/loading.module.js";

import { setupSlider } from "./modules/CategoriesSlider.module.js";
const meals = Array.from(document.querySelectorAll(".slider .meals .meal"));
const container = document.querySelector("body ");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const sections = document.querySelectorAll(".main .sections .section");
const categoriesLinks = [
  document.getElementById("cat"),
  document.querySelector(".foot-cat"),
];
const recipesLinks = [
  document.getElementById("rec"),
  ...document.querySelectorAll(".go-recipes"),
];
const homesLink = [
  document.querySelector("#home"),
  document.querySelector(".foot-home"),
  document.querySelector("#logo"),
];
const ingredientLink = document.getElementById("ing");
const areaLink = document.getElementById("area");
const searchInput = document.querySelector(" .search-input");
const resultOfSearch = document.querySelector(".result-search");
searchInput.addEventListener("input", async function () {
  try {
    resultOfSearch.innerHTML = "";
    let searchValue = this.value;
    if (searchValue) {
      let data = await getData(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`
      );
      if (data) {
        resultOfSearch.innerHTML = displayResultOfSearch(data.meals);
      } else {
        resultOfSearch.innerHTML = ``;
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
  }
});

//loading in the start
$(document).ready(function () {
  $(".load").fadeOut(300);
});

//get home page
homesLink.forEach((home) => {
  home.addEventListener("click", () => {
    addLoad();
    toggleSection(document.querySelector(".home"));
    removeLoad();
  });
});

async function loadSection(url, sectionSelector, renderFunction) {
  try {
    addLoad();

    const data = await getData(url);

    toggleSection(document.querySelector(sectionSelector));

    document.querySelector(`${sectionSelector} .row`).innerHTML =
      renderFunction(data[Object.keys(data)[0]]);
  } catch (error) {
    console.log(error);
  } finally {
    removeLoad();
  }
}

//Categories page
categoriesLinks.forEach((link) => {
  link.addEventListener("click", () =>
    loadSection(
      "https://www.themealdb.com/api/json/v1/1/categories.php",
      ".categories.section",
      displayCategories
    )
  );
});

//ingredients page
ingredientLink.addEventListener("click", function () {
  loadSection(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
    ".ingredients",
    displayIngredients
  );
});

//area page
areaLink.addEventListener("click", function () {
  loadSection(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
    ".areas",
    displayAreas
  );
});
//recipes page
recipesLinks.forEach((link) => {
  link.addEventListener("click", async function () {
    try {
      addLoad();

      //get data
      const data = await getData(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      //remove empty data
      let filtersLinks = removeEmptyCategories(data.categories);
      //render filters
      document.querySelector(".recipes .filters").innerHTML =
        displayFilters(filtersLinks);

      const filters = document.querySelectorAll(".recipes .filters .filter");

      filters.forEach((filter) => {
        filter.addEventListener("click", () => {
          //show data related to specifc category
          showSpecificCategory(filter);
          switchActiveFilter(filters, filter);
        });
      });

      let allMeals = await getMeals("", 25);

      document.querySelector(".recipes .filetr-meals .meals .row").innerHTML =
        displayFilterdMeals(allMeals);

      toggleSection(document.querySelector(".recipes"));
    } catch (error) {
      console.log(error);
    } finally {
      removeLoad();
    }
  });
});

//render first slider
const circles = document.querySelectorAll(".circles button");
initSlider(meals, circles, nextBtn, prevBtn);
const links = document.querySelectorAll(".nav-link");

links.forEach(function (link) {
  link.addEventListener("click", removeActive);
});

//render categories in slider
async function initCategoriesSlider() {
  const data = await getData(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  let cartona = displayCatgoriesInSlider(data.categories.slice(0, 12));

  document.querySelector(".categories-container .slider .row").innerHTML =
    cartona;

  setupSlider(4);
}

initCategoriesSlider();

//render  meals under category (slider section)
document
  .querySelector(".categories-container .slider")
  .addEventListener("click", async function (e) {
    const meals = e.target.closest(".slide");
    if (meals) {
      toggleSection(document.querySelector(".meals-list"));
      let mealsOfCat = meals.dataset.catId.trim();

      let data = await getMeals(mealsOfCat);

      document.querySelector(".meals-list .row").innerHTML = displayMeals(data);
    }
  });

//render popular meals
async function popular() {
  let data = await getMeals("", 4);

  document.querySelector(".popular-meals .meals .row").innerHTML =
    renderPopular(data);
}
popular();

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("popular-meal")) {
    e.preventDefault();

    const mealId = e.target.getAttribute("data-id");
    let data = await renderContent(getMeal, mealId);
    toggleSection(document.querySelector(".meal-section"));

    document.querySelector(".meal-section .row").innerHTML = data;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const numbers = document.querySelectorAll(".about .box h3");
  const about = document.querySelector(".about");
  let started = false;

  function startCount(el) {
    const goal = parseInt(el.dataset.goal);
    const sign = el.dataset.sign || "";
    let counter = 0;

    const count = setInterval(() => {
      el.innerHTML = `${++counter}${sign}`;
      if (counter === goal) {
        clearInterval(count);
      }
    }, 10);
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY >= about.offsetTop - 300 && !started) {
      numbers.forEach(startCount);
      started = true;
    }
  });
});

container.addEventListener("click", async (e) => {
  const meal = e.target.closest(".meal-render");
  const ingredient = e.target.closest(".ingredient");
  const area = e.target.closest(".area");
  const cat = e.target.closest(".cat");

  if (meal) {
    let data = await renderContent(getMeal, meal.dataset.id);

    document.querySelector(".meal-section .row").innerHTML = data;

    toggleSection(document.querySelector(".meal-section"));

    //to close search result
    if (resultOfSearch) {
      closeSearchResult();
    }
  }
  if (ingredient) {
    let data = await renderContent(
      getByIngredient,
      ingredient.dataset.ingredientId
    );
    toggleSection(document.querySelector(".meals-list"));

    document.querySelector(".meals-list .row").innerHTML = data;
  } else if (area) {
    let data = await renderContent(getArea, area.dataset.areaId);

    document.querySelector(".meals-list .row").innerHTML = data;

    toggleSection(document.querySelector(".meals-list"));
  } else if (cat) {
    toggleSection(document.querySelector(".meals-list"));

    let data = await renderContent(getMeals, cat.dataset.catId);

    document.querySelector(".meals-list .row").innerHTML = displayMeals(data);
  }
});
async function renderContent(fetchFunction, id) {
  let data = await fetchFunction(id);
  return data;
}
function toggleSection(sectionToShow) {
  sections.forEach((el) => el.classList.add("hide-section"));
  sections.forEach((el) => el.classList.remove("show-section"));
  sectionToShow.classList.remove("hide-section");
  sectionToShow.classList.add("show-section");
}

function switchActiveFilter(filters, target) {
  filters.forEach(function (filter) {
    filter.classList.remove("active");
  });
  target.classList.add("active");
}

function removeEmptyCategories(data) {
  return data.filter((cat) => {
    return (
      cat.strCategory != "Vegan" &&
      cat.strCategory != "Goat" &&
      cat.strCategory != "Breakfast" &&
      cat.strCategory != "Starter"
    );
  });
}

function showSpecificCategory(filterElement) {
  const category = filterElement.dataset.category;

  const products = Array.from(
    document.querySelectorAll(".recipes.section .meal-col")
  );

  products?.forEach((product) => {
    const productCategory = product.getAttribute("data-category");

    if (category === "all" || category === productCategory) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

function removeActive() {
  links.forEach(function (link) {
    link.classList.remove("active");
  });
  this.classList.add("active");
}

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    closeSearchResult();
  }
});
document.addEventListener("click", (e) => {
  if (!searchInput.contains(e.target) && !resultOfSearch.contains(e.target)) {
    closeSearchResult();
  }
});
function closeSearchResult() {
  resultOfSearch.innerHTML = "";
  searchInput.value = "";
}
