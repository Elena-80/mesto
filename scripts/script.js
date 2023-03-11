let container = document.querySelector('.root');
let editButton = container.querySelector('.profile__edit-button');
let popupElement = container.querySelector('.popup');
let closeIcon = popupElement.querySelector('.popup__close-button');
let formElement = popupElement.querySelector('.popup__form'); 
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


  function handleFormSubmit (evt) {
    evt.preventDefault();

    profileJob.textContent = jobInput.value;
    profileName.textContent = nameInput.value;

    closePopup();

}



editButton.addEventListener('click', editProfile);
closeIcon.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);


