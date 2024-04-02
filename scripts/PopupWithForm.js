import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit, submitButton}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._submitButton = submitButton;
  }

  close() {
    super.close();
    this.renderLoading(false);
    this._formElement.reset();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Guardando...';
    } else {
      this._submitButton.textContent = this._submitButton.dataset.textcontent;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(this._getInputValues());
    });
  }
}