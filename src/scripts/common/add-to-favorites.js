import icons from '../../images/icons.svg';
import { getCardId } from '../utils/getCardId';
import { getDataFromLockalStorageByKey } from '../utils/getDataFromLockalStorageByKey';
import { setDataToLocalStorageByKey } from '../utils/setDataToLocalStorageByKey';

const LS_KEY_FAV_COCKT = 'Fav-Cocktails';

import FavGallery from '../favorites/build-fav-gallery';

export function addToFavHandlerN(e) {
  const elem = e.target;

  const addBtn = elem.closest('.js-cockt-add');
  const removeBtn = elem.closest('.js-cockt-remove');

  if (addBtn) {
    addToFavoriteCoctails(addBtn);
    return;
  }

  if (removeBtn) {
    removeCardIdFromLockalStorage(cardId, favCocktails);
    changeContentInCardAddRemoveBtn(removeBtn);
    return;
  }
}
export function removeFromFavHandler(e) {
  if (!e.target.classList.contains('js-cockt-remove')) {
    return;
  }
  const favCocktails = getDataFromLockalStorageByKey(LS_KEY_FAV_COCKT);
  const cardId = getCardId(e.target);
  removeCardIdFromLockalStorage(cardId, favCocktails);
  const favGallery = new FavGallery();
  favGallery.renderFav();
  return;
}

function addToFavoriteCoctails(el) {
  const favCocktails = getDataFromLockalStorageByKey(LS_KEY_FAV_COCKT);
  const cardId = getCardId(el);
  if (!favCocktails) {
    addCardIdToLockalStorage(el, cardId);
    return;
  }
  addCardIdToLockalStorage(el, cardId, favCocktails);
  return;
}
function removeCardIdFromLockalStorage(cardId, favCocktails = []) {
  const filtredData = favCocktails.filter(i => i !== cardId);
  setDataToLocalStorageByKey(LS_KEY_FAV_COCKT, filtredData)
}
function addCardIdToLockalStorage(el, cardId, favCocktails = []) {
  favCocktails.push(cardId);
  setDataToLocalStorageByKey(LS_KEY_FAV_COCKT, favCocktails);
  changeContentInCardAddRemoveBtn(el);
}
function changeContentInCardAddRemoveBtn(el) {
  el.classList.toggle('js-cockt-remove');
  el.classList.toggle('js-cockt-add');
  el.innerHTML = el.classList.contains('js-cockt-remove')
    ? `Remove<svg class="buttons__icon"><use href="${icons}#icon-heart_fill"></use></svg>`
    : `Add to<svg class="buttons__icon"><use href="${icons}#heart"></use></svg>`;
}