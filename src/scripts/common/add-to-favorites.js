const galleryEl = document.querySelector('.gallery');
// body.addEventListener('click', handleClickAddToFavIngr);
const LS_KEY_FAV_COCKT = 'Fav-Cocktails';
// galleryEl.addEventListener('.addToFavHandlerN');

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

// export function addToFavHandlerN(e) {
//     if (!e.target.classList.contains('js-cockt-add') 
//     && !e.target.classList.contains('js-cockt-remove') 
//     && e.target.classList.contains('close-modal')) {
//       return;
//     }
  
//     if (e.target.classList.contains('js-cockt-add')) {
//       const favCocktails = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));
  
//       if(!favCocktails) {
//         localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify([]));
//         addToFavCoctails(e);
//         return
//       }
//       addToFavCoctails(e);
//       return
//     }
  
//     if (e.target.classList.contains('js-cockt-remove')) {
//       const favCocktails = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));
  
//       let favCocktailID = e.target.closest('.js-card').id;
  
//       const idx = favCocktails.findIndex(ing => ing === favCocktailID);
  
//       favCocktails.splice(idx, 1); //  переписати на сорт!!!!
  
//       localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify(favCocktails));
//       e.target.classList.add('js-cockt-add');
//       e.target.classList.remove('js-cockt-remove');
//       e.target.textContent = 'Add to';
//       return;
//     }
//     // if (e.target.classList.contains('close-modal')) {
//     //   body.removeEventListener('click', handleClickAddToFavIngr);
//     //   return
//     // }
//   }
//   function addToFavCocktails(e) {
//     const favCocktails = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));
//     let favCocktailID = e.target.closest('.js-card').id;
//     favCocktails.push(favCocktailID);
//     localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify(favCocktails));
//     e.target.classList.add('js-cockt-remove');
//     e.target.classList.remove('js-cockt-add');
//     e.target.textContent = 'Remove';
//   }
