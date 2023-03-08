// import { handleOpenCloseModal } from '../modals/open-close-modal';
// import Gallery from '../gallery/gallery';

// const gallery = new Gallery();
// const LS_SEARCH = 'SearchFromFavorites';
// const galleryEl = document.querySelector('.gallery__wrapper');
// const inputEl = document.querySelector('.input');


// // Звернення до LS
// const cocktailNameFromFavorites = JSON.parse(localStorage.getItem(LS_SEARCH));

// // Виклик функції
// handleHomeLoad();

// // обробка LS:
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
//     addListener();

//   } else {
//     gallery.getRandomData();
//     addListener();
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
