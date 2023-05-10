

function createTagDropdownDOM(ingredients, id) {
    let ingredientsArray = document.createDocumentFragment();
    ingredients.forEach((ingredient) => {
        let ingredientItem = document.createElement('span');
        ingredientItem.id = id
        ingredientItem.innerText = ingredient
        ingredientItem.dataset.tag = ingredient
        ingredientsArray.append(ingredientItem)
    })


    return ingredientsArray;
}


function filterTag(filterText, tags) {
    let filterArray = [];
    if (tags) {
        tags.forEach(element => {
            if (element.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
                filterArray.push(element)
            }
        });
    }
    return filterArray
}



export { createTagDropdownDOM, filterTag }