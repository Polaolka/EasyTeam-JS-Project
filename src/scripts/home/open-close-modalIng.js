import ApiService from '../api/apiService';
import { renderModalIngr } from '../render/render-modal-ingr';
import { handleClickAddToFavIngr } from '../favorites/favorite-ing';
import { renderModalWithoutIng } from '../render/render-modal-ingr';
import { getFavIngData } from '../render/render-fav-ing'

const backdrop = document.querySelector('.backdrop');
const modalCoctailsEl = document.querySelector('.modal-coctails');
const body = document.querySelector('body');

const modalIng = document.querySelector('.components');
const apiIng = new ApiService();

export async function handleOpenModalIngridients(e) {
  e.preventDefault();
  modalCoctailsEl.classList.add('is-hidden');

  const query = e.target.closest('li').dataset.name;

  const data = await apiIng.fetchDataByIngr(query);
  if (data[0].strDescription && data[0].strAlcohol) {
    modalIng.classList.remove('component-not-wrapper');
    renderModalIngr(data[0]);
  } else {
    modalIng.classList.add('component-not-wrapper');
    renderModalWithoutIng(data[0]);
  }

  modalIng.classList.remove('is-hidden');

  const closeModalIn = document.querySelector('.close-modal2');
  closeModalIn.addEventListener('click', () => {
    modalIng.classList.add('is-hidden');
    modalCoctailsEl.classList.remove('is-hidden');
  });

  body.addEventListener('click', handleClickAddToFavIngr);
}

export async function handleOpenModalIngridientsFav(e) {
  // e.preventDefault();

  backdrop.classList.remove('is-hidden');
  modalIng.classList.remove('is-hidden');

  const query = e.target.closest('.favorite').id;

  const data = await apiIng.fetchDataByIdIngr(query);
  renderModalIngr(data[0]);

  const closeModalInFav = document.querySelector('.close-modal2-fav');
  closeModalInFav.addEventListener('click', () => {
    modalIng.classList.add('is-hidden');
    backdrop.classList.add('is-hidden');
    getFavIngData();
    // return
  });

  body.addEventListener('click', handleClickAddToFavIngr);
}
