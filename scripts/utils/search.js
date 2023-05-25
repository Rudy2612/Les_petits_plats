function search(recherche, data) {

    let recipeFiltered = []

    // Si la recherche textuel est suffisament longue, on execute la recherche
    if (recherche.length >= 3) {

        // On parcours toutes les recettes
        data.forEach(recipe => {

            var isMatchText = false;

            // -> Filtrage input (nom, description et ingrédients)
            let terms = recherche.toLowerCase();

            let name = recipe.name.toLowerCase();
            let description = recipe.description.toLowerCase();
            let ingredients = recipe.ingredients;


            // Si la recherche est incluse dans le nom ou la description => valide la condition
            if (name.includes(terms) || description.includes(terms))
                isMatchText = true;


            // Si la recherche correspond à un ingredient => valide la condition
            if (ingredients.filter(item => item.ingredient.includes(terms)).length >= 1)
                isMatchText = true;


            // Si la recette correspond à la recherche => Ajout à la variable retournée
            if (isMatchText)
                recipeFiltered.push(recipe)

        });
    }
    else {
        // Si la recherche fait moins de 3 caractères, on retourne toutes les recettes en paramètre
        recipeFiltered = data;
    }

    return recipeFiltered;
}



// Fonction qui retourne les recettes qui correspondent aux tags
function tagFilter(ingredients, appareils, ustensiles, recipes) {
    let finalArray = [];

    recipes.forEach(element => {
        let isMatchIngredient = false;
        let isMatchAppareils = false;
        let isMatchUstensiles = false;


        // => Trie tag ingrédient
        let IngredientsInRecipe = element.ingredients.map((e) => e.ingredient);
        if (ingredients.length >= 1) {
            // Si tous les éléments des tags sont compris dans la recette
            if (ingredients.every((e) => IngredientsInRecipe.includes(e))) {
                isMatchIngredient = true;
            }
        }
        else
            isMatchIngredient = true;


        // => Trie tag appareil
        if (appareils.length >= 1) {
            if (appareils.includes(element.appliance))
                isMatchAppareils = true;
        }
        else
            isMatchAppareils = true;



        // => Trie tag ustensiles
        let ustensilesRecipe = element.ustensils;
        if (ustensiles.length >= 1) {
            // Si tous les éléments des tags sont compris dans la recette
            if (ustensiles.every((e) => ustensilesRecipe.includes(e))) {
                isMatchUstensiles = true;
            }
        }
        else
            isMatchUstensiles = true;

        // console.log(isMatchIngredient, isMatchAppareils, isMatchUstensiles)

        if (isMatchIngredient === true && isMatchAppareils === true && isMatchUstensiles === true) {
            finalArray.push(element)
        }
    });

    return finalArray;

}


export { search, tagFilter };