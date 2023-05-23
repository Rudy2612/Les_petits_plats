export default function recipesFactory(recipes) {

    // Fonction : Création des cards de recettes.
    function createRecipesCardDOM() {

        var recipesCardList = document.createDocumentFragment();

        if (recipes) {
            // On parcours toutes les recettes
            recipes.forEach(element => {

                // Création de la carte
                let card = document.createElement('article');
                card.classList.add('recipeCard');


                // Création de l'image de la recette
                let image = document.createElement('div');
                image.classList.add('recipeCard__image');
                card.appendChild(image);


                // Création du bloc d'information
                let content = document.createElement('div');
                content.classList.add('recipeCard__content');
                card.appendChild(content);

                let header = document.createElement('div');
                header.classList.add('recipeCard__header');
                content.appendChild(header);

                let name = document.createElement('h2');
                name.innerText = element.name;
                header.appendChild(name);

                let timeContainer = document.createElement('div')
                timeContainer.classList.add('recipeCard__time-container')
                header.appendChild(timeContainer);

                const clock = document.createElement('img')
                clock.src = "../../assets/clock.png"
                clock.alt = "clock"
                clock.classList.add('recipeCard__clock');
                timeContainer.appendChild(clock);

                let time = document.createElement('p');
                time.innerText = element.time + "min";
                timeContainer.appendChild(time);


                // Creation des ingrédients et explication de la recette
                let wrap = document.createElement('div');
                wrap.classList.add('recipeCard__wrap');
                content.appendChild(wrap);

                let ingredientContainer = document.createElement('div')
                wrap.appendChild(ingredientContainer);

                if (element.ingredients) {
                    // On parcours tous les ingredients
                    element.ingredients.forEach((e) => {
                        let ingredientLine = document.createElement('p');
                        ingredientLine.classList.add('recipeCard__ingredient');

                        let ingredient = document.createElement('b');
                        let unite = document.createElement('span');

                        // S'il y a une quantité aux ingredients, on met le nom, la quantité et l'unité, sinon que le nom
                        if (e.quantity) {
                            ingredient.innerText = e.ingredient + ': ';
                            ingredientLine.appendChild(ingredient);
                            unite.innerText = String(e.quantity) + (e.unit ? " " + e.unit : "");
                            ingredientLine.appendChild(unite)
                        }
                        else {
                            ingredient.innerText = e.ingredient;
                            ingredientLine.appendChild(ingredient);
                        }

                        ingredientContainer.appendChild(ingredientLine);
                    })
                }

                let description = document.createElement('p');
                description.innerText = element.description;
                description.classList.add('recipeCard__description');
                wrap.appendChild(description);

                // Ajout de la carte à la liste de carte à retourner
                recipesCardList.append(card)
            });

            return recipesCardList;

        }
    }


    return { createRecipesCardDOM }
}