const menuDropdownMobileBtn = document.querySelector('.mark-more-mobile');
const menuDropdownElMob = document.querySelector('.dropdown-menu-mobile');

menuDropdownMobileBtn.addEventListener('click', handleDropdownMobileClick);

function handleDropdownMobileClick(e) {
    menuDropdownElMob.classList.toggle('js-menu-hidden');
    menuDropdownMobileBtn.classList.toggle('js-rotate');
    if(menuDropdownElMob.classList.contains('js-menu-hidden')) {
                document.removeEventListener('click', handleOverDropdownMenuClick);
            } else {
                document.addEventListener('click', handleOverDropdownMenuClick);
            }
};

function handleOverDropdownMenuClick(e) {
    if (e.target.closest('.mark-more-mobile')) {
        return;
    }
    if (!e.target.closest('.mark-more-mobile')) {
        menuDropdownElMob.classList.toggle('js-menu-hidden');
        document.removeEventListener('click', handleOverDropdownMenuClick);
    }
}