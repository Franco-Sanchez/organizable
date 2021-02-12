export function Prueba(parentSelector) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.toString = function() {
    return `
      <h1>Prueba</h1>
    `
  }
}

Prueba.prototype.render = function() {
  this.parentElement.innerHTML = this;
}