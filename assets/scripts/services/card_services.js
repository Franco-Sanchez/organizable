import { apiFetch, BASE_URL } from './api_fetch.js';

export function CardServices() {
  if (!CardServices.instance) {
    CardServices.instance = this;
  }
  return CardServices.instance;
}

CardServices.prototype.create = function(listId, name, desc) {
  return apiFetch(`${BASE_URL}/lists/${listId}/cards`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({ name, desc }) // desc es opcional
  })
}

CardServices.prototype.show = function(listId, cardId) {
  return apiFetch(`${BASE_URL}/lists/${listId}/cards/${cardId}`, {
    method: 'GET',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    }
  })
}

CardServices.prototype.update = function(actualListId, cardId, name, listId, pos, desc) {
  return apiFetch(`${BASE_URL}/lists/${actualListId}/cards/${cardId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({ name, listId, pos, desc })
  })
}

CardServices.prototype.delete = function(listId, cardId) {
  return apiFetch(`${BASE_URL}/lists/${listId}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    }
  })
}