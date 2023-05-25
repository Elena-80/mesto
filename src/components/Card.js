
export default class Card {
  constructor(userId, data, templateSelector, {handleCardClick}, {handleCardDelete}, {handleLikes}, {subtructLikes}) {
    this._templateSelector = templateSelector;
    this._link = data.link;
    this._title = data.name;
    this._likes = data.likes.length;
    this._likesStr = JSON.stringify(data.likes);
    this._userId = userId
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._data = data;
    this._handleLikes = handleLikes;
    this._subtructLikes = subtructLikes;
    this._ownerId = data.owner._id;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.photo-grid__grid-element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._button = this._element.querySelector('.photo-grid__trash');
    if (this._userId != this._ownerId) {
      this._button.remove();
    } else {
      this._element.querySelector('.photo-grid__trash').addEventListener('click', () => this._handleCardDelete(this._element));
    }
    this._image = this._element.querySelector('.photo-grid__image');
    this._count = this._element.querySelector('.photo-grid__count');
    this._likeButton = this._element.querySelector('.photo-grid__button');
    this._element.querySelector('.photo-grid__text').textContent = this._title;
    this._element.setAttribute('id', `${this._data._id}`);
    this._image.src = this._link;
    this._image.alt = this._title;
    this._count.textContent = this._likes;
    if (this._likesStr.includes(this._userId)) {
      this._likeButton.classList.toggle('photo-grid__button_active');
    }
    this._setEventListeners();
    return this._element;
  }

 _setEventListeners() {
  this._likeButton.addEventListener('click', () => {
    if (this._likeButton.classList.contains('photo-grid__button_active')) {
      this._subtructLikes(this._element);
    } else {
      this._handleLikes(this._element)}
  }
    );
      this._image.addEventListener('click', () => {
        this._handleCardClick({src: this._link, title: this._title});
       });

  };

  deleteCard() {
    this._element.remove();
  }

  changeLikes(numberOfLikes) {
    this._count.textContent = numberOfLikes.likes.length;
    this._likeButton.classList.toggle('photo-grid__button_active');
  }

}


