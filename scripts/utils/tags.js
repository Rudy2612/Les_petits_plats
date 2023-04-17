

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