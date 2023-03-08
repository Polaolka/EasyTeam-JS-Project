import ApiService from '../api/apiService';
import Render from '../render/render';
import handleOpenCloseModal from '../modals/open-close-modal';
const galleryEl = document.querySelector('.gallery__wrapper');
const nextButton = document.querySelector(".pagination__btn-next");
const prevButton = document.querySelector(".pagination__btn-prev");
const paginationEl = document.querySelector('.pagination__items-wrapper');

const apiService = new ApiService();
const render = new Render();
const screenWidth = window.innerWidth;

export default class Gallery {
  constructor() {
    this.dataItems = [];
    this.promises = [];
    // this.screenWidth = window.innerWidth;
    this.paginationLimit;
    this.currentPage = 1;
    this.pageCount;
  }

  // Отримуемо кількість елементів на сорінці в галереї в залежності від ширини екрана
  numberOfItemsPerPage(screenWidth) {
    if (screenWidth < 768) {
      return this.paginationLimit = 3;

    } else if (screenWidth >= 768 && screenWidth < 1280) {
      return this.paginationLimit = 6;

    } else if (screenWidth > 1280) {
      return this.paginationLimit = 9;
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

  // Отримуємо рандомні данні з рандомними коктейлями
  async getRandomData() {
    const promises = this.promises;
    const data = await this.allPromises(promises);
    const flatData = data.flatMap(i => i);
    console.log('flatData: ', flatData);
    render.renderGallery(flatData);
    galleryEl.querySelectorAll('.buttons__btn--learn-more')
      .forEach((e) => e.addEventListener('click', () => console.log('click on "Learn  more"')));
    galleryEl.querySelectorAll('.buttons__btn--add-to')
      .forEach((e) => e.addEventListener('click', () => console.log('click on "Add to button"')));
  }

  // Будуємо розмітку в залежності від кількості елементів на стр.
  async getDataByName(data) {
    const allNames = await apiService.fetchDataByName(data);
    const flatData = allNames.flatMap(i => i);
   
    return flatData;
    // for (let i = 0; i < this.paginationLimit; i += 1) {
    //   this.dataItems.push(allNames[i]);
    // }
    // render.renderGallery(this.dataItems);
  }

  // Робимо активними\неактивними стрылочки в пагынацыъ в залежносты выд поточноъ сторынки
  setPaginationArrowsStatus() {
    this.currentPage === 1
      ? prevButton.setAttribute("disabled", true)
      : prevButton.removeAttribute('disabled');

    this.pageCount === this.currentPage
      ? nextButton.setAttribute("disabled", true)
      : nextButton.removeAttribute('disabled');
  };

  //Робимо активною кнопку пагынацыъ в залежносты выд поточноъ сторынки 
  setActivePaginationBtn() {
    paginationEl.querySelectorAll(".pagination__btn")
      .forEach((el) => el.addEventListener('click', (e) => {
        const pageNumber = Number(e.target.innerHTML);
        this.paginationBtnHandler(pageNumber);
      }));
  };

  //Слухач кнопок пагынацыъ
  paginationBtnHandler(pageNumber) {
    if (pageNumber !== this.currentPage) {
      this.setCurrentPage(pageNumber);
      this.renderPaginationList();
    }
  }
  //Рендер кнопок пагынацыъ в залежносты выд кылькосты сторынок
  renderPaginationList() {
    paginationEl.innerHTML = '';
    let list = '';
    for (let i = 1; i < (this.pageCount + 1); i += 1) {
      const isActive = i === this.currentPage;
      const className = isActive
        ? 'pagination__btn pagination__btn--active'
        : 'pagination__btn';

      const item = `<li class="pagination__item">
                    <button type="button" class="${className}">${i}</button>
                  </li>`;
      list += item;
    }
    paginationEl.insertAdjacentHTML('beforeend', list)
    this.setActivePaginationBtn();
  }

  //Встановлюэмо поточну сторынку ы запускаэмо роботу пагынацыъ
  async setCurrentPage(pageNum, data) {
    this.currentPage = pageNum;
    this.paginationLimit = this.numberOfItemsPerPage(screenWidth); // Костыль!!!!!!!!!!!!!!!!!!!!!!
    const prevRange = (pageNum - 1) * this.paginationLimit;
    const currRange = pageNum * this.paginationLimit;

    this.setPaginationArrowsStatus();

    this.pageCount = Math.ceil(data.length / this.paginationLimit);
    const currentDataOnPage = data.slice(prevRange, currRange);

    this.renderPaginationList();
    galleryEl.innerHTML = '';
    render.renderGallery(currentDataOnPage);
  };
}

const gallery = new Gallery;

// (async function () {
//   const data = await apiService.fetchDataByName('a');
//   gallery.setCurrentPage(1, data)
// })() //для тестирования 

prevButton.addEventListener("click", () => {
  gallery.setCurrentPage(gallery.currentPage - 1);
});

nextButton.addEventListener("click", () => {
  gallery.setCurrentPage(gallery.currentPage + 1);
});