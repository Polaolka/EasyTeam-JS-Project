// import { handleOpenCloseModal } from '../modals/open-close-modal';
// import Gallery from '../gallery/gallery';

// const gallery = new Gallery();
// const galleryEl = document.querySelector('.gallery__wrapper');

// const LS_SEARCH = 'SearchFromFavorites';

// const inputEl = document.querySelector('.input');


// // Звернення до LS
// const cocktailNameFromFavorites = JSON.parse(localStorage.getItem(LS_SEARCH));

// // Виклик функції
// handleHomeLoad();

// обробка LS:
// async function handleHomeLoad() {
//   if (cocktailNameFromFavorites) {
//     gallery.clearGallery();
//     inputEl.placeholder = cocktailNameFromFavorites;
//     gallery.numberOfItemsPerPage();
//     const data = await gallery.getDataByName(cocktailNameFromFavorites);
//     gallery.setCurrentPage(1, data);

//     // Очищення LS
//     localStorage.removeItem(LS_SEARCH);

//     // +++ в пласехолдер?

//     // Вішаємо слухачі
//     // addListener();
// // ++++++++++++
// galleryEl.addEventListener('click', e => {
//     const elem = e.target;
  
//     const addToBtn = elem.closest('.buttons__btn--add-to');
//     const removeBtn = elem.closest('.fav-buttons__btn--remove')
//     if (elem.classList.contains('buttons__btn--learn-more')) {
//       handleOpenCloseModal(e);
//     }
//     if (addToBtn) {
//       addToBtn.classList.remove('buttons__btn--add-to');
//       addToBtn.classList.add('fav-buttons__btn--remove');
  
//       addToBtn.innerHTML = `Remove<svg class="buttons__icon"><use href="${icons}#heart"></use></svg>`;
//       favGallery.addToFavorite(addToBtn);
//     }
//     if (removeBtn) {
//       console.log('removeBtn: ', removeBtn);
//       removeBtn.classList.remove('fav-buttons__btn--remove')
//       removeBtn.classList.add('buttons__btn--add-to');
  
//       removeBtn.innerHTML = `Add to<svg class="buttons__icon"><use href="${icons}#heart"></use></>`;
//       favGallery.removeFromFavoriteFromGallery(removeBtn);
//     }
//   });
//   } else {
//     gallery.getRandomData();
//     // addListener();
// // +++++++++++++++++     //
// galleryEl.addEventListener('click', e => {
//     const elem = e.target;
  
//     const addToBtn = elem.closest('.buttons__btn--add-to');
//     const removeBtn = elem.closest('.fav-buttons__btn--remove')
//     if (elem.classList.contains('buttons__btn--learn-more')) {
//       handleOpenCloseModal(e);
//     }
//     if (addToBtn) {
//       addToBtn.classList.remove('buttons__btn--add-to');
//       addToBtn.classList.add('fav-buttons__btn--remove');
  
//       addToBtn.innerHTML = `Remove<svg class="buttons__icon"><use href="${icons}#heart"></use></svg>`;
//       favGallery.addToFavorite(addToBtn);
//     }
//     if (removeBtn) {
//       console.log('removeBtn: ', removeBtn);
//       removeBtn.classList.remove('fav-buttons__btn--remove')
//       removeBtn.classList.add('buttons__btn--add-to');
  
//       removeBtn.innerHTML = `Add to<svg class="buttons__icon"><use href="${icons}#heart"></use></>`;
//       favGallery.removeFromFavoriteFromGallery(removeBtn);
//     }
//   });
// // +++++++++++++++++    // 
//   }
// }

// function addListener() {
//     galleryEl.addEventListener('click', e => {
//         const elem = e.target;
  
//         if (elem.classList.contains('buttons__btn--learn-more')) {
//           handleOpenCloseModal(e);
//         }
//         if (elem.classList.contains('buttons__btn--add-to')) {
//           console.log('click on "Add to fav"');
//           // addToFavHandler(e);
//         }
//       });
// }



// const gallery = new Gallery();

// gallery.getRandomData();

// galleryEl.addEventListener('click', e => {
//   const elem = e.target;

//   const addToBtn = elem.closest('.buttons__btn--add-to');
//   const removeBtn = elem.closest('.fav-buttons__btn--remove')
//   if (elem.classList.contains('buttons__btn--learn-more')) {
//     handleOpenCloseModal(e);
//   }
//   if (addToBtn) {
//     addToBtn.classList.remove('buttons__btn--add-to');
//     addToBtn.classList.add('fav-buttons__btn--remove');

//     addToBtn.innerHTML = `Remove<svg class="buttons__icon"><use href="${icons}#heart"></use></svg>`;
//     favGallery.addToFavorite(addToBtn);
//   }
//   if (removeBtn) {
//     console.log('removeBtn: ', removeBtn);
//     removeBtn.classList.remove('fav-buttons__btn--remove')
//     removeBtn.classList.add('buttons__btn--add-to');

//     removeBtn.innerHTML = `Add to<svg class="buttons__icon"><use href="${icons}#heart"></use></>`;
//     favGallery.removeFromFavoriteFromGallery(removeBtn);
//   }
// });