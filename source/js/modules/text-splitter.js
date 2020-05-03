const ANIMATION_PATTERN = [2, 1, 0, 1, 2, 1, 0, 3, 1, 0, 1, 0];

export default class TextSplitter {
  constructor(element) {
    this._element = element;
  }

  prepareText() {
    if (!this._element) {
      return;
    }
    this._initialDelay = +this._element.dataset.initialDelay || 0;
    this._letterDelay = +this._element.dataset.letterDelay || 0;
    this._wordDelay = +this._element.dataset.wordDelay || 0;

    const gpuRenderSettings = `transform, opacity`;
    this._element.style.willChange = gpuRenderSettings;

    const text = this._element.textContent.trim().split(` `).filter(Boolean);
    const content = text.reduce((fragment, word, wordIndex) => {
      const letters = word.split(``).map((letter, index) => {
        const delay = ANIMATION_PATTERN[index % ANIMATION_PATTERN.length] * this._letterDelay + (wordIndex * this._wordDelay) + this._initialDelay;
        const template = `<div
        style="position:relative;display:inline-block;animation-delay:${delay}ms"
        class="letter">${letter}</div>`;
        return template;
      }).join(``);
      const wordTemplate = `<div style="position:relative;display:inline-block;white-space:nowrap;" class="word">${letters}</div> `;
      const fragmentFromTemplate = document.createRange().createContextualFragment(wordTemplate);
      fragment.appendChild(fragmentFromTemplate);
      return fragment;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }
}
