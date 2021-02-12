export function CurrentBoard(parentSelector) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.toString = function() {
    return `Current Board`
  }
}

CurrentBoard.prototype.render = function() {
  this.parentElement.innerHTML = this;
}