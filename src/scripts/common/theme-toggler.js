const themeTogglerEl = document.querySelector('.theme-toggler');
const themeTogglerMobileEl = document.querySelector('.theme-slider-mobile');

import { getDataFromLockalStorageByKey } from "../utils/getDataFromLockalStorageByKey";
import { setDataToLocalStorageByKey } from "../utils/setDataToLocalStorageByKey";

// const favCocktails = JSON.parse(localStorage.getItem(LS_KEY_FAV_COCKT));
// const theme = localStorage.getItem("ui-theme");


const LS_KEY_THEME = 'theme';
const LS_THEME_DATA = "theme-dark";
const htmlEl = document.querySelector('html');
const isInLockalStorageTheme = localStorage.getItem(LS_KEY_THEME);

if (isInLockalStorageTheme) {
    htmlEl.classList.add('dark');
    themeTogglerEl.setAttribute('checked', 'checked');
    themeTogglerMobileEl.setAttribute('checked', 'checked');
}

themeTogglerEl.addEventListener('change', handleUserThemeChoice);
themeTogglerMobileEl.addEventListener('change', handleUserThemeChoice);

function handleUserThemeChoice(e) {
    const userThemeChoice = e.target.checked ? true : false;
    if (userThemeChoice) {
        htmlEl.classList.add('dark');
        localStorage.setItem(LS_KEY_THEME, LS_THEME_DATA)
    } else {
        htmlEl.classList.remove('dark');
        localStorage.removeItem('theme');
    }
}