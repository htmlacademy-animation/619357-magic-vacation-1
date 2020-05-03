import TextSplitter from './text-splitter';
export default () => {
  const onScreenChange = () => {
    const animatedTextElements = document.querySelectorAll(`.screen.active .js-split-animated`);
    animatedTextElements.forEach((item) => {
      const animatedText = new TextSplitter(item);
      animatedText.prepareText();
    });
  };

  document.body.addEventListener(`screenChanged`, onScreenChange);

};
