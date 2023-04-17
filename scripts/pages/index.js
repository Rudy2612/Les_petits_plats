import recipesFactory from "../factories/recipes.js";
import { recipes } from "../../data/recipes.js";
import search from "../utils/search.js";

import { getAllIngredients, getAllAppareils, getAllUstensiles } from "../utils/tags.js"

let text = '';
let ingredients = [];
let appareils = [];
let ustensiles = [];


// Temporaire
document.querySelectorAll('.dropdown').forEach((b) => {
    b.addEventListener('click', () => {
        b.classList.toggle('dropdown--active');
    });
})


function displayRecipes(recipes) {

    if (recipes) {

        let recipes_wrap = document.getElementById('recipe-wrap');
        let recipeModel = recipesFactory(recipes);
        let domElements = recipeModel.createCardDOM();

        recipes_wrap.innerHTML = "";

        domElements.forEach((element) => {
            recipes_wrap.append(element);
        })


        let ingredients = getAllIngredients(recipes);
        let ingredientsDOM = recipeModel.createItemDropdownDOM(ingredients);
        let ingredientsItems = document.getElementById('ingredients-items')
        ingredientsItems.innerHTML = ""
        ingredientsItems.append(ingredientsDOM)

        let appareils = getAllAppareils(recipes)
        let appareilsDOM = recipeModel.createItemDropdownDOM(appareils);
        let ingredientsAppareils = document.getElementById('ingredients-appareils')
        ingredientsAppareils.innerHTML = ""
        ingredientsAppareils.append(appareilsDOM)


        let ustensiles = getAllUstensiles(recipes)
        let ustensilesDOM = recipeModel.createItemDropdownDOM(ustensiles);
        let ingredientsUstensiles = document.getElementById('ingredients-ustensiles')
        ingredientsUstensiles.innerHTML = ""
        ingredientsUstensiles.append(ustensilesDOM)

    }
}



document.getElementById('input_search').addEventListener('input', (e) => {
    text = e.target.value;
    if (text.length >= 3)
        displayRecipes(search({ text, ingredients, appareils, ustensiles }, recipes));
    else
        displayRecipes(recipes);
})



function init() {
    displayRecipes(recipes);


}


init()