const searchFofm = document.querySelector('.search-form');
const LS_SEARCH = 'SearchFromFavorites';
const inputEl = document.querySelector('.input');

searchFofm.addEventListener('submit', handleSearchFaforitSubmit);

function handleSearchFaforitSubmit(event) {

    localStorage.removeItem(LS_SEARCH);

    event.preventDefault();
    let cocktailName = inputEl.value.trim();
    // console.log(cocktailName);
    document.location.assign('http://localhost:1234');

    localStorage.setItem(LS_SEARCH, JSON.stringify(cocktailName));
    const test = JSON.parse(localStorage.getItem(LS_SEARCH));
    // console.log(test);
}

