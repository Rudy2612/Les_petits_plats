import recipesFactory from "../factories/recipes.js";
import { recipes } from "../../data/recipes.js";
import { search, tagFilter } from "../utils/search.js";

import { getAllIngredients, getAllAppareils, getAllUstensiles } from "../utils/tags.js"
import { createTagDropdownDOM, filterTag } from "../utils/dropdown.js"

let data = [];

let text = '';
let ingredients = [];
let appareils = [];
let ustensiles = [];



// set element
let dropdowns = document.querySelectorAll('.dropdown');
let inputs_dropdown = document.querySelectorAll('.dropdown__input');

let ingredientsItems = document.getElementById('ingredients-items');
let appareilsItems = document.getElementById('appareils-items');
let ustensilesItems = document.getElementById('ustensiles-items');



function displayRecipes(recipes) {

    if (recipes) {

        // Création des vignettes de recettes
        let recipes_wrap = document.getElementById('recipe-wrap');
        let recipeModel = recipesFactory(recipes);
        let domElements = recipeModel.createRecipesCardDOM();
        recipes_wrap.innerHTML = "";
        domElements.forEach((element) => {
            recipes_wrap.append(element);
        })

        displayTagDropdown()

    }
}

// Fonction qui affiche les tags dans les dropdown suivant les recettes affichés
function displayTagDropdown() {

    // => Récupération de tous les ingrédients, appareils et ustensiles
    let ingredientsArray = getAllIngredients(data);
    let appareilsArray = getAllAppareils(data);
    let ustensilesArray = getAllUstensiles(data);

    // => Suppression des tags déjà selectionnés
    ingredientsArray = ingredientsArray.filter(e => ingredients.indexOf(e) === -1);
    appareilsArray = appareilsArray.filter(e => appareils.indexOf(e) === -1);
    ustensilesArray = ustensilesArray.filter(e => ustensiles.indexOf(e) === -1);

    // => Création des tags a afficher 
    // (filterTag = enlève les tags ne correpondant pas à l'entrée de l'input du dropdown)
    let ingredientFilteredDOM = createTagDropdownDOM(filterTag(document.getElementById('dropdown-ingredients').value, ingredientsArray), 'ingredients-item');
    let appareilsFilteredDOM = createTagDropdownDOM(filterTag(document.getElementById('dropdown-appareils').value, appareilsArray));
    let ustensilesFilteredDOM = createTagDropdownDOM(filterTag(document.getElementById('dropdown-ustensiles').value, ustensilesArray));

    // => Suppression du dom des précédants tags affichés
    ingredientsItems.innerHTML = "";
    appareilsItems.innerHTML = "";
    ustensilesItems.innerHTML = "";

    // => Ajout de l'event listener de click sur les nouveaux tags
    ingredientFilteredDOM.childNodes.forEach(e => e.addEventListener('click', (e) => { e.stopPropagation(); addTagsSearch('ingredient', e.target) }));
    appareilsFilteredDOM.childNodes.forEach(e => e.addEventListener('click', (e) => { e.stopPropagation(); addTagsSearch('appareils', e.target) }));
    ustensilesFilteredDOM.childNodes.forEach(e => e.addEventListener('click', (e) => { e.stopPropagation(); addTagsSearch('ustensiles', e.target) }));

    // => Ajout des tags dans le dom
    ingredientsItems.append(ingredientFilteredDOM);
    appareilsItems.append(appareilsFilteredDOM);
    ustensilesItems.append(ustensilesFilteredDOM);

}


function eventDropdown() {

    // Open Dropdown
    dropdowns.forEach((drp) => {
        drp.addEventListener('click', () => {
            drp.classList.toggle('dropdown--active');

            // To get focus on input inside dropdown
            drp.getElementsByTagName('input')[0].focus();
        });
    })

    inputs_dropdown.forEach((el) => {
        el.addEventListener('input', (e) => { displayTagDropdown(); })
    })

}



function addTagsSearch(type, element) {
    let tag = element.dataset.tag;

    switch (type) {
        case 'ingredient':
            ingredients.push(tag)
            break;
        case 'appareils':
            appareils.push(tag)
            break;
        case 'ustensiles':
            ustensiles.push(tag)
            break;
    }

    let result = search(text, tagFilter(ingredients, appareils, ustensiles, recipes))

    displayRecipes(result);

}




function init() {

    // Mettre les recettes dans la variable globale
    data = recipes;

    // Display all recipes
    displayRecipes(data);

    eventDropdown();



    document.getElementById('input_search').addEventListener('input', (e) => {
        text = e.target.value;
        if (text.length >= 3) {
            let result = search(text, tagFilter(ingredients, appareils, ustensiles, recipes))
            displayRecipes(result);
            data = result;
        }
        else
            displayRecipes(recipes);
    })

}


init()