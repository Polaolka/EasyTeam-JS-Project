import ApiService from '../api/apiService';
import Render from '../render/render';
import { handleOpenCloseModal } from '../modals/open-close-modal';
import FavGallery from '../favorites/build-fav-gallery';

const galleryEl = document.querySelector('.gallery__wrapper');
const nextButton = document.querySelector('.pagination__btn-next');
const prevButton = document.querySelector('.pagination__btn-prev');
const paginationlist = document.querySelector('.pagination__items-wrapper'); //поправить
const paginationEL = document.querySelector('.pagination');

const apiService = new ApiService();
const render = new Render();
const favGallery = new FavGallery()

export default class Gallery {
  constructor() {
    this.currentData = [];
    this.promises = [];
    this.screenWidth = window.innerWidth;
    this.paginationLimit;
    this.currentPage = 1;
    this.pageCount;
  }

  // Отримуемо кількість елементів на сорінці в галереї в залежності від ширини екрана
  numberOfItemsPerPage() {
    if (this.screenWidth < 768) {
      return (this.paginationLimit = 3);
    } else if (this.screenWidth >= 768 && this.screenWidth < 1280) {
      return (this.paginationLimit = 6);
    } else if (this.screenWidth > 1280) {
      return (this.paginationLimit = 9);
    }
  }

  // Генеруємо проміси рандомних коктейлів в залежності від кількості на стр.
  randomCoctails() {
    for (let i = 0; i < this.paginationLimit; i += 1) {
      this.promises.push(apiService.fetchRandomData());
    }
    return this.promises;
  }

  // Чекаємо виконання всіх промісів з рандомними коктейлями
  allPromises(promises) {
    return (this.promises = Promise.all(promises).catch(error =>
      console.log(error)
    ));
  }

  //Очищуємо вміст галереї
  clearGallery() {
    galleryEl.innerHTML = '';
  }

  // Отримуємо рандомні данні з рандомними коктейлями
  async getRandomData() {
    this.numberOfItemsPerPage();
    this.randomCoctails();
    const data = await this.allPromises(this.promises);
    const flatData = data.flatMap(i => i);
    render.renderGallery(flatData);
    // galleryEl
    //   .querySelectorAll('.buttons__btn--add-to')
    //   .forEach(e =>
    //     e.addEventListener('click', favGallery.addToFavorite));//потрібно виправити
  }

  // Будуємо розмітку в залежності від кількості елементів на стр.
  async getDataByName(data) {
    const dataByName = await apiService.fetchDataByName(data);
    return dataByName;
  }

  async getDataByLetter(data) {
    const dataByLetter = await apiService.fetchDataByLetter(data);
    return dataByLetter;
  }

  // Робимо активними\неактивними стрылочки в пагынацыъ в залежносты выд поточноъ сторынки
  setPaginationArrowsStatus() {
    this.currentPage === 1
      ? prevButton.setAttribute('disabled', true)
      : prevButton.removeAttribute('disabled');

    this.pageCount === this.currentPage
      ? nextButton.setAttribute('disabled', true)
      : nextButton.removeAttribute('disabled');
  }

  //Додаємо слухача подій на пагінацію
  addPaginationHandler() {
    paginationEL.addEventListener('click', e => {
      const elem = e.target;

      const prevBtn = elem.closest('.pagination__btn-prev');
      const nextBtn = elem.closest('.pagination__btn-next');
      const numBtn = elem.closest('.num-btn');

      if (Number(numBtn?.textContent) === this.currentPage) {
        return;
      } else {
        numBtn?.textContent && this.setCurrentPage(Number(numBtn.textContent));
      }

      if (prevBtn) {
        if (this.currentPage === 1) {
          return;
        }
        this.setCurrentPage((this.currentPage -= 1));
      }

      if (nextBtn) {
        if (this.pageCount === this.currentPage) {
          return;
        }
        this.setCurrentPage((this.currentPage += 1));
      }
    });
  }

  //Рендер кнопок пагынацыъ в залежносты выд кылькосты сторынок
  renderPaginationList() {
    paginationlist.innerHTML = '';
    let list = '';
    for (let i = 1; i < this.pageCount + 1; i += 1) {
      const isActive = i === this.currentPage;
      const className = isActive
        ? 'pagination__btn num-btn pagination__btn--active'
        : 'pagination__btn num-btn';

      const item = `<li class="pagination__item">
                    <button type="button" class="${className}">${i}</button>
                  </li>`;
      list += item;
    }
    paginationlist.insertAdjacentHTML('beforeend', list);
  }

  //Встановлюэмо поточну сторынку ы запускаэмо роботу пагынацыъ
  async setCurrentPage(pageNum, data) {
    if (data) {
      this.currentData = data;
      this.addPaginationHandler();
    }
    if (this.currentData.length <= this.paginationLimit) {
      this.clearGallery();
      render.renderGallery(data);
      paginationEL.classList.add('is-hidden');
      return
    }
    this.currentPage = pageNum;

    const prevRange = (pageNum - 1) * this.paginationLimit;
    const currRange = pageNum * this.paginationLimit;

    this.setPaginationArrowsStatus();

    this.pageCount = Math.ceil(this.currentData.length / this.paginationLimit);
    const currentDataOnPage = this.currentData.slice(prevRange, currRange);

    this.renderPaginationList();
    paginationEL.classList.remove('is-hidden');
    this.clearGallery();
    render.renderGallery(currentDataOnPage);
  }
}

const gallery = new Gallery();

gallery.getRandomData();

galleryEl.addEventListener('click', e => {
  const elem = e.target;

  const addToBtn = elem.closest('.buttons__btn--add-to');
  const removeBtn = elem.closest('.fav-buttons__btn--remove')
  if (elem.classList.contains('buttons__btn--learn-more')) {
    handleOpenCloseModal(e);
  }
  if (addToBtn) {
    console.log('addToBtn: ', addToBtn);
    addToBtn.classList.add('fav-buttons__btn--remove');
    addToBtn.classList.remove('.buttons__btn--add-to');

    addToBtn.textContent = 'Remove';
    favGallery.addToFavorite(addToBtn);
  }
  if (removeBtn) {
    addToBtn.classList.add('fav-buttons__btn--remove');
    removeBtn.classList.remove('fav-buttons__btn--remove')
    addToBtn.textContent = 'Add to';

    favGallery.removeFromFavoriteFromGallery(removeBtn);
  }
});
