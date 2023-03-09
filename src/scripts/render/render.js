import icons from "../../images/icons.svg"

const galleryEl = document.querySelector('.gallery__wrapper');
import icons from "../../images/icons.svg"


export default class Render {
    constructor() { }
    // Рендеримо галерею
    renderGallery(data) {
        const galleryItems = data.map(({ strDrinkThumb, strDrink, idDrink }) => {
            const lockalStorageItems = JSON.parse(localStorage.getItem('favIds'));

            if(!lockalStorageItems) {
                localStorage.setItem('favIds'.stringify([]));
              }


            const isInLS = lockalStorageItems.includes(idDrink);
            const className = isInLS ? 'fav-buttons__btn--remove' : 'buttons__btn--add-to';
            const btnText = isInLS
                ? `Remove<svg class="buttons__icon"><usehref="${icons}#heart"></usehref=></svg>`
                : `Add to<svgclass="buttons__icon"><use href="${icons}#heart"></use></>`;

            return `<div class="card" id="${idDrink}">
                <img src="${strDrinkThumb}" alt="${strDrink}" class="card__img">
                <h3 class="card__title">${strDrink}</h3>
                <div class="buttons">
                    <button type="button" class="buttons__btn buttons__btn--learn-more">Learn more</button>
                    <button type="button" class="buttons__btn ${className}" data-id="${idDrink}">${btnText}
                    <svg class="buttons__icon">
                        <use href="${icons}#heart"></use>
                    </svg>
                    <svg class="buttons__icon buttons__icon-fill">
                        <use href="${icons}#icon-heart_fill"></use>
                    </svg>
                    </button>
                </div>
            </div>`;
        })
            .join('');

        galleryEl.insertAdjacentHTML('beforeend', galleryItems);
    }

    createNotFoundMarkup() {
        return `<div class="not-found">
        <h2 class="not-found__title">Sorry, we didn't find any cocktail for you</h2>
        <svg class="not-found__icon">
        <use href="${icons}#icon-sorry"></use>
        </svg>
        </div>`;
    }
}
