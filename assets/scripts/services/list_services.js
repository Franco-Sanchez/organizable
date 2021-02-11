import { apiFetch, BASE_URL } from './api_fetch.js';

export function ListServices() {
  if(!ListServices.instance) {
    ListServices.instance = this;
  }
  return ListServices.instance;
}

ListServices.prototype.create = function(boardId, name) {
  return apiFetch(`${BASE_URL}/boards/${boardId}/lists`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({ name })
  })
}

ListServices.prototype.update = function(boardId, listId, name) {
  return apiFetch(`${BASE_URL}/boards/${boardId}/lists/${listId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({ name })
  })
}

ListServices.prototype.delete = function(boardId, listId) {
  return apiFetch(`${BASE_URL}/boards/${boardId}/lists/${listId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    }
  })
}