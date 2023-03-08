import FavGallery from "./build-fav-gallery";

const favGallery = new FavGallery();

const letterBox = document.querySelector('.search-container');

letterBox.addEventListener('click', handleClickToLetter);

async function handleClickToLetter(e) {
  if (e.target.classList.value !== 'search-box') {
    return;
  }

  favGallery.removeCocktails();

  const selectedLetter = e.target.textContent;

  favGallery.renderByLetter(selectedLetter);

}


