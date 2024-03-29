import icons from '../../images/icons.svg';
import { handleClickAddToFavIngr } from '../favorites/favorite-ing';
import { getDataFromLockalStorageByKey } from '../utils/getDataFromLockalStorageByKey';

const LS_KEY_FAV_ING = 'Fav-Ingredients';
const modalIngEl = document.querySelector('.components');
const body = document.querySelector('body');



export function renderModalIngr(data) {
  const favIngWrapper = document.querySelector('.fav-ing-wrapper');
  const closeElem = !favIngWrapper ?
    `<svg class="close-modal2" width="32" height="32"><use href="${icons}#icon-close-modal"></use></svg>` :
    `<svg class="close-modal2-fav" width="32" height="32"><use href="${icons}#icon-close-modal"></use></svg>`;

  const { classIng, textContentIng } = checkFavIng(data);
  const markupModalIng = `
  <div class="ing-wrapper" id="${data.idIngredient}">
  ${closeElem}
  <div class="component-name-wraper">
    <h2 class="component-name">${data.strIngredient}</h2>
   
    <h3 class="component-type">${data.strType}</h3>
  </div>
  <div class="line"></div>
  <div class="componet-descriptio-wraper">
   
     ${data.strDescription
      ? `<div class="description-wraper"> <p class="component-description">
      ${data.strDescription}</p></div>`
      : ''
    }
    
    <ul class="component-list">
      <li class="component-list-item"><span class="marker">✶</span> Type:${data.strType
    }</li>
      ${data.strABV
      ? `<li class="component-list-item"><span class="marker">✶</span>  Alcohol by volume:${data.strABV}%</li>
      <li class="component-list-item"><span class="marker">✶</span> This ingredient is alcoholic:${data.strAlcohol}</li>`
      : ''
    }
      
    </ul>
    <div class="component-btn-wraper"><button type="button" class="button-components-add ${classIng}">${textContentIng}</button></div>
  </div>
  </div>`;

  modalIngEl.innerHTML = markupModalIng;

  body.addEventListener('click', handleClickAddToFavIngr);
}

export function renderModalWithoutIng(data) {
  const notFoundInf = `
  <svg class="close-modal2" width="32" height="32">
  <use href="${icons}#icon-close-modal"></use>
</svg>
<h3 class="component-not">Sorry, we don't find information about ${data.strIngredient}</h3>`;
  modalIngEl.innerHTML = notFoundInf;
}

function checkFavIng(data) {
  let favIngs = getDataFromLockalStorageByKey(LS_KEY_FAV_ING);
  if (!favIngs) {
    favIngs = [];
  }
  const isInFavIngs = favIngs.includes(data.idIngredient);
  const classIng = isInFavIngs ? "js-ing-remove" : "js-ing-add";
  const textContentIng = isInFavIngs ? "Remove from favorite" : "Add to favorite";

  return {
    classIng,
    textContentIng,
  }
}