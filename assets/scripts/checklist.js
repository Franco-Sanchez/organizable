export function Checklist(parentSelector, dataCard, dataChecklist) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.dataCard = dataCard;
  this.dataChecklist = dataChecklist;
  this.toString = function() {
    return `<h6>${this.dataChecklist.name}</h6>`
  }
}

Checklist.prototype.addEventListeners = function() {
  //
}