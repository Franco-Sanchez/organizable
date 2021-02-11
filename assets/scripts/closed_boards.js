export function ClosedBoards(parentSelector) {
  if(!ClosedBoards.instance) {
    this.parentSelector = parentSelector
    this.parentElement = document.querySelector(parentSelector)
    this.toString = function() {
      return `<h1>Closed</h1>`
    }
    ClosedBoards.instance = this;
  }
  return ClosedBoards.instance
}

ClosedBoards.prototype.render = function() {
  this.parentElement.innerHTML = this;
}