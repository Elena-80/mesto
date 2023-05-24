
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
import Api from '../components/Api.js'
import PopupWithConfirm from '../components/PopupWithConfirm.js'

const imageAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAvatarButton = document.querySelector('.profile__avatar-edit');
const popupEdit = document.querySelector('.popup-edit');
const profileName = popupEdit.querySelector('.popup__input_type_name');
const profileProfession = popupEdit.querySelector('.popup__input_type_profession');
const formsList = Array.from(document.forms);

let currentCard = null;
let userId = [];

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66/',
  headers: {
    authorization: '488ec7bd-79a7-4d81-922b-0d370c35be2b',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo()
  .then((info) => {
    currentUserInfo.setUserInfo(info);
    currentUserInfo.setAvatar(info);
    userId = info._id;
    })
  .catch((err) => {
    console.log(err);
  });

api.getInitialCards()
  .then((items) => {
    defaultCardList.renderElements(items);
    })
  .catch((err) => {
    console.log(err);
  });


const defaultCardList = new Section({renderer: (item) => {
  const card = createCard(item);
  const cardElement = card.generateCard();
  defaultCardList.addItem(cardElement);
   },
        }, '.photo-grid__container');


const currentUserInfo = new UserInfo('.profile__name', '.profile__profession', '.profile__avatar');
const popupZoomImage = new PopupWithImage('.popup-zoom');
popupZoomImage.setEventListeners();

const popupDeleteConfirm  = new PopupWithConfirm('.popup-delete', {
  submit: (data) => {
    api.deleteCard(data)
      .then(() => {
        currentCard.deleteCard();
      })
      .then(() => {
        currentCard = null;
        popupDeleteConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
})
popupDeleteConfirm.setEventListeners();


function createCard(item) {
  const card = new Card(userId, item, '.photo', {handleCardClick: (item) => {
    popupZoomImage.open(item);
  }
  },

  {handleCardDelete: (item) =>{
    popupDeleteConfirm.open(item);
    currentCard = card;
  }
  },

  {handleLikes: (item) =>{
    api.sendLikes(item)
    .then((numberOfLikes) => {
      item.querySelector('.photo-grid__count').textContent = numberOfLikes.likes.length;
    })
  }
  },

  {subtructLikes: (item) =>{
    api.deleteLikes(item)
    .then((numberOfLikes) => {
      item.querySelector('.photo-grid__count').textContent = numberOfLikes.likes.length;
    })
  }
  }

);

  return card;
}


const popupEditForm = new PopupWithForm('.popup-edit', {handleFormSubmit: (inputValues) => {
  popupEditForm.dataLoading(true);
  api.sendUserInfo(inputValues)
    .then((inputValues) => {
      currentUserInfo.setUserInfo(inputValues);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEditForm.dataLoading(false);
    });
  }
   });
popupEditForm.setEventListeners();


const popupPhotoForm = new PopupWithForm('.popup-photo', {handleFormSubmit: (inputPhotoValues) => {
  popupPhotoForm.dataLoading(true);
  api.sendPictureInfo(inputPhotoValues)
  .then((post) => {
    const card = createCard(post);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
})
  .catch((err) => {
    console.log(err);
})
  .finally(() => {
    popupPhotoForm.dataLoading(false);
  });
  }
   });
popupPhotoForm.setEventListeners();

const popupAvatarForm = new PopupWithForm('.popup-avatar', {handleFormSubmit: (inputValues) => {
  popupAvatarForm.dataLoading(true);
  api.sendNewAvatar(inputValues)
    .then(() => {
      currentUserInfo.setAvatar(inputValues);
    })
    .catch((err) => {
      console.log(err);
  })
    .finally(() => {
      popupAvatarForm.dataLoading(false);
    });
  }
   });
popupAvatarForm.setEventListeners();

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
  profileProfession.value = userData.about;
  popupEditForm.open()
}
  );

  profileAvatarButton.addEventListener('click', () => {
    formValidatorsList.avatarForm.clearForm();
    popupAvatarForm.open()
  }
    );

