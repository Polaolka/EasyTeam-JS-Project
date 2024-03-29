import ApiService from '../api/apiService';
import icons from '../../images/icons.svg';
import Render from './render';

import { handleOpenModalIngridientsFav } from '../home/open-close-modalIng';
const LS_KEY_FAV_ING = 'Fav-Ingredients';
const notFaundCoctail = `<div class="not-found">
<h2 class="not-found__title">Sorry, we didn't find any cocktail for you</h2>
<svg class="not-found__icon">
  <use href="${icons}#icon-sorry"></use>
</svg>
</div>`;

const favIngsTitle = document.querySelector('.fav-cocktails__title');
const favIngWrapper = document.querySelector('.fav-ing-wrapper');
const apiService = new ApiService();



function makePromises() {
  let favIngs = JSON.parse(localStorage.getItem(LS_KEY_FAV_ING));
  if (!favIngs) {
    favIngs = [];
  }
  const promises = favIngs.reduce((acc, id) => {
    acc.push(apiService.fetchDataByIdIngr(id));
    return acc;
  }, []);
  return promises;
}

// Чекаємо виконання всіх промісів з fav ing
async function waitAllPromises(promisesIng) {
  const pr = Promise.all(promisesIng).catch(error => console.log(error));
  return pr;
}


function renderFavIng(data) {
  if (data.length === 0) {
    favIngsTitle.style.display = 'none';
    favIngWrapper.innerHTML = notFaundCoctail;
    return
  }
  const galleryItems = data
    .map(elem => {
      return `
            <li class="favorite" id="${elem.idIngredient}">
                <h3 class="favorite__title">${elem.strIngredient}</h3>
                <p class="favorite__text">${elem.strType}</p>
                <div class="button">
                    <button type="button" class="button__btn button__btn--learn-more js-learn-more-ing">Learn more</button>
                    <button type="button" class="button__btn button__btn--add-to js-remove-ing-card">Remove
                        <svg class="button__icon">
                            <use class="icon-heart" href="${icons}#icon-heart_fill"></use>
                        </svg>
                 </button>
                </div>
            </li>
            `;
    })
    .join('');
  // favIngWrapper.insertAdjacentHTML('beforeend', galleryItems);
  favIngWrapper.innerHTML = galleryItems;

  favIngWrapper.addEventListener('click', e => {
    const elem = e.target;

    if (elem.classList.contains('js-learn-more-ing')) {
      handleOpenModalIngridientsFav(e);
    }
    if (elem.classList.contains('js-remove-ing-card')) {
      removeFromFavIngs(e);
    }
  });
}
// function renderNotFoundBlock() {
//   console.log('favIngsTitle: ', favIngsTitle);
//   const render = new Render();
//   render.renderNotFound()
//   // favIngsTitle.classList.add('is-hidden');
// }
// Отримуємо данні з fav ing
export async function getFavIngData() {
  const promises = makePromises();
  const data = await waitAllPromises(promises);
  const flatData = data.flatMap(i => i);
  renderFavIng(flatData);
}

function removeFromFavIngs(e) {
  const favIngs = JSON.parse(localStorage.getItem(LS_KEY_FAV_ING));
  let favIngrID = e.target.closest('.favorite').id;
  const newFawarite = favIngs.filter((el) => el !== favIngrID);
  localStorage.setItem(LS_KEY_FAV_ING, JSON.stringify(newFawarite));
  getFavIngData();
  return;
}