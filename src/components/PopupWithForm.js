import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._handleFormSubmit = handleFormSubmit;
}

_getInputValues() {
  this._formValues = {};
  /*this._formValues = Array.from(this._inputList);*/

  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });
  return this._formValues; /*{name: this._formValues[0].value, profession: this._formValues[1].value};*/
}

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this.close();
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

}


