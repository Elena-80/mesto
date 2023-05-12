export default class Card {
  constructor(data, templateSelector, {handleCardClick}) {
    this._templateSelector = templateSelector;
    this._link = data.link;
    this._title = data.name;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.photo-grid__grid-element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.photo-grid__image');
    this._image.src = this._link;
    this._image.alt = this._title;
    this._element.querySelector('.photo-grid__text').textContent = this._title;
    this._likeButton = this._element.querySelector('.photo-grid__button');
    this._setEventListeners();
    return this._element;
  }

 _setEventListeners() {
  this._likeButton.addEventListener('click', () => {
    this._likeButton.classList.toggle('photo-grid__button_active') });

    this._element.querySelector('.photo-grid__trash').addEventListener('click', () => {
      this._element.remove() });

      this._image.addEventListener('click', () => {
        this._handleCardClick({src: this._link, title: this._title});
       });

  };
}


