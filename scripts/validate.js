
const showError = (formElement, inputElement, message) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = message;
  errorElement.classList.add(enableValidation.errorClass);
  inputElement.classList.add(enableValidation.inputErrorClass);
}

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(enableValidation.errorClass);
  inputElement.classList.remove(enableValidation.inputErrorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export const disableButton = (buttonElement) => {
  buttonElement.classList.add(enableValidation.inactiveButtonClass);
  buttonElement.disabled = true;
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    buttonElement.classList.remove(enableValidation.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

export const clearErrors = (formElement, inputList) => {
  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement);
  });
}

const isValid = () => {
  const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
    const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
          checkInputValidity(formElement, inputElement);
          toggleButtonState(inputList, buttonElement);
      });
    });

  });
};

const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

isValid();

