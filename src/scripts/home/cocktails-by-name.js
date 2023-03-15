import Gallery from "../gallery/gallery";
import Render from "../render/render";

const fetchCocktailsForm = document.querySelector('.search-form');
const fetchCocktailsFormMobile = document.querySelector('.search-form-mobile');
const inputEl = document.querySelector('.input');

const gallery = new Gallery();
const render = new Render();

fetchCocktailsForm.addEventListener('submit', handleInputEvent);
fetchCocktailsFormMobile.addEventListener('submit', handleInputEvent);


async function handleInputEvent(event) {
  let cocktailName = inputEl.value.trim();
  event.preventDefault();
  gallery.clearGallery();

  if (cocktailName) {
    gallery.numberOfItemsPerPage();
    const data = await gallery.getDataByName(cocktailName);
    if (data === null) {
      render.renderNotFound();
    } else {
      gallery.setCurrentPage(1, data);
    }
  }
  fetchCocktailsForm.reset();
}