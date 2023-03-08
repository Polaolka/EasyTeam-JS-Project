import ApiService from '../api/apiService';
import Render from '../render/render';
import { handleOpenCloseModalFavorite } from '../modals/open-close-modal';

const render = new Render();
const apiService = new ApiService();

const favWrapper = document.querySelector('.fav-cocktails__box');
const favTitle = document.querySelector('.fav-cocktails__title');


export default class FavGallery {
  async render() {
    const favIds = JSON.parse(localStorage.getItem('favIds') ?? '[]');

    if (favIds.length === 0) {
      const notFoundBlock = render.createNotFoundMarkup();
      favTitle.style.display = 'none';
      favWrapper.insertAdjacentHTML('beforeend', notFoundBlock);
      return
    }


    for (let i = 0; i < favIds.length; i += 1) {
      const drink = await apiService.fetchDataById(favIds[i]);

      const code = this.renderFavGallery(drink[0]);
      favWrapper.insertAdjacentHTML('beforeend', code);
    }
    favTitle.style.display = 'block';
    this.addListeners();
  }

  async renderByLetter(letter) {
    const favIds = JSON.parse(localStorage.getItem('favIds') ?? '{}')

    for (let id in favIds) {
      const drink = await apiService.fetchDataById(id);

      if (!drink[0].strDrink.toLowerCase().startsWith(letter.toLowerCase()))
        continue;

      const code = this.renderFavGallery(drink[0]);

      favWrapper.insertAdjacentHTML('beforeend', code);
    }

    this.addListeners();
  }

  removeCocktails() {
    favWrapper.innerHTML = '';
  }

  addListeners() {
    favWrapper.addEventListener('click', (e) => {
      const elem = e.target;
      const removeBtn = elem.closest('.fav-buttons__btn--remove');
      const learnMoreBtn = elem.closest('.fav-buttons__btn--learn-more');

      if (removeBtn) {
        this.removeFromFavorite(removeBtn);
      }
      if (learnMoreBtn) {
        const elem = e.target
        const id = elem.closest('.fav-card').id;
        handleOpenCloseModalFavorite(id);
      }

    })

  }

  addToFavorite(addToBtn) {
    const id = addToBtn.dataset.id;
    const favIds = JSON.parse(localStorage.getItem('favIds') ?? '[]');

    if (!favIds.includes(id)) {
      favIds.push(id);
      localStorage.setItem('favIds', JSON.stringify(favIds));
    }
  }

  removeFromFavorite(btnEl) {
    const id = btnEl.dataset.id;

    const favIds = JSON.parse(localStorage.getItem('favIds') ?? '[]')

    const filtred = favIds.filter((i) => i !== id);
    btnEl.closest('.fav-card').remove()
    if (filtred.length === 0) {
      localStorage.removeItem('favIds')
      this.render()
      return
    }
    localStorage.setItem('favIds', JSON.stringify(filtred));
  }
  removeFromFavoriteFromGallery(btnEl) {
    const id = btnEl.dataset.id;

    const favIds = JSON.parse(localStorage.getItem('favIds') ?? '[]')

    const filtred = favIds.filter((i) => i !== id);
    if (filtred.length === 0) {
      localStorage.removeItem('favIds')
      return
    }
    localStorage.setItem('favIds', JSON.stringify(filtred));
  }

  renderFavGallery({ strDrinkThumb, strDrink, idDrink }) {
    return `<div class="fav-card" id="${idDrink}">
        <img src="${strDrinkThumb}" alt="${strDrink}" class="fav-card__img" />
        <h3 class="fav-card__title">${strDrink}</h3>
        <div class="fav-buttons">
          <button type="button" class="fav-buttons__btn fav-buttons__btn--learn-more">Learn more</button>
          <button type="button" class="fav-buttons__btn fav-buttons__btn--remove" data-id="${idDrink}">Remove
            <svg class="fav-buttons__icon">
              <use href="./images/icons.svg#icon-heart_fill"></use>
            </svg>
          </button>
        </div>
      </div>`;
  }
}