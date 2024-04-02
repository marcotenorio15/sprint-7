export default class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    // _handleResponse es una función útil para manejar errores y procesar los datos recibidos de las solicitudes de API
    _handleResponse(res) {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    }
  
    // _makeRequest es una función útil para hacer solicitudes a la API
    _makeRequest(method, url, body) {
      return fetch(url, {
        method: method,
        headers: this._headers,
        body: body ? JSON.stringify(body) : undefined,
      }).then((res) => {
        return this._handleResponse(res);
      });
    }
  
    //getCardList hara una petición para obtener las tarjetas iniciales
    getCardList() {
      return this._makeRequest('GET', `${this._baseUrl}/cards`);
    }
  
    //getUserInfo hara una petición para obtener los datos del usuario actual
    getUserInfo() {
      return this._makeRequest('GET', `${this._baseUrl}/users/me`);
    }
  
    //setUserInfo hara una petición PATCH al endpoint para actualizar los datos del usuario actual con el nombre y descripción especificados.
    setUserInfo({name, about}) {
      return this._makeRequest('PATCH', `${this._baseUrl}/users/me`, {name, about});
    }
  
    //addCard hara una petición POST al endpoint para crear una nueva tarjeta con el nombre y link especificados.
    addCard({name, link}) {
      return this._makeRequest('POST', `${this._baseUrl}/cards`, {name, link});
    }
  
    //removeCard hara una petición DELETE al endpoint para eliminar la tarjeta con el id especificado.
    removeCard(cardId) {
      return this._makeRequest('DELETE', `${this._baseUrl}/cards/${cardId}`);
    }
  
    //setUserAvatar hara una petición PATCH al endpoint para actualizar el avatar del usuario actual con el link especificado.
    setUserAvatar(avatar) {
      return this._makeRequest('PATCH', `${this._baseUrl}/users/me/avatar`, {avatar});
    }
  
    //addLike hara una petición PUT al endpoint para agregar un like a la tarjeta con el id especificado.
    addLike(cardId) {
      return this._makeRequest('PUT', `${this._baseUrl}/cards/likes/${cardId}`);
    }
  
    //removeLike hara una petición DELETE al endpoint para eliminar el like a la tarjeta con el id especificado.
    removeLike(cardId) {
      return this._makeRequest('DELETE', `${this._baseUrl}/cards/likes/${cardId}`);
    }
  }
  