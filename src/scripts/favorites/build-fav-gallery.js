import ApiService from '../api/apiService';
import Render from '../render/render';
import { handleOpenCloseModalFavorite } from '../modals/open-close-modal';
import icons from '../../images/icons.svg';
import Gallery from "../gallery/gallery";
import { addToFavHandlerN } from '../common/add-to-favorites';
const LS_KEY_FAV_COCKT = 'Fav-Cocktails';
const favCocktails = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));

// const gallery = new Gallery();
const render = new Render();
const apiService = new ApiService();

const favWrapper = document.querySelector('.fav-cocktails__box');
const favTitle = document.querySelector('.fav-cocktails__title');
export default class FavGallery {
  constructor() {
    // this.gallery = new Gallery();
  }
  // gallery = new Gallery();
  async render() {
    const favCocktails = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));
    if (!favCocktails)
      localStorage.setItem(LS_KEY_FAV_COCKT, JSON.stringify([]));

    if (favCocktails.length === 0) {
      const notFoundBlock = render.createNotFoundMarkup();
      favTitle.style.display = 'none';
      favWrapper.insertAdjacentHTML('beforeend', notFoundBlock);
      return;
    }
  }
  makePromises() {
    const favCocktails = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));
    const promises = favCocktails.reduce((acc, id) => {
      acc.push(apiService.fetchDataById(id));
      return acc;
    }, []);
    return promises;
  }

  // Чекаємо виконання всіх промісів з fav ing
  async waitAllPromises(promisesCocktails) {
    const pr = Promise.all(promisesCocktails).catch(error =>
      console.log(error)
    );
    return pr;
  }

  async getFavCocktData() {
    const promises = this.makePromises();
    const data = await this.waitAllPromises(promises);
    const flatData = data.flatMap(i => i);
    return flatData;
    // renderFavIng(flatData);
  }

  // async renderFavCockt() {
  //   this.gallery.clearGallery();
  //   const data = await this.getFavCocktData();
  //   this.gallery.numberOfItemsPerPage();
  //   this.gallery.setCurrentPage(1, data);


  // }

  // favTitle.style.display = 'block';
  //     this.addListeners();
}

// export default class FavGallery {
//   constructor() {}
//   async render() {
//     const favIds = JSON.parse(localStorage.getItem('favIds') ?? '[]');

//     if (favIds.length === 0) {
//       const notFoundBlock = render.createNotFoundMarkup();
//       favTitle.style.display = 'none';
//       favWrapper.insertAdjacentHTML('beforeend', notFoundBlock);
//       return;
//     }

//     for (let i = 0; i < favIds.length; i += 1) {
//       const drink = await apiService.fetchDataById(favIds[i]);

//       const code = this.renderFavGallery(drink[0]);
//       favWrapper.insertAdjacentHTML('beforeend', code);
//     }
//     favTitle.style.display = 'block';
//     this.addListeners();
//   }

//   async renderByLetter(letter) {
//     const favIds = JSON.parse(localStorage.getItem('favIds') ?? '{}');

//     for (let id in favIds) {
//       const drink = await apiService.fetchDataById(id);

//       if (!drink[0].strDrink.toLowerCase().startsWith(letter.toLowerCase()))
//         continue;

//       const code = this.renderFavGallery(drink[0]);

//       favWrapper.insertAdjacentHTML('beforeend', code);
//     }

//     this.addListeners();
//   }

//   removeCocktails() {
//     favWrapper.innerHTML = '';
//   }

//   addListeners() {
//     favWrapper.addEventListener('click', e => {
//       const elem = e.target;
//       const removeBtn = elem.closest('.fav-buttons__btn--remove');
//       const learnMoreBtn = elem.closest('.fav-buttons__btn--learn-more');

//       if (removeBtn) {
//         this.removeFromFavorite(removeBtn);
//       }
//       if (learnMoreBtn) {
//         const elem = e.target;
//         const id = elem.closest('.fav-card').id;
//         handleOpenCloseModalFavorite(id);
//       }
//     });
//   }

//   addToFavorite(addToBtn) {
//     const id = addToBtn.dataset.id;

//     let favIds = JSON.parse(localStorage.getItem('favIds'));

//     if (!favIds) {
//       localStorage.setItem('favIds', JSON.stringify([]));
//       favIds = JSON.parse(localStorage.getItem('favIds'));
//       favIds.push(id);
//       localStorage.setItem('favIds', JSON.stringify(favIds));
//       return;
//     } else {
//       favIds = JSON.parse(localStorage.getItem('favIds'));
//       favIds.push(id);
//       localStorage.setItem('favIds', JSON.stringify(favIds));
//       return;
//     }
//   }

//   removeFromFavorite(btnEl) {
//     const id = btnEl.dataset.id;

//     const favIds = JSON.parse(localStorage.getItem('favIds') ?? '[]');

//     const filtred = favIds.filter(i => i !== id);
//     btnEl.closest('.fav-card').remove();
//     if (filtred.length === 0) {
//       localStorage.removeItem('favIds');
//       this.render();
//       return;
//     }
//     localStorage.setItem('favIds', JSON.stringify(filtred));
//   }
//   removeFromFavoriteFromGallery(btnEl) {
//     const id = btnEl.dataset.id;

//     const favIds = JSON.parse(localStorage.getItem('favIds') ?? '[]');

//     const filtred = favIds.filter(i => i !== id);
//     if (filtred.length === 0) {
//       localStorage.removeItem('favIds');
//       return;
//     }
//     localStorage.setItem('favIds', JSON.stringify(filtred));
//   }

//   renderFavGallery({ strDrinkThumb, strDrink, idDrink }) {
//     return `<div class="fav-card" id="${idDrink}">
//         <img src="${strDrinkThumb}" alt="${strDrink}" class="fav-card__img" />
//         <h3 class="fav-card__title">${strDrink}</h3>
//         <div class="fav-buttons">
//           <button type="button" class="fav-buttons__btn fav-buttons__btn--learn-more">Learn more</button>
//           <button type="button" class="fav-buttons__btn fav-buttons__btn--remove" data-id="${idDrink}">Remove
//             <svg class="fav-buttons__icon">
//               <use href="${icons}#icon-heart_fill"></use>
//             </svg>
//           </button>
//         </div>
//       </div>`;
//   }
// }
