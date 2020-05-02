export default () => {
  const animationScreenElement = document.querySelector(`.animation-screen`);
  const onScreenChange = (evt) => {
    const isFirstScreen = evt.detail.screenId === 0;
    animationScreenElement.classList.toggle(`screen--hidden`, !isFirstScreen);
  };
  document.body.addEventListener(`screenChanged`, onScreenChange);
};
