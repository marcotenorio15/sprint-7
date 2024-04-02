export default class Card {
    constructor(
      {
        data,
        handleCardClick,
        handleDeleteClick,
        handleLikeAdd,
        handleLikeDelete,
        userId,
      },
      template
    ) {
      this._name = data.name;
      this._link = data.link;
      this._template = template;
      this._id = data._id;
      this._likesArray = data.likes;
      this._cardLikes = this._likesArray.length;
      this._ownerId = data.owner._id;
      this._user = userId;
      this._handleCardClick = handleCardClick;
      this._handleDeleteClick = handleDeleteClick;
      this._handleLikeAdd = handleLikeAdd;
      this._handleLikeDelete = handleLikeDelete;
  
      this._element = this._getTemplate();
      
      this._heartButton = this._element.querySelector('.card__like-button');
      this._heartNumber = this._element.querySelector('.card__like-counter');
      this._cardImage = this._element.querySelector('.card__image');
      this._cardTitle = this._element.querySelector('.card__title');
    }
      
    _getTemplate() {
      return document
      .querySelector(this._template)
      .content.querySelector('.card')
      .cloneNode(true);
    }
    
    addHeart() {
      this._heartButton.classList.add('card__like-button_on');
      this._heartNumber.textContent = this._likesArray.length;
    }
    
    removeHeart() {
      this._heartButton.classList.remove('card__like-button_on');
      this._heartNumber.textContent = this._likesArray.length;
      if (this._cardLikes === 0) {
        this._heartNumber.textContent = '';
      }
    }
    
    _deleteButton() {
      const trashButton = this._element.querySelector('.card__delete-button');
      trashButton.closest('.card').remove();
    }
    
    updateLikes = (resArray) => {
      this._likesArray = resArray;
      return this._likesArray;
    };
    
    _setEventListeners() {
      this._heartButton.addEventListener('click', () => {
        const hasUserLiked = this._likesArray.some(
          (like) => like._id === this._user
          );
          if (hasUserLiked) {
            this._handleLikeDelete({id: this._id});
          } else {
            this._handleLikeAdd({id: this._id});
          }
        });
        
        this._element
        .querySelector('.card__delete-button')
        .addEventListener('click', () => {
          this._handleDeleteClick({id: this._id});
        });
        
        this._cardImage.addEventListener('click', () =>
        this._handleCardClick({name: this._name, link: this._link})
        );
        
        if (this._ownerId !== this._user) {
          this._element.querySelector('.card__delete-button').remove();
        }
      }
      
      generateCard() {
        this._setEventListeners();
        
        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.setAttribute('alt', this._name);
  
        this._heartNumber.textContent = this._cardLikes ? this._cardLikes : '';
  
        const hasUserLiked = this._likesArray.some(
          (like) => like._id === this._user
        );
        this._heartButton.classList.toggle('card__like-button_on', hasUserLiked);
  
      return this._element;
    }
  }
  