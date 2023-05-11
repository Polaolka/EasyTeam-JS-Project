import Gallery from "../gallery/gallery";
import { addToFavHandlerN } from '../common/add-to-favorites';
import { handleOpenCloseModal } from '../modals/open-close-modal';
const LS_SEARCH = 'SearchFromFavorites';
const gallery = new Gallery();
const cocktailNameFromFavorites = JSON.parse(localStorage.getItem(LS_SEARCH));
const galleryEl = document.querySelector('.gallery__wrapper');
const nextButton = document.querySelector('.pagination__btn-next');
const prevButton = document.querySelector('.pagination__btn-prev');
const paginationlist = document.querySelector('.pagination__items-wrapper'); //поправить
const paginationEL = document.querySelector('.pagination');

handleHomeLoad();
async function handleHomeLoad() {
  if (cocktailNameFromFavorites) {
    gallery.clearGallery();
    gallery.numberOfItemsPerPage();
    const data = await gallery.getDataByName(cocktailNameFromFavorites);
    gallery.setCurrentPage(1, data);

    // Очищення LS
    localStorage.removeItem(LS_SEARCH);
    // Вішаємо слухачі
    galleryEl.addEventListener('click', handleOpenCloseModal);
    // galleryEl.addEventListener('click', handleOpenCloseModal);

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

    //     addToBtn.innerHTML = `Remove<svg class="buttons__icon"><use href="${icons}#icon-heart_fill"></use></svg>`;
    //     // favGallery.addToFavorite(addToBtn);
    //   }
    //   if (removeBtn) {
    //     console.log('removeBtn: ', removeBtn);
    //     removeBtn.classList.remove('fav-buttons__btn--remove')
    //     removeBtn.classList.add('buttons__btn--add-to');

    //     removeBtn.innerHTML = `Add to<svg class="buttons__icon"><use href="${icons}#heart"></use></>`;
    //     favGallery.removeFromFavoriteFromGallery(removeBtn);
    //   }
    // });
  } else {
    gallery.getRandomData();
    galleryEl.addEventListener('click', addToFavHandlerN);
    galleryEl.addEventListener('click', handleOpenCloseModal)
  }
}