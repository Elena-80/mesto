const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

import {openPopup, closePopup} from './index.js';

const popupZoomWindow = document.querySelector('.popup-zoom');
const popupZoomButton = popupZoomWindow.querySelector('.popup-zoom__close-button');
popupZoomButton.addEventListener('click', () => closePopup(popupZoomWindow));


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
    this._element.querySelector('.photo-grid__image').src = this._link;
    this._element.querySelector('.photo-grid__text').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

 _setEventListeners() {
   this._element.querySelector('.photo-grid__button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('photo-grid__button_active') });

    this._element.querySelector('.photo-grid__trash').addEventListener('click', () => {
      this._element.remove() });

    this._element.querySelector('.photo-grid__image').addEventListener('click', () => {
      popupZoomWindow.querySelector('.popup-zoom__image').src = this._link;
      popupZoomWindow.querySelector('.popup-zoom__title').textContent = this._name;
      openPopup(popupZoomWindow) });

  };
}


initialCards.forEach((item) => {
  const card = new Card(item, '.photo');
  const cardElement = card.generateCard();
  document.querySelector('.photo-grid__container').append(cardElement);
});

