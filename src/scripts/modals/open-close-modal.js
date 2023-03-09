import ApiService from '../api/apiService';
import { renderModalCoctails } from '../render/render-modal-coctail';
import { handleOpenModalIngridients } from '../home/open-close-modalIng';
import FavGallery from '../favorites/build-fav-gallery';

const backdrop = document.querySelector('.backdrop');
const modalCoctailsEl = document.querySelector('.modal-coctails');

const apiId = new ApiService();
// const favGalleryEx = new FavGallery();
const favGallery = new FavGallery();

export async function handleOpenCloseModal(e) {
  const idCard = e.target.closest('.card').id;
  const data = await apiId.fetchDataById(idCard);
  console.log(data);

  renderModalCoctails(data[0]);

  backdrop.classList.remove('is-hidden');
  modalCoctailsEl.classList.remove('is-hidden');

  modalCoctailsEl.addEventListener('click', e => {
    const itemEl = e.target;
    const ingrLinkEl = itemEl.classList.contains('ingridients-link');
    const btnAdd = itemEl.classList.contains('button-add');
    const btnRemove = itemEl.classList.contains('fav-buttons__btn--remove');
    if (ingrLinkEl) {
      handleOpenModalIngridients(e);
    }
    if (btnAdd) {
      addToBtn.classList.remove('buttons__btn--add-to');
      addToBtn.classList.add('fav-buttons__btn--remove');

      addToBtn.innerHTML = `Remove`;

      favGallery.addToFavorite(btnAdd);
    }
    if (btnRemove) {
      removeBtn.classList.remove('fav-buttons__btn--remove');
      removeBtn.classList.add('buttons__btn--add-to');

      removeBtn.innerHTML = `Add to<svg class="buttons__icon"><use href="${icons}#heart"></use></>`;

      favGallery.removeFromFavorite(btnRemove);
    }
    return;
  });

  const closeModal = document.querySelector('.close-modal');
  closeModal.addEventListener('click', () => {
    backdrop.classList.add('is-hidden');
    modalCoctailsEl.classList.add('is-hidden');
  });
}
export async function handleOpenCloseModalFavorite(id) {
  const data = await apiId.fetchDataById(id);
  console.log(data);

  renderModalCoctails(data[0]);

  backdrop.classList.remove('is-hidden');
  modalCoctailsEl.classList.remove('is-hidden');

  modalCoctailsEl
    .querySelector('.ingridients-list')
    .addEventListener('click', e => {
      const itemEl = e.target;
      if (itemEl.classList.contains('ingridients-link')) {
        handleOpenModalIngridients(e);
      }
      return;
    });

  const closeModal = document.querySelector('.close-modal');
  closeModal.addEventListener('click', () => {
    backdrop.classList.add('is-hidden');
    modalCoctailsEl.classList.add('is-hidden');
  });
}
