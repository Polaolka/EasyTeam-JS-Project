import icons from '../../images/icons.svg';
import { handleClickAddToFavIngr } from '../favorites/favorite-ing';
import { checkFavIng } from "../favorites/favorite-ing";

// import { checkFavIng } from '../favorites/favorite-ing';

const modalIngEl = document.querySelector('.components');
const body = document.querySelector('body');

export function renderModalIngr(data) {
  const { classIng, textContentIng } = checkFavIng(data);
  const markupModalIng = `
  <div class="ing-wrapper" id="${data.idIngredient}">
  <svg class="close-modal2" width="32" height="32">
  <use href="${icons}#icon-close-modal"></use>
</svg>
  <div class="component-name-wraper">
    <h2 class="component-name">${data.strIngredient}</h2>
   
    <h3 class="component-type">${data.strType}</h3>
  </div>
  <div class="line"></div>
  <div class="componet-descriptio-wraper">
   
     ${
       data.strDescription
         ? `<div class="description-wraper"> <p class="component-description">
      ${data.strDescription}</p></div>`
         : ''
     }
    
    <ul class="component-list">
      <li class="component-list-item"><span class="marker">✶</span> Type:${
        data.strType
      }</li>
      ${
        data.strABV
          ? `<li class="component-list-item"><span class="marker">✶</span>  Alcohol by volume:${data.strABV}%</li>
      <li class="component-list-item"><span class="marker">✶</span> This ingredient is alcoholic:${data.strAlcohol}</li>`
          : ''
      }
      
    </ul>
    <button type="button" class="button-components-add ${classIng}">${textContentIng}</button>
  </div>
  </div>`;
  // console.log(markupModalIng);
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
