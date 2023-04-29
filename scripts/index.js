const container = document.querySelector('.root');
const profileEditButton = container.querySelector('.profile__edit-button');
const profileAddButton = container.querySelector('.profile__add-button');
const profileName = container.querySelector('.profile__name');
const profileJob = container.querySelector('.profile__profession');

const popupEditElement = container.querySelector('.popup-edit'); //Форма редактирования данных пользователя
const popupEditButton = popupEditElement.querySelector('.popup-edit__close-button');

const popupPhotoElement = container.querySelector('.popup-photo'); //Форма добавления новой картинки
const popupPhotoButton = popupPhotoElement.querySelector('.popup-photo__close-button');

const formEditElement = popupEditElement.querySelector('.popup-edit__form');
const nameInput =  formEditElement.querySelector('.popup__input_type_name');
const jobInput = formEditElement.querySelector('.popup__input_type_profession');

const formPhotoElement = popupPhotoElement.querySelector('.popup-photo__form');
const titleInput = formPhotoElement.querySelector('.popup__input_type_title');
const linkInput = formPhotoElement.querySelector('.popup__input_type_link');


const presets = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};


import Card from './card.js';
import FormValidation from './FormValidator.js';

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', addKeyListener);
  document.addEventListener('click', addMouseListener);
}

const addKeyListener = (evt) => {
    if (evt.key === 'Escape') {
      closePopup(container.querySelector('.popup_opened'));
     };
  }

const addMouseListener = (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(container.querySelector('.popup_opened'));
    };
  }

function editProfile() {
    openPopup(popupEditElement);
    const validation = new FormValidation(presets, formEditElement);
    validation.enableValidation();
    jobInput.value = profileJob.textContent;
    nameInput.value = profileName.textContent;
  }

function addPicture() {
    openPopup(popupPhotoElement);
    const validation = new FormValidation(presets, formPhotoElement);
    validation.enableValidation();
  }

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', addKeyListener);
    document.removeEventListener('click', addMouseListener);
  }


function handleEditFormSubmit (evt) {
    evt.preventDefault();
    profileJob.textContent = jobInput.value;
    profileName.textContent = nameInput.value;
    closePopup(popupEditElement);
}

function handlePictureFormSubmit (evt) {
  evt.preventDefault();
  const card = new Card({name: titleInput.value, link: linkInput.value}, '.photo');
  const cardElement = card.generateCard();
  document.querySelector('.photo-grid__container').prepend(cardElement);
  closePopup(popupPhotoElement);
}


profileAddButton.addEventListener('click', addPicture);
profileEditButton.addEventListener('click', editProfile);

popupPhotoButton.addEventListener('click', () => closePopup(popupPhotoElement));
popupEditButton.addEventListener('click', () => closePopup(popupEditElement));

formEditElement.addEventListener('submit', handleEditFormSubmit);
formPhotoElement.addEventListener('submit', handlePictureFormSubmit);


