import recipesFactory from "../factories/recipes.js";
import tagFactory from "../factories/tag.js";

import { recipes } from "../../data/recipes.js";
import { search, tagFilter } from "../utils/search.js";

import { getAllIngredients, getAllAppareils, getAllUstensiles } from "../utils/tags.js"
import { FilterArrayBySearch } from "../utils/dropdown.js"


// => Variable globale pour stocker les recettes
// (Permet aux fonction pour les tags de se baser sur les recettes affichés)
let data = [];

// => Variables pour les différents filtres actifs
let text = '';
let ingredients = [];
let appareils = [];
let ustensiles = [];



// => DOMElements
let dropdowns = document.querySelectorAll('.dropdown');
let inputs_dropdown = document.querySelectorAll('.dropdown__input');

let tagsContainer = document.getElementById('tag-container');
let recipes_wrap = document.getElementById('recipe-wrap');

let ingredientsItems = document.getElementById('ingredients-items');
let appareilsItems = document.getElementById('appareils-items');
let ustensilesItems = document.getElementById('ustensiles-items');

let errorSearch = document.getElementById('error-search');


// Fonction : Affichage des recettes dans le DOM
function displayRecipes(recipes) {
    if (recipes.length >= 1) {
        // Création des vignettes via la factory Model
        let RecipesDOM = recipesFactory(recipes).createRecipesCardDOM();
        recipes_wrap.innerHTML = "";
        errorSearch.innerText = "";
        console.log(RecipesDOM)
        recipes_wrap.append(RecipesDOM)
        // RecipesDOM.forEach((element) => { recipes_wrap.append(element); })

        // Affichage des tags disponible dans les dropdowns
        displayTagDropdown();

        // Affichage des tags selectionné dans le filtre
        displayTagActive();
    }
    else {
        recipes_wrap.innerHTML = "";
        errorSearch.innerText = `Aucune recette ne contient '${text}’ vous pouvez chercher « tarte aux pommes », « poisson », etc..`
    }
}

// Fonction : Affiche les tags dans les dropdowns (suivant recettes filtré et recherche des dropdowns)
function displayTagDropdown() {

    // Récupération de tous les ingrédients, appareils et ustensiles des recettes filtrés
    let ingredientsArray = getAllIngredients(data);
    let appareilsArray = getAllAppareils(data);
    let ustensilesArray = getAllUstensiles(data);

    // Suppression des ingrédients, appareils et ustensiles déjà selectionnés dans les listes
    ingredientsArray = ingredientsArray.filter(e => ingredients.indexOf(e) === -1);
    appareilsArray = appareilsArray.filter(e => appareils.indexOf(e) === -1);
    ustensilesArray = ustensilesArray.filter(e => ustensiles.indexOf(e) === -1);

    // Création des tags a afficher grâce à la Factory Tag
    // (FilterArrayBySearch = trie les tableau d'ingrédients, appareils et ustensiles suivant la recherche des dropdowns)
    let tagModel = tagFactory();
    let ingredientFilteredDOM = tagModel.createTagDropdownDOM(FilterArrayBySearch(document.getElementById('dropdown-ingredients').value, ingredientsArray));
    let appareilsFilteredDOM = tagModel.createTagDropdownDOM(FilterArrayBySearch(document.getElementById('dropdown-appareils').value, appareilsArray));
    let ustensilesFilteredDOM = tagModel.createTagDropdownDOM(FilterArrayBySearch(document.getElementById('dropdown-ustensiles').value, ustensilesArray));

    // Suppression du DOM des anciens tags affichés dans les dropdowns
    ingredientsItems.innerHTML = "";
    appareilsItems.innerHTML = "";
    ustensilesItems.innerHTML = "";

    // Ajout eventListener Click sur les tags à affiché dans les dropdown
    ingredientFilteredDOM.childNodes.forEach(e => e.addEventListener('click', (e) => { e.stopPropagation(); addTagsSearch('I', e.target) }));
    appareilsFilteredDOM.childNodes.forEach(e => e.addEventListener('click', (e) => { e.stopPropagation(); addTagsSearch('A', e.target) }));
    ustensilesFilteredDOM.childNodes.forEach(e => e.addEventListener('click', (e) => { e.stopPropagation(); addTagsSearch('U', e.target) }));

    // Ajout des tags dans les dropdowns
    ingredientsItems.append(ingredientFilteredDOM);
    appareilsItems.append(appareilsFilteredDOM);
    ustensilesItems.append(ustensilesFilteredDOM);

}

// Fonction : Affichage des tags déjà sélectionnés dans le DOM
function displayTagActive() {

    // Création des éléments du DOM en fonction du type de tag grâce à la Factory Tag.
    let tagModel = tagFactory();
    let ingredientsActive = tagModel.createTagActiveDOM('I', ingredients);
    let appareilsActive = tagModel.createTagActiveDOM('A', appareils);
    let ustensilesActive = tagModel.createTagActiveDOM('U', ustensiles);

    // Suppression de tous les anciens tags sélectionnés dans le DOM.
    tagsContainer.innerHTML = "";

    // Ajout d'un eventListener pour gérer la suppression d'un tag selectionné
    ingredientsActive.childNodes.forEach(e => e.getElementsByTagName('svg')[0].addEventListener('click', e => deleteTagsSearch("I", e.target)))
    appareilsActive.childNodes.forEach(e => e.getElementsByTagName('svg')[0].addEventListener('click', e => deleteTagsSearch("A", e.target)))
    ustensilesActive.childNodes.forEach(e => e.getElementsByTagName('svg')[0].addEventListener('click', e => deleteTagsSearch("U", e.target)))

    // Ajout des tags selectionné sur le DOM.
    tagsContainer.append(ingredientsActive, appareilsActive, ustensilesActive);
}



// Fonction : Ajout d'un tag aux filtres et relancer la recherche
function addTagsSearch(type, element) {
    let tag = element.dataset.tag;

    // I = Ingredients, A : Appareil et U : Ustensiles
    switch (type) {
        case 'I':
            ingredients.push(tag)
            break;
        case 'A':
            appareils.push(tag)
            break;
        case 'U':
            ustensiles.push(tag)
            break;
    }

    // Execution des scripts de recherche et affichage des résultats
    let result = search(text, tagFilter(ingredients, appareils, ustensiles, recipes));
    data = result;
    displayRecipes(result);
}


// Fonction : Suppression d'un tag aux filtres et relancer la recherche
function deleteTagsSearch(type, element) {
    let tag = element.dataset.tag;

    // I = Ingredients, A : Appareil et U : Ustensiles
    switch (type) {
        case 'I':
            ingredients.splice(ingredients.indexOf(tag), 1)
            break;
        case 'A':
            appareils.splice(appareils.indexOf(tag), 1)
            break;
        case 'U':
            ustensiles.splice(ustensiles.indexOf(tag), 1)
            break;
    }

    // Execution des scripts de recherche et affichage des résultats
    let result = search(text, tagFilter(ingredients, appareils, ustensiles, recipes));
    data = result;
    displayRecipes(result);
}




function init() {

    // Stockage de toute les recettes dans la variable globale des recettes affichés
    data = recipes;

    // Display all recipes
    displayRecipes(recipes);

    // Init : EventListener barre de recherche
    document.getElementById('input_search').addEventListener('input', (e) => {
        // mise à jour de la variable de filtre de recherche
        text = e.target.value;

        let result = search(text, tagFilter(ingredients, appareils, ustensiles, recipes));
        console.log(result)
        data = result;
        displayRecipes(result);

    })

    // Init : EventListener ouverture des dropdowns
    dropdowns.forEach((drp) => {
        drp.addEventListener('click', (e) => {

            drp.classList.toggle('dropdown--active');

            // Obtenir le focus sur l'input à l'interrieur des dropdowns
            drp.getElementsByTagName('input')[0].focus();
        });
    })

    // Init : EventListener inputs dans les 3 dropdowns
    inputs_dropdown.forEach((el) => {
        el.addEventListener('input', (e) => { displayTagDropdown(); })
    })

}

// Fonction d'initialisation exécuté au chargement du dom.
window.addEventListener("DOMContentLoaded", (event) => {
    init()
});