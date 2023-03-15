import icons from '../../images/icons.svg';
import Gallery from '../gallery/gallery';

const LS_KEY_FAV_COCKT = 'Fav-Cocktails';
const galleryEl = document.querySelector('.gallery__wrapper');
const galleryTitle = document.querySelector('.gallery__title');

export default class Render {
  // Рендеримо галерею
  renderGallery(data) {
    const gallery = new Gallery();
    const galleryItems = data.map(({ strDrinkThumb, strDrink, idDrink }) => {

      let lockalStorageItems = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));
      if (!lockalStorageItems) {
        lockalStorageItems = [];
      }
      const isInLS = lockalStorageItems.includes(idDrink);

      const className = isInLS
        ? 'fav-buttons__btn--remove js-cockt-remove'
        : 'buttons__btn--add-to js-cockt-add';

      const btnText = isInLS
        ? `Remove<svg class="buttons__icon"><use href="${icons}#icon-heart_fill"></use></svg>`
        : `Add to<svg class="buttons__icon"><use href="${icons}#heart"></use></svg>`;

      return `<div class="card js-card" id="${idDrink}">
                <img src="${strDrinkThumb}" alt="${strDrink}" class="card__img">
                <h3 class="card__title">${strDrink}</h3>
                <div class="buttons">
                    <button type="button" class="buttons__btn buttons__btn--learn-more">Learn more</button>
                    <button type="button" class="buttons__btn ${className} " data-id="${idDrink}">${btnText}</button>
                </div>
            </div>`;
    })
      .join('');

    gallery.clearGallery();
    galleryEl.insertAdjacentHTML('beforeend', galleryItems);
  }

  renderNotFound() {
    galleryTitle.style.display = 'none';
    galleryEl.innerHTML = this.createNotFoundMarkup();
  }

  createNotFoundMarkup() {
    return `<div class="not-found">
        <h2 class="not-found__title">Sorry, we didn't find any cocktail for you</h2>
        <svg class="not-found__icon">
        <use href="${icons}#icon-sorry"></use>
        </svg>
        </div>`;
  }

  createSceletonMarkup() {
    return `<div class="card sceleton--card">
                <div class="sceleton sceleton--img"></div>
                <h3 class="card__title sceleton sceleton--title"></h3>
                <div class="buttons">
                    <button type="button" class="buttons__btn sceleton sceleton--btn"> </button>
                    <button type="button" class="buttons__btn sceleton sceleton--btn"> </button>
                </div>
            </div>`;
  }
}
