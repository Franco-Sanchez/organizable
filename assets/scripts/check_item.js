export function CheckItem(parentSelector, dataChecklist, dataCheckItem) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.dataChecklist = dataChecklist;
  this.dataCheckItem = dataCheckItem;
  this.toString = function() {
    return `
      <li class="js-check-item-${this.dataCheckItem.checkItemId} check-item">
        <input type="checkbox">
        ${this.dataCheckItem.name}
      </li>
      `
  }
}

CheckItem.prototype.addEventListeners = function() {
  // this.addFormCreateCheckItem();
}