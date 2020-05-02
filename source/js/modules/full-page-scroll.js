import throttle from 'lodash/throttle';

const ScreenId = {
  STORY: 1,
  PRIZES: 2,
};

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.splashElement = document.querySelector(`.splash`);

    this.activeScreen = 0;
    this.previousScreen = null;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChangedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT));
    window.addEventListener(`popstate`, this.onUrlHashChangedHandler);

    this.onUrlHashChanged();
    this.changePageDisplay();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.previousScreen = currentPosition;
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.previousScreen = this.activeScreen;
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    const showPage = () => {
      this.changeVisibilityDisplay();
      this.emitChangeDisplayEvent();
    };

    if (this.previousScreen === ScreenId.STORY && this.activeScreen === ScreenId.PRIZES) {
      this.splashElement.classList.add(`active`);
      this.splashElement.addEventListener(`animationend`, () => {
        this.splashElement.classList.remove(`active`);
        showPage();
      }, {once: true});
    } else {
      showPage();
    }
    this.changeActiveMenuItem();
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    this.screenElements[this.activeScreen].classList.add(`active`);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
