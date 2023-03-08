const dropdownMenuEl = document.querySelector('.dropdown-menu');
const menuDropdownBtn = document.querySelector('.dropdown-menu-btn');

menuDropdownBtn.addEventListener('click', handleDropdownClick);

function handleDropdownClick() {
    dropdownMenuEl.classList.toggle('js-menu-hidden');
    if(dropdownMenuEl.classList.contains('js-menu-hidden')) {
        document.removeEventListener('click', handleOverDropdownMenuClick);
    } else {
        document.addEventListener('click', handleOverDropdownMenuClick);
    }
}
function handleOverDropdownMenuClick(e) {
    if (e.target.closest('.dropdown-menu-btn')) {
        return;
    }
    if (!e.target.closest('.dropdown-menu')) {
        dropdownMenuEl.classList.toggle('js-menu-hidden');
        document.removeEventListener('click', handleOverDropdownMenuClick);
    }
}

