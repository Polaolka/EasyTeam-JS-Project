import ApiService from '../api/apiService';
import Render from '../render/render';
import { handleOpenCloseModalInFav } from '../modals/open-close-modal';
import { removeFromFavHandler } from '../common/add-to-favorites';
import { getDataFromLockalStorageByKey } from '../utils/getDataFromLockalStorageByKey';

const LS_KEY_FAV_COCKT = 'Fav-Cocktails';

const galleryEl = document.querySelector('.gallery__wrapper');
const apiService = new ApiService();

export default class FavGallery {
  async renderFav() {
    const render = new Render();

    const favCocktails = getDataFromLockalStorageByKey(LS_KEY_FAV_COCKT);
    if (!favCocktails || favCocktails.length === 0) {
      render.renderNotFound();
    }

    if (favCocktails.length > 0) {
      const data = await this.getFavCocktData();
      render.renderGallery(data);
      galleryEl.addEventListener('click', removeFromFavHandler);
      galleryEl.addEventListener('click', handleOpenCloseModalInFav)
    }
  }
  makePromises() {
    const favCocktails = getDataFromLockalStorageByKey(LS_KEY_FAV_COCKT);
    const promises = favCocktails.reduce((acc, id) => {
      acc.push(apiService.fetchDataById(id));
      return acc;
    }, []);
    return promises;
  }

  // Чекаємо виконання всіх промісів з fav ing
  async waitAllPromises() {
    const promisesCocktails = await this.makePromises();
    const pr = Promise.all(promisesCocktails).catch(error => console.log(error));
    return pr;
  }

  async getFavCocktData() {
    const data = await this.waitAllPromises();
    const flatData = data.flatMap(i => i);
    return flatData;
  }
}