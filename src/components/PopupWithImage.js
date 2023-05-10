import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
  super(popupSelector);
  this._popup = document.querySelector(popupSelector);
};

  open({title, src}) {
    super.open();
    this._popup.querySelector('.popup-zoom__image').src = src;
    this._popup.querySelector('.popup-zoom__image').alt = title;
    this._popup.querySelector('.popup-zoom__title').textContent = title;
  }

}

