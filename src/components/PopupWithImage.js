import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
  super(popupSelector);
  this._popup = document.querySelector(popupSelector);
  this._image = this._popup.querySelector('.popup-zoom__image');
  this._title = this._popup.querySelector('.popup-zoom__title');
  super.setEventListeners();
};

  open({title, src}) {
    super.open();
    this._image.src = src;
    this._image.alt = title;
    this._title.textContent = title;
  }

}

