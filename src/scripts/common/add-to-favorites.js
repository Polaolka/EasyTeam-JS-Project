import icons from '../../images/icons.svg';
const galleryEl = document.querySelector('.gallery');
// body.addEventListener('click', handleClickAddToFavIngr);
const LS_KEY_FAV_COCKT = 'Fav-Cocktails';
// galleryEl.addEventListener('.addToFavHandlerN');

import FavGallery from '../favorites/build-fav-gallery';

export function addToFavHandler() {
  const id = this.attributes['data-id'].value;
  const favIds = JSON.parse(localStorage.getItem('favIds') ?? '{}');
  if (favIds[id]) {
    delete favIds[id];
    this.classList.remove('is-favorite');
  } else {
    favIds[id] = true;
    this.classList.add('is-favorite');
  }

  localStorage.setItem('favIds', JSON.stringify(favIds));
}

export function addToFavHandlerN(e) {
  if (
    !e.target.classList.contains('js-cockt-add') &&
    !e.target.classList.contains('js-cockt-remove')
  ) {
    return;
  }

  if (e.target.classList.contains('js-cockt-add')) {
    addToFavCocktails(e);
    return;
  }

  if (e.target.classList.contains('js-cockt-remove')) {
    removeIdFromFavList(e);
    e.target.classList.add('js-cockt-add');
    e.target.classList.remove('js-cockt-remove');
    e.target.innerHTML = `Add to<svg class="buttons__icon"><use href="${icons}#heart"></use></svg>`;
    return;
  }
}
function addToFavCocktails(e) {
  const favCocktails = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));
  let favCocktailID = e.target.closest('.js-card').id;
  favCocktails.push(favCocktailID);
  localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify(favCocktails));
  e.target.classList.add('js-cockt-remove');
  e.target.classList.remove('js-cockt-add');
  e.target.innerHTML = `Remove<svg class="buttons__icon"><use href="${icons}#icon-heart_fill"></use></svg>`;
}

export function removeFromFavHandler(e) {
  if (!e.target.classList.contains('js-cockt-remove')) {
    return;
  }
  removeIdFromFavList(e);
  const favGallery = new FavGallery();
  favGallery.renderFav();
  return;
}
 function removeIdFromFavList(e) {  
  const favCocktails = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));
  let favCocktailID = e.target.closest('.js-card').id;
  const filtred = favCocktails.filter(i => i !== favCocktailID);
  localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify(filtred));
 }