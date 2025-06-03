import { addLoad, removeLoad } from "./loading.module.js";
import { displayMeals, displayMealDetails } from "./rendering.module.js";

export async function getData(url) {
  try {
    const request = await fetch(url);
    const data = await request.json();
    return data;
  } catch (error) {
    throw new Error("error in getting data: " + error.message);
  }
}
export async function getMeals(id = "", count = 20) {
  try {
    let url = id
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
      : "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    addLoad();

    let data = await getData(url);

    data = data.meals.slice(0, count);

    return data;
  } catch (error) {
    console.log(error);
  } finally {
    removeLoad();
  }
}

export async function getArea(area) {
  addLoad();
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  removeLoad();
  return displayMeals(data.meals);
}
export async function getByIngredient(ingredient) {
  addLoad();
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.trim()}`
  );
  removeLoad();
  return displayMeals(data.meals);
}
export async function getMeal(id) {
  addLoad();
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  data = data.meals[0];
  removeLoad();
  return displayMealDetails(data);
}
