import icons from '../../images/icons.svg';
const modalCoctails = document.querySelector('.modal-coctails');
export function renderModalCoctails(data) {
  console.log(data);
  const markupModalCoctail = `
  <svg class="close-modal" width="32" height="32">
  <use href="${icons}#icon-close-modal"></use>
</svg>
  <h2 class="ingridients-title">${data.strDrink}</h2>
    <div class="instruction-wraper">
      <h3 class="instruction-title">Instruction:</h3>
      <p class="instraction">
     ${data.strInstructions}
      </p>
    </div>
    <img src="${
      data.strDrinkThumb
    }" alt="coctail photo" width="280" class="coctails-img" />

    <h3 class="ingridients">INGREDIENTS</h3>
    <h3 class="ingridients-per">Per cocktail</h3>
    <ul class="ingridients-list">
      ${templateIngridients(data)}
</ul>
      <button type="button" class="button-add">Add to favorite</button>
      `;
  modalCoctails.innerHTML = markupModalCoctail;
}

function templateIngridients(data) {
  let markup = '';
  for (let i = 1; i <= 15; i++) {
    const key1 = `strIngredient${i}`;
    const key2 = `strMeasure${i}`;
    if (data[key1] === null) break;

    markup += `<li class="ingridients-item" data-name="${data[key1]}">
        <a
          href="#"
          class="ingridients-link"
          target="_blank"
          rel="noreferrer noopener"
          >✶ ${data[key2]} ${data[key1]}a
        >`;
  }

  return markup;
}
