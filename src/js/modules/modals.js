const modals = () => {
  let btnPressed = false;

  function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
    const trigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);
    const windows = document.querySelectorAll('[data-modal]');

    const scroll = calcScroll();

    trigger.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }

        btnPressed = true;

        if (destroy) {
          item.remove();
        }

        windows.forEach((item) => {
          item.style.display = 'none';
          item.classList.add('animated', 'fadeIn');
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
        // document.body.classList.add('modal-open');
      });
    });

    close.addEventListener('click', () => {
      windows.forEach((item) => {
        item.style.display = 'none';
      });
      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = `0px`;
      // document.body.classList.remove('modal-open');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        windows.forEach((item) => {
          item.style.display = 'none';
        });
        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
        // document.body.classList.remove('modal-open');
      }
    });
  }
  // Показать модальное окно через какое-то время

  function showModalByTime(selector, time) {
    setTimeout(() => {
      let display;

      document.querySelectorAll('[data-modal]').forEach((item) => {
        if (getComputedStyle(item).display !== 'none') {
          display = 'block';
        }
      });

      if (!display) {
        document.querySelector(selector).style.display = 'block';
        document.body.style.overflow = 'hidden';
        let scroll = calcScroll();
        document.body.style.marginRight = `${scroll}px`;
      }
    }, time);
  }

  // Определяем ширину скролла для фикса скачка при открытии и закрытии модалки
  function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflow = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }
  // ==========================
  // Открытие попапа в конце станицы, если ни разу не была нажата кнопка с попапом

  function openByScroll(selector) {
    window.addEventListener('scroll', () => {
      if (
        !btnPressed &&
        window.scrollY + document.documentElement.clientHeight >=
          document.documentElement.scrollHeight
      ) {
        document.querySelector(selector).click();
      }
    });
  }
  // ==========================

  bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  openByScroll('.fixed-gift');

  // Показать модальное окно через 60сек
  // showModalByTime('.popup-consultation', 6000);

  // Модальное окно — калькулятор
};

export default modals;
