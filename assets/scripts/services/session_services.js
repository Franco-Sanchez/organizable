import { apiFetch, BASE_URL } from './api_fetch.js';

export function SessionServices() {
  if (!SessionServices.instance) {
    SessionServices.instance = this;
  }
  return SessionServices.instance;
}

SessionServices.prototype.login = function(username, password) {
  return apiFetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
}

SessionServices.prototype.logout = function() {
  return apiFetch(`${BASE_URL}/logout`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    }
  })
}