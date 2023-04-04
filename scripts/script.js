const container = document.querySelector('.root');
const profileEditButton = container.querySelector('.profile__edit-button');
const profileAddButton = container.querySelector('.profile__add-button');
const profileName = container.querySelector('.profile__name');
const profileJob = container.querySelector('.profile__profession');
const photoContainer = container.querySelector('.photo-grid__container');

const popupEditElement = container.querySelector('.popup-edit');
const popupEditButton = popupEditElement.querySelector('.popup-edit__close-button');

const popupPhotoElement = container.querySelector('.popup-photo');
const popupPhotoButton = popupPhotoElement.querySelector('.popup-photo__close-button');

const formEditElement = popupEditElement.querySelector('.popup-edit__form');
const nameInput =  formEditElement.querySelector('.popup__input_type_name');
const jobInput = formEditElement.querySelector('.popup__input_type_profession');

const formPhotoElement = popupPhotoElement.querySelector('.popup-photo__form');
const titleInput = formPhotoElement.querySelector('.popup__input_type_title');
const linkInput = formPhotoElement.querySelector('.popup__input_type_link');

const popupZoomWindow = container.querySelector('.popup-zoom');
const popupZoomButton = popupZoomWindow.querySelector('.popup-zoom__close-button');

const pictureTemplate = container.querySelector('#photo').content;


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', addKeyListener);
  document.addEventListener('click', addMouseListener);
}

const addKeyListener = (evt) => {
    if (evt.key === 'Escape') {
      clearPopupForm(document.querySelector('.popup_opened'));
     };
  }

const addMouseListener = (evt) => {
    if (evt.target.classList.contains('popup')) {
      clearPopupForm(document.querySelector('.popup_opened'));
    };
  }

function editProfile() {
    openPopup(popupEditElement);
    jobInput.value = profileJob.textContent;
    nameInput.value = profileName.textContent;
  }

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', addKeyListener);
    document.removeEventListener('click', addMouseListener);
  }

function clearPopupForm(popup) {
  if (popup.querySelector(`.${popup.id}__form`) != null) {
    formElement = popup.querySelector(`.${popup.id}__form`)
    formElement.reset();
    clearErrors(formElement, Array.from(formElement.querySelectorAll('.popup__input')));
    disableButton(popup.querySelector(`.${popup.id}__submit-button`));
  }
  closePopup(popup);
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
  clearPopupForm(popupPhotoElement);
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
  photoContainer.prepend(makeCardObject(item));
}

function makeCardObject(item) {
  const pictureElement = pictureTemplate.querySelector('.photo-grid__grid-element').cloneNode(true);
  const imageElement = pictureElement.querySelector('.photo-grid__image');

  imageElement.src = item.link;
  imageElement.alt = item.name;
  pictureElement.querySelector('.photo-grid__text').textContent = item.name;
  pictureElement.querySelector('.photo-grid__button').addEventListener('click', function (evt) {
  evt.target.classList.toggle('photo-grid__button_active') });
  pictureElement.querySelector('.photo-grid__trash').addEventListener('click', deletePicture);
  imageElement.addEventListener('click', () => openZoomWindow(item));

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
popupPhotoButton.addEventListener('click', () => clearPopupForm(popupPhotoElement));
popupEditButton.addEventListener('click', () => clearPopupForm(popupEditElement));
popupZoomButton.addEventListener('click', () => closePopup(popupZoomWindow));
formEditElement.addEventListener('submit', handleEditFormSubmit);
formPhotoElement.addEventListener('submit', handlePictureFormSubmit);


