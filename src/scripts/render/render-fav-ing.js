import ApiService from '../api/apiService';
import icons from '../../images/icons.svg';
import { handleOpenModalIngridientsFav } from '../home/open-close-modalIng';
const LS_KEY_FAV_ING = 'Fav-Ingredients';


const favIngWrapper = document.querySelector('.fav-ing-wrapper');
// const favIngOpener = document.querySelector('.js-fav-ing-opener');
const apiService = new ApiService();
// favIngOpener.addEventListener('click', getFavIngData);
// const promisesIng = makePromises();

getFavIngData();

// Генеруємо проміси ing.
function makePromises() {
  const favIngs = JSON.parse(localStorage.getItem(LS_KEY_FAV_ING));
  console.log(favIngs);
  // const promises = favIngs.reduce((acc, id)=> {return acc.push(apiService.fetchDataByIdIngr(id))}, [])
  const promises = favIngs.reduce((acc, id) => {
    acc.push(apiService.fetchDataByIdIngr(id));
    return acc;
  }, []);
  console.log(promises);
  return promises;
}

// Чекаємо виконання всіх промісів з fav ing
async function waitAllPromises(promisesIng) {
  const pr = Promise.all(promisesIng).catch(error => console.log(error));
  return pr;
}

function renderFavIng(data) {
  console.log(data);

  const galleryItems = data
    .map(elem => {
      return `
            <li class="favorite" id="${elem.idIngredient}">
                <h3 class="favorite__title">${elem.strIngredient}</h3>
                <p class="favorite__text">${elem.strType}</p>
                <div class="button">
                    <button type="button" class="button__btn button__btn--learn-more js-learn-more-ing">Learn more</button>
                    <button type="button" class="button__btn button__btn--add-to js-remove-ing-card">Remove
                        <svg class="button__icon">
                            <use class="icon-heart" href="${icons}#icon-heart_fill"></use>
                        </svg>
                 </button>
                </div>
            </li>
            `;
    })
    .join('');
  // favIngWrapper.insertAdjacentHTML('beforeend', galleryItems);
  favIngWrapper.innerHTML = galleryItems;

  favIngWrapper.addEventListener('click', e => {
    const elem = e.target;

    if (elem.classList.contains('js-learn-more-ing')) {
      handleOpenModalIngridientsFav(e);
      console.log('click on "Learn more ing"');
    }
    if (elem.classList.contains('js-remove-ing-card')) {
      console.log('click on "Remove from button"');
      removeFromFavIngs(e);
    }
  });
}

// Отримуємо данні з fav ing
async function getFavIngData() {
  const promises = makePromises();
  const data = await waitAllPromises(promises);
  const flatData = data.flatMap(i => i);
  renderFavIng(flatData);
}


function removeFromFavIngs(e) {
  const favIngs = JSON.parse(localStorage.getItem(LS_KEY_FAV_ING));
  let favIngrID = e.target.closest('.favorite').id;
  const newFawarite = favIngs.filter((el) => el !== favIngrID);
  localStorage.setItem(LS_KEY_FAV_ING, JSON.stringify(newFawarite));
  getFavIngData();
  return;
}