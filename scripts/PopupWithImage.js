import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector('.popup__image');
    this._title = this._popupElement.querySelector('.popup__caption');
  }

  open({link, name}) {
    this._image.src = link;
    this._title.textContent = name;
    this._image.setAttribute('alt', name);
    super.open();
  }
}