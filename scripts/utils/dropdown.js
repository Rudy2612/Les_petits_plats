// Fonction : Trie les tags s'il correspondent ou non à la recherche passé en paramètre (dropdown)
function FilterArrayBySearch(filterText, tags) {
    let filterArray = [];
    if (tags) {
        // Boucle du tableau de tags passé en paramètres
        tags.forEach(element => {
            // Si le tag en question correcpond à la recherche fait sur le dropdown, alors on l'ajout au tableau à retourné
            if (element.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
                filterArray.push(element)
            }
        });
    }
    return filterArray
}



export { FilterArrayBySearch }