const btnToTopEl = document.querySelector('#toTop');
document.addEventListener('DOMContentLoaded', domContentLoadedHandler);

function domContentLoadedHandler() {
  window.addEventListener('scroll', showOrHideBtnHandler)
  // При клике прокручиываем на самый верх
  btnToTopEl.addEventListener('click', scrollTo(0, 400));
}

function showOrHideBtnHandler() {
  // Если прокрутили дальше 599px, показываем кнопку
  if (scrollY > 100) {
    btnToTopEl.classList.add('show');
    // Иначе прячем
  } else {
    btnToTopEl.classList.remove('show');
  }
};

function scrollTo(to, duration = 700) {
  const element = document.scrollingElement || document.documentElement,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date(),
    easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    },
    animateScroll = function () {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
  animateScroll();
}