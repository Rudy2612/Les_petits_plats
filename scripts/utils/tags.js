// Fonction : Permet d'obtenir un tableau avec tous les ingredients d'un tableau de recettes
function getAllIngredients(data) {
    let ingredientsArray = [];

    data.forEach(element => {
        let ingredientsRecipe = element.ingredients;
        ingredientsRecipe.forEach((ingredients) => {
            if (ingredientsArray.indexOf(ingredients.ingredient) === -1) {
                ingredientsArray.push(ingredients.ingredient)
            }
        })
    })

    return ingredientsArray;
}

// Fonction : Permet d'obtenir un tableau avec tous les appareils d'un tableau de recettes
function getAllAppareils(data) {
    let appareilArray = [];

    data.forEach(element => {
        let appliance = element.appliance;
        if (appareilArray.indexOf(appliance) === -1) {
            appareilArray.push(appliance)
        }
    })

    return appareilArray;
}

// Fonction : Permet d'obtenir un tableau avec tous les ustensiles d'un tableau de recettes
function getAllUstensiles(data) {
    let ustensilesArray = [];

    data.forEach(element => {
        let ustensiles = element.ustensils;

        ustensiles.forEach((ustensile) => {
            if (ustensilesArray.indexOf(ustensile) === -1) {
                ustensilesArray.push(ustensile)
            }
        })
    })

    return ustensilesArray;
}



export { getAllIngredients, getAllAppareils, getAllUstensiles };