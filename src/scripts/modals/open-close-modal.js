import ApiService from '../api/apiService';
import { renderModalCoctails } from '../render/render-modal-coctail';
import { handleOpenModalIngridients } from '../home/open-close-modalIng';
import icons from '../../images/icons.svg';
import FavGallery from '../favorites/build-fav-gallery';
const LS_KEY_FAV_COCKT = 'Fav-Cocktails';

const backdrop = document.querySelector('.backdrop');
const modalCoctailsEl = document.querySelector('.modal-coctails');
const galleryEl = document.querySelector('.gallery');

// const learnMoreBtn = document.querySelector('.buttons__btn--learn-more');
// console.log(learnMoreBtn);

const apiId = new ApiService();
export async function handleOpenCloseModal(e) {
  if (!e.target.classList.contains('buttons__btn--learn-more')) {
    return;
  }
  const idCard = e.target.closest('.js-card').id;
  const data = await apiId.fetchDataById(idCard);
  // console.log(data);
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
  console.log(e.target);
  const favCocktails = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));
  let favCocktailID = e.target.id;
  console.log(favCocktailID);
  if (e.target.classList.contains('js-cockt-add-modal')) {
    favCocktails.push(favCocktailID);
    console.log(JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT)));
    localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify(favCocktails));
    console.log(JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT)));
    e.target.classList.toggle('js-cockt-remove-modal');
    e.target.classList.toggle('js-cockt-add-modal');
    e.target.textContent = 'Remove from favorites';
    console.log('add');
    const el = galleryEl.querySelectorAll('.card');
    console.log(el);
    let curentBtn;
    el.forEach(e => {
      if (e.id === favCocktailID) {
        curentBtn = e.querySelector('.js-cockt-add');
        curentBtn.classList.toggle('js-cockt-remove');
        curentBtn.classList.toggle('js-cockt-add');
        curentBtn.innerHTML = `Remove<svg class="buttons__icon"><usehref="${icons}#icon-heart_fill"></use></svg>`
        console.log(curentBtn);
      }
    });

    return;
  }
  if (e.target.classList.contains('js-cockt-remove-modal')) {
    console.log(JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT)));
    const idx = favCocktails.findIndex(ing => ing === favCocktailID);
    console.log(idx);
    favCocktails.splice(idx, 1); //  переписати на сорт!!!!
    localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify(favCocktails));
    console.log(JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT)));
    e.target.classList.toggle('js-cockt-add-modal');
    e.target.classList.toggle('js-cockt-remove-modal');
    e.target.textContent = 'Add to favorites';
    console.log('remove');
    const el = galleryEl.querySelectorAll('.card');
    // console.log(el);
    let curentBtn;
    el.forEach(e => {
      if (e.id === favCocktailID) {
        curentBtn = e.querySelector('.js-cockt-remove');
        curentBtn.classList.toggle('js-cockt-add');
        curentBtn.classList.toggle('js-cockt-remove');
        console.log(curentBtn);

        curentBtn.innerHTML =  `Add to<svg class="buttons__icon"><use href="${icons}#heart"></use></svg>`;
        console.log(curentBtn);

      }
    });

    return;
  }
}
