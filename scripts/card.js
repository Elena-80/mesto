import {openPopup, popupZoomWindow} from './index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._link = data.link;
    this._name = data.name;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.photo-grid__grid-element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.photo-grid__image');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.photo-grid__text').textContent = this._name;
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
      popupZoomWindow.querySelector('.popup-zoom__image').src = this._link;
      popupZoomWindow.querySelector('.popup-zoom__image').alt = this._name;
      popupZoomWindow.querySelector('.popup-zoom__title').textContent = this._name;
      openPopup(popupZoomWindow) });

  };
}


