export default () => {
  const onDomReady = () => {
    document.body.classList.add(`ready`);
  };

  document.addEventListener(`DOMContentLoaded`, onDomReady);
};
