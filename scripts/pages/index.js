import recipesFactory from "../factories/recipes.js"




// Temporaire
document.querySelectorAll('.dropdown').forEach((b) => {
    b.addEventListener('click', () => {
        b.classList.toggle('dropdown--active');
    })
})


function displayCard(recipes) {
    let recipeModel = recipesFactory(recipes);
    let domElements = recipeModel.createCardDOM();
    domElements.forEach((element) => {
        document.getElementById('recipe-wrap').append(element);
    })




}



function init() {
    displayCard(recipes);
}


init()