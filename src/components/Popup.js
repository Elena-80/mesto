export default class Popup {
  constructor(popupSelector) {
  this._popupSelector = popupSelector;
  this._popup = document.querySelector(this._popupSelector);
  this._handleMouseClose = this._handleMouseClose.bind(this);
  this._handleEscClose = this._handleEscClose.bind(this);
};

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleMouseClose);
  }

  _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      };
    }

  _handleMouseClose(evt) {
      if (evt.target.classList.contains('popup')) {
        this.close();
      };
    }

  close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
      document.removeEventListener('mousedown', this._handleMouseClose);
    }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', () => this.close());
   }

}
