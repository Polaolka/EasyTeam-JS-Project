const themeTogglerEl = document.querySelector('.theme-toggler');
const themeTogglerMobileEl = document.querySelector('.theme-slider-mobile');

import { getDataFromLockalStorageByKey } from "../utils/getDataFromLockalStorageByKey";
import { setDataToLocalStorageByKey } from "../utils/setDataToLocalStorageByKey";
const LS_KEY_THEME = 'theme';
const htmlEl = document.querySelector('html');
const isInLockalStorageTheme = getDataFromLockalStorageByKey(LS_KEY_THEME);

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
        setDataToLocalStorageByKey('theme', 'theme-dark');
    } else {
        htmlEl.classList.remove('dark');
        localStorage.removeItem('theme');
    }
}