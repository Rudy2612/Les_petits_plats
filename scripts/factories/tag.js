export default function tagFactory() {

    // Fonction : création des tags inclus dans les dropdown.
    function createTagDropdownDOM(tags) {
        let tagsArray = document.createDocumentFragment();
        tags.forEach((element) => {
            let tag_item = document.createElement('span');
            tag_item.innerText = element
            tag_item.dataset.tag = element
            tagsArray.append(tag_item)
        })
        return tagsArray;
    }

    // Fonction : création des tags actifs sur le dom.
    function createTagActiveDOM(type, tag) {
        let tagArray = document.createDocumentFragment();

        tag.forEach((element) => {
            let tag_item = document.createElement('div');
            tag_item.classList.add('active_tag')

            // class particulière suivant le type (I: ingredients, A: Appareils et U: Usetensils)
            switch (type) {
                case 'I':
                    tag_item.classList.add('ing_tag')
                    break;
                case 'A':
                    tag_item.classList.add('app_tag')
                    break;
                case 'U':
                    tag_item.classList.add('use_tag')
                    break;
            }

            let tag_text = document.createElement('span');
            tag_text.innerText = element
            tag_item.append(tag_text);

            tag_item.innerHTML += '<svg xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 512 512" > <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg >'

            tag_item.dataset.tag = element
            tagArray.append(tag_item)
        })

        return tagArray;
    }

    return { createTagDropdownDOM, createTagActiveDOM }
}