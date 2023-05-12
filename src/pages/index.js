const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const presets = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  };

import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js'

const imageAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

const popupEdit = document.querySelector('.popup-edit');
const profileName = popupEdit.querySelector('#name');
const profileProfession = popupEdit.querySelector('#profession');
const formsList = Array.from(document.forms);

const popupZoomImage = new PopupWithImage('.popup-zoom');
const currentUserInfo = new UserInfo('.profile__name', '.profile__profession');

function createCard(item) {
  const card = new Card(item, '.photo', {handleCardClick: (item) => {
    popupZoomImage.open(item);
    popupZoomImage.setEventListeners();
  }
  });
  return card;
}

const defaultCardList = new Section({ items: initialCards, renderer: (item) => {
  const card = createCard(item);
  const cardElement = card.generateCard();
  defaultCardList.addItem(cardElement);
   },
        }, '.photo-grid__container');


const popupEditForm = new PopupWithForm('.popup-edit', {handleFormSubmit: (inputValues) => {
  currentUserInfo.setUserInfo(inputValues);
  }
   });
popupEditForm.setEventListeners();

const popupPhotoForm = new PopupWithForm('.popup-photo', {handleFormSubmit: (inputPhotoValues) => {
  const card = createCard(inputPhotoValues);
  const cardElement = card.generateCard();
  defaultCardList.addItem(cardElement);
  }
   });
popupPhotoForm.setEventListeners();


const formValidation = (formElement) => {
  const validator = new FormValidator(presets, formElement);
  validator.enableValidation();
  return validator;
}

const formValidatorsList = {};
formsList.forEach(form => {
  formValidatorsList[form.id] = formValidation(form);
});

imageAddButton.addEventListener('click', () => {
  popupPhotoForm.open()
  formValidatorsList.photoForm.clearForm();
}
  );

profileEditButton.addEventListener('click', () => {
  formValidatorsList.editForm.clearForm();
  const userData = currentUserInfo.getUserInfo();
  profileName.value = userData.name;
  profileProfession.value = userData.profession;
  popupEditForm.open()
}
  );


defaultCardList.renderElements();

