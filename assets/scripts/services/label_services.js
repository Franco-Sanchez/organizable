import { apiFetch, BASE_URL } from './api_fetch.js';

export function LabelServices() {
  if (!LabelServices.instance) {
    LabelServices.instance = this;
  }
  return LabelServices.instance;
}

LabelServices.prototype.create = function(boardId, name, color) {
  return apiFetch(`${BASE_URL}/boards/${boardId}/labels`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({ name, color }) // name es opcional
  })
}

LabelServices.prototype.update = function(boardId, labelId, name, color) {
  return apiFetch(`${BASE_URL}/boards/${boardId}/labels/${labelId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({ name, color }) // name es opcional
  })
}

LabelServices.prototype.delete = function(boardId, labelId) {
  return apiFetch(`${BASE_URL}/boards/${boardId}/labels/${labelId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    }
  })
}