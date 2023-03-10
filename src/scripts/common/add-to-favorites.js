const galleryEl = document.querySelector('.gallery');
// body.addEventListener('click', handleClickAddToFavIngr);
const LS_KEY_FAV_COCKT = 'Fav-Cocktails';

export function addToFavHandler() {
    const id = this.attributes['data-id'].value
    const favIds = JSON.parse(localStorage.getItem('favIds') ?? '{}')
    if (favIds[id]) {
        delete favIds[id];
        this.classList.remove('is-favorite')
    } else {
        favIds[id] = true;
        this.classList.add('is-favorite')
    }

    localStorage.setItem('favIds', JSON.stringify(favIds));

}

export function addToFavHandlerN(e) {
    if (!e.target.classList.contains('js-cockt-add') 
    && !e.target.classList.contains('js-cockt-remove') 
    && e.target.classList.contains('close-modal')) {
      return;
    }
  
    if (e.target.classList.contains('js-cockt-add')) {
      const favCocktails = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));
  
      if(!favCocktails) {
        localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify([]));
        addToFavCoctails(e);
        return
      }
      addToFavCoctails(e);
      return
    }
  
    if (e.target.classList.contains('js-cockt-remove')) {
      const favCocktails = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));
  
      let favIngrID = e.target.closest('.ing-wrapper').id;
  
      const idx = favCocktails.findIndex(ing => ing === favIngrID);
  
      favCocktails.splice(idx, 1);
  
      localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify(favCocktails));
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
