export function MyBoards(parentSelector) {
  if(!MyBoards.instance) {
    this.parentSelector = parentSelector
    this.parentElement = document.querySelector(parentSelector)
    this.toString = function() {
      return `<h1>My boards</h1>`
    }
    MyBoards.instance = this;
  }
  return MyBoards.instance
}

MyBoards.prototype.render = function() {
  this.parentElement.innerHTML = this;
}