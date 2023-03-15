import { getFavIngData } from '../render/render-fav-ing'
import { getDataFromLockalStorageByKey } from '../utils/getDataFromLockalStorageByKey';
import { setDataToLocalStorageByKey } from '../utils/setDataToLocalStorageByKey';
import { getCardId } from '../utils/getCardId';

const LS_KEY_FAV_ING = 'Fav-Ingredients';
const body = document.querySelector('body');


export function handleClickAddToFavIngr(e) {
  const elem = e.target;

  const addBtn = elem.closest('.js-ing-add');
  const removeBtn = elem.closest('.js-ing-remove');
  const closeModal2 = elem.closest('.close-modal2');
  const closeModal2Fav = elem.closest('.close-modal2-fav');

  const favIngs = getDataFromLockalStorageByKey(LS_KEY_FAV_ING);

  if (addBtn) {
    const ingId = getCardId(addBtn, '.ing-wrapper');
    if (!favIngs) {
      addToFavorites(addBtn, ingId);
      return
    }
    addToFavorites(addBtn, ingId, favIngs);
    return
  }

  if (removeBtn) {
    const ingId = getCardId(removeBtn, '.ing-wrapper');
    removeCardIdFromLockalStorage(ingId, favIngs)
    changeContentInIngrCardAddRemoveBtn(removeBtn);
    return
  }

  if (closeModal2) {
    body.removeEventListener('click', handleClickAddToFavIngr);
    return
  }
  if (closeModal2Fav) {
    body.removeEventListener('click', handleClickAddToFavIngr);
    getFavIngData();
    return
  }
}
function addToFavorites(elem, ingId, favIngs = []) {
  favIngs.push(ingId);
  setDataToLocalStorageByKey(LS_KEY_FAV_ING, favIngs);
  changeContentInIngrCardAddRemoveBtn(elem)
}
function removeCardIdFromLockalStorage(ingId, favIngs = []) {
  const filtredData = favIngs.filter(i => i !== ingId);
  setDataToLocalStorageByKey(LS_KEY_FAV_ING, filtredData)
}
function changeContentInIngrCardAddRemoveBtn(elem) {
  elem.classList.toggle('js-ing-remove');
  elem.classList.toggle('js-ing-add');
  elem.innerHTML = elem.classList.contains('js-ing-remove')
    ? `Remove from favorites`
    : `Add to favorites`;
}


