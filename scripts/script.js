const container = document.querySelector('.root');
const profileEditButton = container.querySelector('.profile__edit-button');
const profileAddButton = container.querySelector('.profile__add-button');
const profileName = container.querySelector('.profile__name');
const profileJob = container.querySelector('.profile__profession');
const photoContainer = container.querySelector('.photo-grid__container');

const popupEditElement = container.querySelector('.popup-edit');
const popupPhotoElement = container.querySelector('.popup-photo');
const popupPhotoButton = popupPhotoElement.querySelector('.popup-photo__close-button');
const popupEditButton = popupEditElement.querySelector('.popup-edit__close-button');

const formEditElement = popupEditElement.querySelector('.popup-edit__form');
const nameInput =  formEditElement.querySelector('.popup__text_type_name');
const jobInput = formEditElement.querySelector('.popup__text_type_profession');

const formPhotoElement = popupPhotoElement.querySelector('.popup-photo__form');
const titleInput = formPhotoElement.querySelector('.popup__text_type_title');
const linkInput = formPhotoElement.querySelector('.popup__text_type_link');

const popupZoomWindow = container.querySelector('.popup-zoom');
const popupZoomButton = popupZoomWindow.querySelector('.popup-zoom__close-button');

const pictureTemplate = container.querySelector('#photo').content;


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
     };
  });
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
}

function editProfile() {
    openPopup(popupEditElement);
    jobInput.value = profileJob.textContent;
    nameInput.value = profileName.textContent;
  }

function closePopup(popup) {
    formPhotoElement.reset();
    formEditElement.reset();
    popup.classList.remove('popup_opened');
  }

function handleEditFormSubmit (evt) {
    evt.preventDefault();
    profileJob.textContent = jobInput.value;
    profileName.textContent = nameInput.value;
    closePopup(popupEditElement);
}

function handlePictureFormSubmit (evt) {
  evt.preventDefault();
  renderCard({name: titleInput.value, link: linkInput.value});
  closePopup(popupPhotoElement);
}

function likePicture(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('photo-grid__button_active');
}

function deletePicture(evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.photo-grid__grid-element').remove();
}

function renderCard(item) {
  photoContainer.prepend(addNewPicture(item));
}

function addNewPicture(item) {
  const pictureElement = pictureTemplate.querySelector('.photo-grid__grid-element').cloneNode(true);

  pictureElement.querySelector('.photo-grid__image').src = item.link;
  pictureElement.querySelector('.photo-grid__image').alt = item.name;
  pictureElement.querySelector('.photo-grid__text').textContent = item.name;
  pictureElement.querySelector('.photo-grid__button').addEventListener('click', function (evt) {
  evt.target.classList.toggle('photo-grid__button_active') });
  pictureElement.querySelector('.photo-grid__trash').addEventListener('click', deletePicture);
  pictureElement.querySelector('.photo-grid__image').addEventListener('click', () => openZoomWindow(item));

  return pictureElement;
};

function openZoomWindow (item) {
  popupZoomWindow.querySelector('.popup-zoom__image').src = item.link;
  popupZoomWindow.querySelector('.popup-zoom__title').textContent = item.name;
  openPopup(popupZoomWindow);
}

initialCards.forEach(renderCard);

profileAddButton.addEventListener('click', () => openPopup(popupPhotoElement));
profileEditButton.addEventListener('click', editProfile);
popupPhotoButton.addEventListener('click', () => closePopup(popupPhotoElement));
popupEditButton.addEventListener('click', () => closePopup(popupEditElement));
popupZoomButton.addEventListener('click', () => closePopup(popupZoomWindow));
formEditElement.addEventListener('submit', handleEditFormSubmit);
formPhotoElement.addEventListener('submit', handlePictureFormSubmit);


