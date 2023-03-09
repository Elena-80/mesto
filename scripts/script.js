let container = document.querySelector('.root');
let addButton = container.querySelector('.profile__add-button');
let editButton = container.querySelector('.profile__edit-button');
let popupElement = container.querySelector('.popup');
let likedElement = container.querySelector('.photo-grid__icon');
let closeIcon = popupElement.querySelector('.popup__close-button');
let formElement = popupElement.querySelector('.popup__form'); 
let buttonSubmit = formElement.querySelector('.popup__submit-button');
let profileName = container.querySelector('.profile__name'); 
let profileJob = container.querySelector('.profile__profession');
let nameInput =  formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__profession');

function editProfile() {
    
    popupElement.classList.add('popup_opened');
    jobInput.value = profileJob.textContent;
    nameInput.value = profileName.textContent;
  }

function closePopup() {
    popupElement.classList.remove('popup_opened');

  }

function likedIcon() {
  if (likedElement.classList.contains('photo-grid__icon_active')) {
      likedElement.classList.remove('photo-grid__icon_active');
    }
  else {
    likedElement.classList.add('photo-grid__icon_active');
  }
  }

  function handleFormSubmit (evt) {
    evt.preventDefault();

    profileJob.textContent = jobInput.value;
    profileName.textContent = nameInput.value;

    popupElement.classList.remove('popup_opened');

}



likedElement.addEventListener('click', likedIcon);
editButton.addEventListener('click', editProfile);
closeIcon.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);


