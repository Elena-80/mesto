export default class UserInfo {
  constructor(nameSelector, professionSelector, avatarSelector) {
  this._name = document.querySelector(nameSelector);
  this._profession = document.querySelector(professionSelector);
  this._avatar = document.querySelector(avatarSelector);
};

  getUserInfo () {
    return {name: this._name.textContent, about: this._profession.textContent};
  }

  setUserInfo (inputValues) {
    this._name.textContent = inputValues.name;
    this._profession.textContent = inputValues.about;
  }

  setAvatar (inputValues) {
    this._avatar.src = inputValues.avatar;
  }
}

