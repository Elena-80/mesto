export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResult(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }


  getInitialCards() {
    return fetch( `${this._baseUrl}cards`,  /*'https://mesto.nomoreparties.co/v1/cohort-66/cards'*/
      {headers: this._headers})
    .then(this._checkResult)
}

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`,  /*'https://mesto.nomoreparties.co/v1/cohort-66/users/me'*/
      {headers: this._headers})
    .then(this._checkResult)
  }


  sendUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
  .then(this._checkResult)
  }

  sendPictureInfo(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResult)
  }

  deleteCard(data) {
    this._cardId = data.id;
    return fetch(`${this._baseUrl}cards/${this._cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResult)
  }

  sendLikes(data) {
    this._cardId = data.id;
    return fetch(`${this._baseUrl}cards/${this._cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResult)
  }

  deleteLikes(data) {
    this._cardId = data.id;
    return fetch(`${this._baseUrl}cards/${this._cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResult)
  }

  sendNewAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: data.avatar
    })
  })
  .then(this._checkResult)
  }


}
