import Gallery from '../gallery/gallery';
import icons from "../../images/icons.svg"

const el = {
  letterBox: document.querySelector('.search-container'),
  gallery: document.querySelector('.gallery__wrapper'),
  openListLetter: document.querySelector('.open-list-letter'),
  selectLetterMb: document.querySelector('.select-letter-mb'),
  selectidLetterMbBox: document.querySelector('.selectid-letter-mb-box'),
  selectidLetterMb: document.querySelector('.selectid-letter-mb'),
  galleryTitle: document.querySelector('.gallery__title'),
};

const gallery = new Gallery();
const notFaundCoctail = `<div class="not-found">
<h2 class="not-found__title">Sorry, we didn't find any cocktail for you</h2>
<svg class="not-found__icon">
  <use href="${icons}#icon-sorry"></use>
</svg>
</div>`;

el.letterBox.addEventListener('click', handleClickToLetter);
el.openListLetter.addEventListener('click', OpenCloseListOfLetter);
el.selectLetterMb.addEventListener('click', handleClickToLetterMobileRender);

async function handleClickToLetter(e) {
  if (e.target.classList.value !== 'search-box') {
    return;
  }

  const activeLetter = document.querySelector('.search-box.is-active');

  if (activeLetter) {
    activeLetter.classList.remove('is-active');
  }

  gallery.clearGallery();

  const selectedElement = e.target;
  const selectedLetter = e.target.textContent;
  gallery.numberOfItemsPerPage();
  const data = await gallery.getDataByLetter(selectedLetter);
  console.log(el.galleryTitle);

  if (data === null) {
    el.galleryTitle.classList.add('is-hidden');
    el.gallery.innerHTML = notFaundCoctail;
  } else {
    gallery.setCurrentPage(1, data);
    el.galleryTitle.classList.remove('is-hidden');
  }

  selectedElement.classList.add('is-active');
}

async function handleClickToLetterMobileRender(e) {
  if (e.target.classList.value !== 'search-box-mb') {
    return;
  }

  const selectedLetter = e.target.textContent;
  gallery.numberOfItemsPerPage();
  const data = await gallery.getDataByLetter(selectedLetter);

  if (data === null) {
    el.galleryTitle.classList.add('is-hidden');
    el.gallery.innerHTML = notFaundCoctail;
  } else {
    gallery.setCurrentPage(1, data);
    el.galleryTitle.classList.remove('is-hidden');
  }

  assingContentBySelected(selectedLetter);
  el.selectLetterMb.classList.toggle('hiden');
}

function OpenCloseListOfLetter() {
  if (el.selectidLetterMbBox.classList.contains('selectid')) {
    el.selectidLetterMbBox.classList.remove('selectid');
  }

  el.selectLetterMb.classList.toggle('hiden');
  el.openListLetter.classList.toggle('open');
}

function assingContentBySelected(content) {
  el.selectidLetterMb.textContent = content;
  el.selectidLetterMbBox.classList.add('selectid');
}
