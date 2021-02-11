import { apiFetch, BASE_URL } from './api_fetch.js';

export function CardLabelServices() {
  if(!CardLabelServices.instance) {
    CardLabelServices.instance = this;
  }
  return CardLabelServices.instance
}

CardLabelServices.prototype.add = function(cardId, labelId) {
  return apiFetch(`${BASE_URL}/cards/${cardId}/cards_labels?label_id=${labelId}`, {
    method: 'POST',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    }
  })
}

CardLabelServices.prototype.remove = function(cardId, labelId) {
  return apiFetch(`${BASE_URL}/cards/${cardId}/cards_labels?label_id=${labelId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    }
  })
}