import { apiFetch, BASE_URL } from "./api_fetch.js";

export function ChecklistServices() {
  if(!ChecklistServices.instance) {
    ChecklistServices.instance = this;
  }
  return ChecklistServices.instance
}

ChecklistServices.prototype.create = function(cardId, name) {
  return apiFetch(`${BASE_URL}/cards/${cardId}/checklists`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({ name })
  })
}

ChecklistServices.prototype.delete = function(cardId, checklistId) {
  return apiFetch(`${BASE_URL}/cards/${cardId}/checklists/${checklistId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    }
  })
}