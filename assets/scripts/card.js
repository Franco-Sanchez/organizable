export function Card(parentSelector, dataCard) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.data = dataCard;
  this.toString = function() {
    return `
    <li class="js-card-${this.data.cardId} card">
      ${this.data.name}
    </li>`
  }
}

Card.prototype.addEventListeners = function() {
  //
}