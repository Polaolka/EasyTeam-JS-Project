import ApiService from '../api/apiService';
import { renderModalCoctails } from '../render/render-modal-coctail';
import { handleOpenModalIngridients } from '../home/open-close-modalIng';

const backdrop = document.querySelector('.backdrop');
const modalCoctailsEl = document.querySelector('.modal-coctails');

const apiId = new ApiService();

export async function handleOpenCloseModal(e) {
  const idCard = e.target.closest('.card').id;
  const data = await apiId.fetchDataById(idCard);
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
