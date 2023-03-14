import ApiService from '../api/apiService';
import { renderModalCoctails } from '../render/render-modal-coctail';
import { handleOpenModalIngridients } from '../home/open-close-modalIng';
import icons from '../../images/icons.svg';
import FavGallery from '../favorites/build-fav-gallery';

const LS_KEY_FAV_COCKT = 'Fav-Cocktails';

const backdrop = document.querySelector('.backdrop');
const modalCoctailsEl = document.querySelector('.modal-coctails');
const galleryEl = document.querySelector('.gallery');

const api = new ApiService();
export async function handleOpenCloseModal(e) {
  if (!e.target.classList.contains('buttons__btn--learn-more')) {
    return;
  }
  const idCard = e.target.closest('.js-card').id;
  const data = await api.fetchDataById(idCard);
  renderModalCoctails(data[0]);

  onCloseModalhandler();
  modalCoctailsEl.addEventListener('click', hendleInModalCocktClick);

  getIngridientsList(e)
  getModalCloseBtn()
}

function hendleInModalCocktClick(e) {
  const favCocktails = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));
  let favCocktailID = e.target.id;

  if (e.target.classList.contains('js-cockt-add-modal')) {
    favCocktails.push(favCocktailID);
    localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify(favCocktails));
    changeContentInModalCoctailBtn(e);
    foundCurrentCardAndChangeContentInBtn(e);
    return;
  }
  if (e.target.classList.contains('js-cockt-remove-modal')) {
    const filtred = favCocktails.filter(i => i !== favCocktailID);
    localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify(filtred));
    changeContentInModalCoctailBtn(e);
    foundCurrentCardAndChangeContentInBtn(e);
    return;
  }
}
// доп функції
function getIngridientsList(e) {
  const ingridientsList = modalCoctailsEl.querySelector('.ingridients-list');
  ingridientsList.addEventListener('click', (e) => {
    e.preventDefault();
    ingridientsListHandler(e)
  });
}
function getModalCloseBtn() {
  const closeModal = modalCoctailsEl.querySelector('.close-modal');
  closeModal.addEventListener('click', handlerCloseModal);
}
function handlerCloseModal() {
  onCloseModalhandler()
  isFavoritePage()
}
function isFavoritePage() {
  if (window.location.href.includes('favorite')) {
    const favGallery = new FavGallery();
    favGallery.renderFav();
  }
}
function onCloseModalhandler() {
  backdrop.classList.toggle('is-hidden');
  modalCoctailsEl.classList.toggle('is-hidden');
}
function ingridientsListHandler(e) {
  if (e.target.classList.contains('ingridients-link')) {
    handleOpenModalIngridients(e);
  }
}
function foundCurrentCardAndChangeContentInBtn(e) {
  const cards = galleryEl.querySelectorAll('.card');
  cards.forEach(el => {
    if (el.id === e.target.id) {
      changeContentAddRemoveBtnInGalleryCard(el)
    }
  });
}
function changeContentAddRemoveBtnInGalleryCard(el) {
  let btn = el?.querySelector('.js-cockt-add') || el?.querySelector('.js-cockt-remove');
  btn.classList.toggle('js-cockt-add');
  btn.classList.toggle('js-cockt-remove');
  btn.innerHTML = btn.classList.contains('js-cockt-add')
    ? `Add to<svg class="buttons__icon"><use href="${icons}#heart"></use></svg>`
    : `Remove<svg class="buttons__icon"><use href="${icons}#icon-heart_fill"></use></svg>`;
}
function changeContentInModalCoctailBtn(e) {
  e.target.classList.toggle('js-cockt-add-modal');
  e.target.classList.toggle('js-cockt-remove-modal');
  e.target.textContent = e.target.classList.contains('js-cockt-remove-modal')
    ? 'Remove from favorites'
    : 'Add to favorites';
}