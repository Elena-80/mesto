import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__submit-button');
    this._submitButtonInitialText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
}

setInputValues(data) {
  this._inputList.forEach((input) => {
      input.value = data[input.name];
  });
}


_getInputValues() {
  this._formValues = {};
    this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });
  return this._formValues;
}

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = this._submitButtonInitialText;
    }
  }

}


