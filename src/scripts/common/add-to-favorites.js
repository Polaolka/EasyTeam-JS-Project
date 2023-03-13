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

export function addToFavHandlerN(e) {
    if (!e.target.classList.contains('js-cockt-add') 
    && !e.target.classList.contains('js-cockt-remove')) {
      return;
    }
    const favCocktails = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));
    if (e.target.classList.contains('js-cockt-add')) {
      addToFavCocktails(e);
      return
    }
  
    if (e.target.classList.contains('js-cockt-remove')) {
  
      let favCocktailID = e.target.closest('.js-card').id;
  
      const idx = favCocktails.findIndex(ing => ing === favCocktailID);
  
      favCocktails.splice(idx, 1); //  переписати на сорт!!!!
  
      localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify(favCocktails));
      e.target.classList.add('js-cockt-add');
      e.target.classList.remove('js-cockt-remove');
      e.target.textContent = 'Add to';
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
    e.target.textContent = 'Remove';
  }

  


//   e => {
//     const elem = e.target;
  
//     const addToBtn = elem.closest('.buttons__btn--add-to');
//     const removeBtn = elem.closest('.fav-buttons__btn--remove')
//     if (elem.classList.contains('buttons__btn--learn-more')) {
//       handleOpenCloseModal(e);
//     }
//     if (addToBtn) {
//       addToBtn.classList.remove('buttons__btn--add-to');
//       addToBtn.classList.add('fav-buttons__btn--remove');
  
//       addToBtn.innerHTML = `Remove<svg class="buttons__icon"><use href="${icons}#icon-heart_fill"></use></svg>`;
//       favGallery.addToFavorite(addToBtn);
//     }
//     if (removeBtn) {
//       console.log('removeBtn: ', removeBtn);
//       removeBtn.classList.remove('fav-buttons__btn--remove')
//       removeBtn.classList.add('buttons__btn--add-to');
  
//       removeBtn.innerHTML = `Add to<svg class="buttons__icon"><use href="${icons}#heart"></use></>`;
//       favGallery.removeFromFavoriteFromGallery(removeBtn);
//     }
//   }