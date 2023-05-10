export default class FormValidator {
  constructor(presets, formElement) {
    this._formElement = formElement;
    this._presets = presets;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._presets.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._presets.submitButtonSelector);
    this.clearForm = this.clearForm.bind(this);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._buttonElement.classList.remove(this._presets.inactiveButtonClass);
      this._buttonElement.disabled = false;
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

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton() {
    this._buttonElement.classList.add(this._presets.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  clearForm() {
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
      this._disableButton();
      this._formElement.reset();
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
        });
    });

  }
}
