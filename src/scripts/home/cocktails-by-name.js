import Gallery from "../gallery/gallery";
import icons from "../../images/icons.svg";

const fetchCocktailsForm = document.querySelector('.search-form');
const fetchCocktailsFormMobile = document.querySelector('.search-form-mobile');
const galleryTitle = document.querySelector('.gallery__title');
const inputEl = document.querySelector('.input');
const galleryEl = document.querySelector('.gallery__wrapper');

const gallery = new Gallery();

fetchCocktailsForm.addEventListener('submit', handleInputEvent);
fetchCocktailsFormMobile.addEventListener('submit', handleInputEvent);
const notFaundCoctail = `<div class="not-found">
<h2 class="not-found__title">Sorry, we didn't find any cocktail for you</h2>
<svg class="not-found__icon">
  <use href="${icons}#icon-sorry"></use>
</svg>
</div>`;

async function handleInputEvent(event) {
  let cocktailName = inputEl.value.trim();
  event.preventDefault();
  gallery.clearGallery();
  // inputEl.placeholder = cocktailName;

  if (cocktailName) {
    gallery.numberOfItemsPerPage();
    const data = await gallery.getDataByName(cocktailName);
    if (data === null) {
      galleryTitle.classList.add('is-hidden');
      galleryEl.innerHTML = notFaundCoctail;
    } else {
      gallery.setCurrentPage(1, data);
    }
    
  }


  fetchCocktailsForm.reset();
}