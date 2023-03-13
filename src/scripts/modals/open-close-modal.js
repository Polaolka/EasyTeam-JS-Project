import ApiService from '../api/apiService';
import { renderModalCoctails } from '../render/render-modal-coctail';
import { handleOpenModalIngridients } from '../home/open-close-modalIng';
import icons from '../../images/icons.svg';
import FavGallery from '../favorites/build-fav-gallery';
const LS_KEY_FAV_COCKT = 'Fav-Cocktails';

const backdrop = document.querySelector('.backdrop');
const modalCoctailsEl = document.querySelector('.modal-coctails');
const galleryEl = document.querySelector('.gallery');

const apiId = new ApiService();
export async function handleOpenCloseModal(e) {
  if (!e.target.classList.contains('buttons__btn--learn-more')) {
    return;
  }
  const idCard = e.target.closest('.js-card').id;
  const data = await apiId.fetchDataById(idCard);

  renderModalCoctails(data[0]);

  backdrop.classList.remove('is-hidden');
  modalCoctailsEl.classList.remove('is-hidden');
  modalCoctailsEl.addEventListener('click', hendleInModalCocktClick);

  modalCoctailsEl
    .querySelector('.ingridients-list')
    .addEventListener('click', e => {
      const itemEl = e.target;
      if (itemEl.classList.contains('ingridients-link')) {
        handleOpenModalIngridients(e);
      }
    });

  const closeModal = document.querySelector('.close-modal');
  closeModal.addEventListener('click', () => {
    backdrop.classList.add('is-hidden');
    modalCoctailsEl.classList.add('is-hidden');
  });
}

function hendleInModalCocktClick(e) {
  const isAddToFavBtn = e.target.classList.contains('js-cockt-add-modal');
  const isRemoveFromFavBtn = e.target.classList.contains(
    'js-cockt-remove-modal'
  );
  if (isAddToFavBtn && isRemoveFromFavBtn) return;

  const favCocktails = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));
  let favCocktailID = e.target.id;

  if (e.target.classList.contains('js-cockt-add-modal')) {
    favCocktails.push(favCocktailID);

    localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify(favCocktails));

    addTogler(e);

    const el = galleryEl.querySelectorAll('.card');

    let curentBtn;
    el.forEach(e => {
      if (e.id === favCocktailID) {
        rerenderAddToFavBtn(e);
      }
    });

    return;
  }
  if (e.target.classList.contains('js-cockt-remove-modal')) {
    const filtred = favCocktails.filter(i => i !== favCocktailID);
    localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify(filtred));
    removeTogler(e);
    const el = galleryEl.querySelectorAll('.card');

    el.forEach(e => {
      if (e.id === favCocktailID) {
        rerenderAddToFavBtn(e);
      }
    });

    return;
  }
}

export async function handleOpenCloseModalInFav(e) {
  if (!e.target.classList.contains('buttons__btn--learn-more')) {
    return;
  }
  const idCard = e.target.closest('.js-card').id;
  const data = await apiId.fetchDataById(idCard);
  renderModalCoctails(data[0]);

  backdrop.classList.remove('is-hidden');
  modalCoctailsEl.classList.remove('is-hidden');
  modalCoctailsEl.addEventListener('click', hendleInModalCocktClickFav);

  modalCoctailsEl
    .querySelector('.ingridients-list')
    .addEventListener('click', e => {
      const itemEl = e.target;
      if (itemEl.classList.contains('ingridients-link')) {
        handleOpenModalIngridients(e);
      }
    });

  const closeModal = document.querySelector('.close-modal');
  closeModal.addEventListener('click', () => {
    backdrop.classList.add('is-hidden');
    modalCoctailsEl.classList.add('is-hidden');
    // !!!! перерендер фав гал
    const favGallery = new FavGallery();
    favGallery.renderFav();
  });
}

function hendleInModalCocktClickFav(e) {перепи
  const isAddToFavBtn = e.target.classList.contains('js-cockt-add-modal');
  const isRemoveFromFavBtn = e.target.classList.contains(
    'js-cockt-remove-modal'
  );
  if (isAddToFavBtn && isRemoveFromFavBtn) return;

  const favCocktails = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));
  let favCocktailID = e.target.id;

  if (e.target.classList.contains('js-cockt-add-modal')) {
    favCocktails.push(favCocktailID);
    localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify(favCocktails));
    addTogler(e);
    const el = galleryEl.querySelectorAll('.card');
    el.forEach(e => {
      if (e.id === favCocktailID) rerenderAddToFavBtn(e);
    });
    return;
  }
  if (e.target.classList.contains('js-cockt-remove-modal')) {
    const filtred = favCocktails.filter(i => i !== favCocktailID);
    localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify(filtred));
    removeTogler(e);
    const el = galleryEl.querySelectorAll('.card');
    el.forEach(e => {
      if (e.id === favCocktailID) rerenderRemoveFromFavBtn(e);
    });
    return;
  }
}

function rerenderAddToFavBtn(e) {
  let curentBtn;
  curentBtn = e.querySelector('.js-cockt-add');
  curentBtn.classList.toggle('js-cockt-remove');
  curentBtn.classList.toggle('js-cockt-add');
  curentBtn.innerHTML = `Remove<svg class="buttons__icon"><use href="${icons}#icon-heart_fill"></use></svg>`;
}

function rerenderRemoveFromFavBtn(e) {
  let curentBtn;
  curentBtn = e.querySelector('.js-cockt-remove');
  curentBtn.classList.toggle('js-cockt-add');
  curentBtn.classList.toggle('js-cockt-remove');
  curentBtn.innerHTML = `Add to<svg class="buttons__icon"><use href="${icons}#heart"></use></svg>`;
}

function removeTogler(e) {
  e.target.classList.toggle('js-cockt-add-modal');
  e.target.classList.toggle('js-cockt-remove-modal');
  e.target.textContent = 'Add to favorites';
}
 function addTogler(e) {
  e.target.classList.toggle('js-cockt-remove-modal');
  e.target.classList.toggle('js-cockt-add-modal');
  e.target.textContent = 'Remove from favorites';
 }