import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, {submit}) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup-delete__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.close();
      this._submit(this._data);
    });
  }

  open(data) {
    super.open();
    this._data = data;
  }
}
