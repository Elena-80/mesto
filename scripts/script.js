let container = document.querySelector('.root');
let editButton = container.querySelector('.profile__edit-button');
let addButton = container.querySelector('.profile__add-button');
let profileName = container.querySelector('.profile__name');
let profileJob = container.querySelector('.profile__profession');
let photoContainer = container.querySelector('.photo-grid__container');

let popupEditElement = container.querySelector('.popup-edit');
let popupPhotoElement = container.querySelector('.popup-photo');
let closePhotoElement = popupPhotoElement.querySelector('.popup-photo__close-button');
let closeEditElement = popupEditElement.querySelector('.popup-edit__close-button');

let formElement = popupEditElement.querySelector('.popup-edit__form');
let nameInput =  formElement.querySelector('.popup__text_type_name');
let jobInput = formElement.querySelector('.popup__text_type_profession');

let formPhotoElement = popupPhotoElement.querySelector('.popup-photo__form');
let titleInput = formPhotoElement.querySelector('.popup__text_type_title');
let linkInput = formPhotoElement.querySelector('.popup__text_type_link');

let zoomWindow = container.querySelector('.popup-zoom');
let closeZoomElement = zoomWindow.querySelector('.popup-zoom__close-button');


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

function addPicture() {
    popupPhotoElement.classList.add('popup_opened');
}

function editProfile() {
    popupEditElement.classList.add('popup_opened');
    jobInput.value = profileJob.textContent;
    nameInput.value = profileName.textContent;
  }

function closePopup() {
    popupPhotoElement.classList.remove('popup_opened');
    popupEditElement.classList.remove('popup_opened');
    zoomWindow.classList.remove('popup-zoom_opened');
  }

function handleFormSubmit (evt) {
    evt.preventDefault();

    profileJob.textContent = jobInput.value;
    profileName.textContent = nameInput.value;

    closePopup();
}

function handlePictureFormSubmit (evt) {
  evt.preventDefault();

  initialCards.unshift({name: titleInput.value, link: linkInput.value});
  photoContainer.innerHTML = "";
  /*addNewPicture({name: titleInput.value, link: linkInput.value});*/
  initialCards.forEach(addNewPicture);
  formPhotoElement.reset();

  closePopup();
}

function likePicture(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('photo-grid__button_active');
}

function deletePicture(evt) {
  const eventTarget = evt.target;
  delElementIndex = [...photoContainer.children].indexOf(eventTarget.parentElement);
  /*eventTarget.parentElement.remove();*/
  photoContainer.innerHTML = "";
  initialCards.splice(delElementIndex, 1);
  initialCards.forEach(addNewPicture);
}


function addNewPicture(item) {
  const pictureTemplate = container.querySelector('#photo').content;
  const pictureElement = pictureTemplate.querySelector('.photo-grid__grid-element').cloneNode(true);

  pictureElement.querySelector('.photo-grid__image').src = item.link;
  pictureElement.querySelector('.photo-grid__image').alt = item.name;
  pictureElement.querySelector('.photo-grid__text').textContent = item.name;
  pictureElement.querySelector('.photo-grid__button').addEventListener('click', function (evt) {
  evt.target.classList.toggle('photo-grid__button_active') });
  pictureElement.querySelector('.photo-grid__trash').addEventListener('click', deletePicture);
  pictureElement.querySelector('.photo-grid__image').addEventListener('click', openZoomWindow);
  photoContainer.append(pictureElement);
};

function openZoomWindow (evt) {
  const eventTarget = evt.target;
  zoomWindow.querySelector('.popup-zoom__image').src = eventTarget.src;
  zoomWindow.querySelector('.popup-zoom__title').textContent = eventTarget.parentElement.querySelector('.photo-grid__text').textContent;
  zoomWindow.classList.add('popup-zoom_opened');
}

initialCards.forEach(addNewPicture);

addButton.addEventListener('click', addPicture);
editButton.addEventListener('click', editProfile);
closePhotoElement.addEventListener('click', closePopup);
closeEditElement.addEventListener('click', closePopup);
closeZoomElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
formPhotoElement.addEventListener('submit', handlePictureFormSubmit);


