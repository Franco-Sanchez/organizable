import { apiFetch, BASE_URL } from "./api_fetch.js";

export function CheckItemServices() {
  if(!CheckItemServices.instance) {
    CheckItemServices.instance = this;
  }
  return CheckItemServices.instance
}

CheckItemServices.prototype.create = function(checklistId, name) {
  return apiFetch(`${BASE_URL}/checklists/${checklistId}/check_items`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({ name })
  })
}

CheckItemServices.prototype.update = function(checklistId, checkItemId, completed) {
  return apiFetch(`${BASE_URL}/checklists/${checklistId}/check_items/${checkItemId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({ completed })
  })
}