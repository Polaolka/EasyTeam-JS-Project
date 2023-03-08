// // const themeTogglerEl = document.querySelector('.theme-toggler');
// const themeTogglerMobileEl = document.querySelector('.theme-toggler-mobile');
// try {
//     if (localStorage.getItem('theme') === 'theme-dark') {
//         document.querySelector('html').classList.add('dark');
//         themeTogglerEl.setAttribute('checked', 'checked');
//         // console.log(themeTogglerEl.hasAttribute('checked'));
//     }
// } catch (error) {
//     console.log(error);
// }
// let userThemeChoice = false;
// // themeTogglerEl.addEventListener('change', handleUserThemeChoice);
// themeTogglerMobileEl.addEventListener('change', handleUserThemeChoice);
// function handleUserThemeChoice(e) {
//     userThemeChoice = e.target.checked ? true : false;
//     if (userThemeChoice) {
//         document.querySelector('html').classList.add('dark');
//         localStorage.setItem('theme', 'theme-dark');
//     } else {
//         document.querySelector('html').classList.remove('dark');
//         localStorage.removeItem('theme');
//     }
// }