export default function recipesFactory(recipes) {


    function createRecipesCardDOM() {

        let dom = [];

        if (recipes) {
            recipes.forEach(element => {

                let card = document.createElement('article');
                card.classList.add('recipeCard');

                let image = document.createElement('div');
                image.classList.add('recipeCard__image');
                card.appendChild(image);


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


                let wrap = document.createElement('div');
                wrap.classList.add('recipeCard__wrap');
                content.appendChild(wrap);

                let ingredientContainer = document.createElement('div')
                wrap.appendChild(ingredientContainer);

                if (element.ingredients) {
                    element.ingredients.forEach((e) => {
                        let ingredientLine = document.createElement('p');
                        ingredientLine.classList.add('recipeCard__ingredient');


                        let ingredient = document.createElement('b');
                        ingredient.innerText = e.ingredient + ': ';
                        ingredientLine.appendChild(ingredient);

                        let unite = document.createElement('span');
                        unite.innerText = String(e.quantity) + (e.unit ? " " + e.unit : "");
                        ingredientLine.appendChild(unite)


                        ingredientContainer.appendChild(ingredientLine);
                    })
                }

                let description = document.createElement('p');
                description.innerText = element.description;
                description.classList.add('recipeCard__description');
                wrap.appendChild(description);

                dom.push(card)
            });


            return dom;

        }
    }


    return { createRecipesCardDOM }
}