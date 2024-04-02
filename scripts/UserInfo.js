export default class UserInfo {
    constructor({userName, userOcupation, userAvatar, userId}) {
      this._userName = userName;
      this._userOcupation = userOcupation;
      this._userId = userId;
      this._userAvatar = userAvatar;
    }
  
    getUserInfo() {
      return {
        userName: this._userName.textContent,
        userOcupation: this._userOcupation.textContent,
      };
    }
  
    setUserInfo(data) {
      const {username, userocupation} = data;
      this._userName.textContent = username;
      this._userOcupation.textContent = userocupation;
    }
  
    setUserAvatar(avatar) {
      this._userAvatar.src = avatar;
    }
  }