(() => {
    const mobileMenu = document.querySelector('.js-menu-container');
    const menuBtn = document.querySelector('.js-open-menu');
    const gamburgerEl = document.querySelector('.gamburger-inner');
    const footerMobileEl = document.querySelector('.mobile-footer');
    const themeTogglerMobileEl = document.querySelector('.theme-toggler-mobile');

  
    const toggleMenu = () => {
      const isMenuOpen =
      menuBtn.getAttribute('aria-expanded') === 'true' || false;
      menuBtn.setAttribute('aria-expanded', !isMenuOpen);
      menuBtn.classList.toggle('is-active');
      mobileMenu.classList.toggle('is-open');
      gamburgerEl.classList.toggle('js-modal');
      footerMobileEl.classList.toggle('is-open');


      if (localStorage.getItem('theme') === 'theme-dark') {
        themeTogglerMobileEl.setAttribute('checked', 'checked');
      console.log(themeTogglerMobileEl.hasAttribute('checked'));}

      // const scrollLockMethod = !isMenuOpen
      //   ? 'disableBodyScroll'
      //   : 'enableBodyScroll';
      // bodyScrollLock[scrollLockMethod](document.body);
    };
  
    menuBtn.addEventListener('click', toggleMenu);
    // menuEl.forEach(link => link.addEventListener('click', toggleMenu));
  
    // Закрываем мобильное меню на более широких экранах
    // в случае изменения ориентации устройства.
    // Close the mobile menu on wider screens if the device orientation changes
    window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
      if (!e.matches) return;
      mobileMenu.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', false);
      bodyScrollLock.enableBodyScroll(document.body);
    });
  })();
  