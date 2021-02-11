import { apiFetch, BASE_URL } from "./api_fetch.js";

export function BoardServices() {
  if (!BoardServices.instance) {
    BoardServices.instance = this;
  }
  return BoardServices.instance;
}

BoardServices.prototype.boards = function() {
  return apiFetch(`${BASE_URL}/boards`, {
    method: 'GET',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    }
  })
}

BoardServices.prototype.show = function(boardId) {
  return apiFetch(`${BASE_URL}/boards/${boardId}`, {
    method: 'GET',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    }
  })
}

BoardServices.prototype.create = function(name, color) {
  return apiFetch(`${BASE_URL}/boards`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({ name, color }) // por defecto el color es azul
  })
}

BoardServices.prototype.update = function(boardId, starred, closed) {
  return apiFetch(`${BASE_URL}/boards/${boardId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({ starred, closed })
  })
}

BoardServices.prototype.delete = function(boardId) {
  return apiFetch(`${BASE_URL}/boards/${boardId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    }
  })
}