export default class FormValidator {
  constructor(presets, formElement) {
    this._formElement = formElement;
    this._presets = presets;
  }

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      buttonElement.classList.remove(this._presets.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _showError(inputElement, message) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = message;
    errorElement.classList.add(this._presets.errorClass);
    inputElement.classList.add(this._presets.inputErrorClass);
  }

  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._presets.errorClass);
    inputElement.classList.remove(this._presets.inputErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton = (buttonElement) => {
    buttonElement.classList.add(this._presets.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  _toggleButtonState(inputList, buttonElement) {
    if (_hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      buttonElement.classList.remove(this._presets.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  enableValidation() {
    this._formElement.reset();
    const inputList = Array.from(this._formElement.querySelectorAll(this._presets.inputSelector));
    const buttonElement = this._formElement.querySelector(this._presets.submitButtonSelector);

    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      this._hideError(inputElement);
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
        });
    });


  }
}
