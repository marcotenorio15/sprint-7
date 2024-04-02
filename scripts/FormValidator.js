export default class FormValidator {
    constructor(formElement, selectors) {
      this._formElement = formElement;
      this._inputSelector = selectors.inputSelector;
      this._submitButtonSelector = selectors.submitButtonSelector;
      this._inactiveButtonClass = selectors.inactiveButtonClass;
      this._inputErrorClass = selectors.inputErrorClass;
      this._errorClass = selectors.errorClass;
      this._inputList = Array.from(
        this._formElement.querySelectorAll(this._inputSelector)
      );
      this._buttonElement = this._formElement.querySelector(
        this._submitButtonSelector
      );
    }
  
    _showInputError(input, errorMessage) {
      const errorElement = this._formElement.querySelector(`.${input.id}-error`);
      input.classList.add(this._inputErrorClass);
      errorElement.classList.add(this._errorClass);
      errorElement.textContent = errorMessage;
    }
  
    _hideInputError(input) {
      const errorElement = this._formElement.querySelector(`.${input.id}-error`);
      input.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    }
  
    _checkInputValidity(input) {
      if (!input.validity.valid) {
        this._showInputError(input, input.validationMessage);
      } else {
        this._hideInputError(input);
      }
    }
  
    _hasInvalidInput = (inputList) =>
      inputList.some((input) => !input.validity.valid);
  
    _toggleButtonState() {
      if (this._hasInvalidInput(this._inputList)) {
        this._setButtonState(true, this._inactiveButtonClass);
      } else {
        this._setButtonState(false, this._inactiveButtonClass);
      }
    }
  
    _setButtonState(disabled, classToAdd) {
      this._buttonElement.disabled = disabled;
      if (disabled) {
        this._buttonElement.classList.add(classToAdd);
      } else {
        this._buttonElement.classList.remove(classToAdd);
      }
    }
  
    resetValidation() {
      this._toggleButtonState();
      this._inputList.forEach((input) => {
        this._hideInputError(input);
        input.value = '';
      });
    }
  
    _setEventListeners = () => {
      this._inputList.forEach((input) => {
        input.addEventListener('input', () => {
          this._checkInputValidity(input);
          this._toggleButtonState();
        });
      });
    };
  
    enableValidation = () => {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    };
  }