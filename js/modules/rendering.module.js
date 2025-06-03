// display.js
("use strict");

/**
 * Display detailed info for a single meal.
 */
export function displayMealDetails(data) {
  let tags = data.strTags?.split(",") ?? data.strTags ?? [];
  tags = tags.filter((el) => el.length > 0);

  let childsOful = "";
  tags.forEach((el) => {
    childsOful += `<li class="alert bg-info m-2 p-1">${el}</li>`;
  });

  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    let ingredient = data[`strIngredient${i}`];
    let measure = data[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      let cleanMeasure = measure?.trim() ?? "";
      let cleanIngredient = ingredient.trim();
      ingredients.push(`${cleanMeasure} ${cleanIngredient}`.trim());
    }
  }

  let boxOfIng = "";
  ingredients.forEach((el) => {
    boxOfIng += `<li class="alert alert-info m-2 p-1">${el}</li>`;
  });

  return `
    <div class="col-md-4">
      <div class="image">
              <h2>${data.strMeal}</h2>

        <img src="${data.strMealThumb}" class="pb-2  rounded-2" alt="" />
      </div>
    </div>
    <div class="col-md-8">
      <div class="info">
        <h3>Instructions</h3>
        <p>${data.strInstructions}</p>
        <h3>Area: ${data.strArea}</h3>
        <h3 class="my-2">Category: ${data.strCategory}</h3>
        <h3>Recipes:</h3>
        <ul class="d-flex flex-wrap">${boxOfIng}</ul>
        <h3>Tags:</h3>
        <ul class="list-unstyled d-flex g-3 my-2 flex-wrap">${childsOful}</ul>
        <a target="_blank" href="${
          data.strSource ?? "#"
        }" class="btn btn-success">Source</a>
        <a target="_blank" href="${
          data.strYoutube
        }" class="btn btn-danger">Youtube</a>
      </div>
    </div>`;
}

/**
 * Display a grid of meals.
 */
export function displayMeals(data) {
  let cartona = "";
  data.forEach((el) => {
    cartona += `
      <div class="col-md-3">
        <div data-id="${el.idMeal}" class="box meal-render">
          <img src="${el.strMealThumb}" alt="${el.strMeal}" />
          <div class="layer text-center">
            <h3 class="my-2">${el.strMeal}</h3>
          </div>
        </div>
      </div>`;
  });

  return cartona;
}

/**
 * Display a list of ingredients.
 */
export function displayIngredients(data) {
  let cartona = "";
  data = data.filter((el) => el.strDescription != null).slice(0, 20);

  data.forEach((el) => {
    cartona += `
      <div class="col-md-3">
        <div class="ingredient" data-ingredient-id="${el.strIngredient}" >
          <div class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3 class="py-2 mb-0">${el.strIngredient}</h3>
            <p>${el.strDescription?.split(" ", 20).join(" ")}</p>
          </div>
        </div>
      </div>`;
  });

  return cartona;
}

/**
 * Display a grid of meal categories.
 */
export function displayCategories(data) {
  let cartona = "";

  data.forEach((el) => {
    cartona += `
      <div class="col-md-3">
        <div data-cat-id="${el.strCategory}" class="box cat">
          <img src="${el.strCategoryThumb}" alt="${el.strCategory}" />
          <div class="layer text-center">
            <h3 class="my-2">${el.strCategory}</h3>
            <p>${el.strCategoryDescription.split(" ", 20).join(" ")}...</p>
          </div>
        </div>
      </div>`;
  });

  return cartona;
}

/**
 * Display a list of area origins for meals.
 */
export function displayAreas(data) {
  let cartona = "";
  data.forEach((el) => {
    cartona += `
      <div class="col-md-3">
        <div data-area-id="${el.strArea}" class="area">
          <div class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${el.strArea}</h3>
          </div>
        </div>
      </div>`;
  });

  return cartona;
}

export function displayCatgoriesInSlider(data) {
  let cartona = ``;
  data.forEach((category) => {
    cartona += `
      <div class=" col-xl-3 col-lg-6">
        <div class="slide" data-cat-id="${category.strCategory}">
          <img src="${category.strCategoryThumb}" alt="${category.strCategory}" />
          <div class="desc">
            <p>${category.strCategory}</p>
          </div>
        </div>
      </div>
    `;
  });
  return cartona;
}

export function renderPopular(data) {
  let cartona = ``;
  data.forEach((meal) => {
    cartona += `

    <div class="col-md-6 col-lg-3">
      <div class="card shadow-lg rounded-3 border-0 overflow-hidden ">
      <div class="image overflow-hidden rounded-top-3 postion-realtive">
              <img src="${meal.strMealThumb}" class="card-img-top " alt="${meal.strMeal}" />
    <p class="mb-0 country"><i class="fa-solid fa-earth-europe"></i> ${meal.strArea}</p>

      </div>
        <div class="card-body ">
          <div class="d-flex justify-content-between align-items-center pb-3">
          <h5 class="card-title text-capitalize fw-bolder fs-4">${meal.strMeal}</h5>
           <span class="" > ${meal.strCategory} </span>
          </div>
          <a href="#"  data-id="${meal.idMeal}" " class="main-btn popular-meal ">Cook Now</a>
        </div>
      </div>
    </div>



`;
  });
  return cartona;
}

export function displayFilters(data) {
  let cartona = `
   <div class="filter shadow active" data-category="all">All </div>
  `;
  data.forEach((el) => {
    cartona += `
    <div   class="filter shadow  " data-category="${el.strCategory}">${el.strCategory}</div>
`;
  });

  return cartona;
}

export function displayFilterdMeals(data) {
  let cartona = ``;
  data.forEach((meal) => {
    cartona += `
<div class="col-md-6 col-lg-3 meal-col" data-category="${meal.strCategory}">
  <div
    class="card rounded-3 border-0 meal overflow-hidden meal-render"
    data-id="${meal.idMeal}"
  >
    <div class="image overflow-hidden rounded-top-3 postion-realtive">
      <img
        src="${meal.strMealThumb}"
        class="card-img-top"
        alt="${meal.strMeal}"
      />
      <p class="cat">${meal.strCategory}</p>
    </div>
    <div class="card-body">
      <h5 class="card-title text-capitalize fw-bolder fs-4 mb-3">
        ${meal.strMeal}
      </h5>
      <p class="truncate">${meal.strInstructions}</p>
      <span
        ><span><i class="fa-solid fa-earth-europe"></i> </span
        >${meal.strArea}</span
      >
    </div>
  </div>
</div>



`;
  });
  return cartona;
}

export function displayResultOfSearch(data) {
  let cartona = ``;
  data.forEach((res) => {
    cartona += `
  <div class="result-item d-flex gap-2 align-items-center meal-render" data-id="${res.idMeal}">
                <img src="${res.strMealThumb}/small" alt="${res.strMeal}" />
                <div class="content">
                  <h3>${res.strMeal}</h3>

                  <p>${res.strCategory}</p>
                </div>
              </div>
  `;
  });
  return cartona;
}
