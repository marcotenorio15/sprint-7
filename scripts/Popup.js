export default class Popup {
    constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this._popupElement.classList.add('popup_opened');
      document.addEventListener('keyup', this._handleEscClose);
    }
  
    close() {
      this._popupElement.classList.remove('popup_opened');
      document.removeEventListener('keyup', this._handleEscClose);
    }
  
    _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
  
    _isClickOutside(evt) {
      return (
        evt.target.classList.contains('popup_opened') ||
        evt.target.classList.contains('popup__close-button') ||
        !evt.target.closest('.popup')
      );
    }
  
    setEventListeners() {
      this._popupElement.addEventListener('click', (evt) => {
        if (this._isClickOutside(evt)) {
          this.close();
        }
      });
    }
  }