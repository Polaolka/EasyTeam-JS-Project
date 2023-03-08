const body = document.querySelector('body');
// body.addEventListener('click', handleClickAddToFavIngr);
const LS_KEY_FAV_ING = 'Fav-Ingredients';

export function handleClickAddToFavIngr(e) {
  if (!e.target.classList.contains('js-ing-add') 
  && !e.target.classList.contains('js-ing-remove') 
  && e.target.classList.contains('close-modal2')) {
    return;
  }

  if (e.target.classList.contains('js-ing-add')) {
    const favIngs = JSON.parse(localStorage.getItem(LS_KEY_FAV_ING));

    if(!favIngs) {
      localStorage.setItem(LS_KEY_FAV_ING, JSON.stringify([]));
      addToFavorites(e);
      return
    }
    addToFavorites(e);
    return
  }

  if (e.target.classList.contains('js-ing-remove')) {
    const favIngs = JSON.parse(localStorage.getItem(LS_KEY_FAV_ING));

    let favIngrID = e.target.closest('.ing-wrapper').id;

    const idx = favIngs.findIndex(ing => ing === favIngrID);

    favIngs.splice(idx, 1);

    localStorage.setItem(LS_KEY_FAV_ING, JSON.stringify(favIngs));
    e.target.classList.add('js-ing-add');
    e.target.classList.remove('js-ing-remove');
    e.target.textContent = 'Add to favorite';
    return;
  }
  if (e.target.classList.contains('close-modal2')) {
    body.removeEventListener('click', handleClickAddToFavIngr);
    return
  }
}
function addToFavorites(e) {
  const favIngs = JSON.parse(localStorage.getItem(LS_KEY_FAV_ING));
  let favIngrID = e.target.closest('.ing-wrapper').id;
  favIngs.push(favIngrID);
  localStorage.setItem(LS_KEY_FAV_ING, JSON.stringify(favIngs));
  e.target.classList.add('js-ing-remove');
  e.target.classList.remove('js-ing-add');
  e.target.textContent = 'Remove from favorite';
}

export function checkFavIng(data) {
  let classIng = '';
  let textContentIng = '';
  let favIngs = JSON.parse(localStorage.getItem(LS_KEY_FAV_ING));
  if(!favIngs) {
    localStorage.setItem(LS_KEY_FAV_ING, JSON.stringify([]));
    favIngs = JSON.parse(localStorage.getItem(LS_KEY_FAV_ING));
  }
  if (favIngs.includes(data.idIngredient)) {
    classIng = "js-ing-remove";
    textContentIng = "Remove from favorite";
  } else {
    classIng = "js-ing-add";
    textContentIng = "Add to favorite";
  }
  return {
    classIng,
    textContentIng,
  }
}
