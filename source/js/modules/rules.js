export default () => {
  const RULES_SCREEN_ID = 3;
  const lastRulesElement = document.querySelector(`.rules__item:last-child`);
  const startBtnElement = document.querySelector(`.rules__link.btn`);

  const onScreenChange = (evt) => {
    const isRulesScreen = evt.detail.screenId === RULES_SCREEN_ID;
    if (!isRulesScreen) {
      startBtnElement.classList.remove(`active`);
      return;
    }

    lastRulesElement.addEventListener(`animationend`, () => {
      startBtnElement.classList.add(`active`);
    }, {once: true});

  };

  document.body.addEventListener(`screenChanged`, onScreenChange);
};
