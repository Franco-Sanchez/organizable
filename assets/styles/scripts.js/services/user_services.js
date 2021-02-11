import { apiFetch, BASE_URL } from "./api_fetch.js";

export function UserServices() {
  if (!UserServices.instance) {
    UserServices.instance = this;
  }
  return UserServices.instance;
}

UserServices.prototype.create = function(username, password, email, first_name, last_name) {
  return apiFetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password, email, first_name, last_name })
  })
}

UserServices.prototype.show = function(userId) {
  return apiFetch(`${BASE_URL}/users/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    }
  })
}

UserServices.prototype.update = function(userId, username, email, first_name, last_name) {
  return apiFetch(`${BASE_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({ username, email, first_name, last_name })
  })
}

UserServices.prototype.delete = function(userId) {
  return apiFetch(`${BASE_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    }
  })
}