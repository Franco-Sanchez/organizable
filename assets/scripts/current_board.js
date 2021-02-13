import { STORE } from "./store.js";

export function CurrentBoard(parentSelector) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.toString = function() {
    return `
      <section class="js-container-current-board" style="background-color:${STORE.currentBoard.color}">
        <h3>${STORE.currentBoard.name}</h3>
        <div>
          ${STORE.currentBoard.starred ? 
          `<img src="./assets/images/starred.svg" alt="star"` : 
          `<img src="./assets/images/board_normal.svg" alt="star">`}
        </div>
        <div>
          <img class="js-current-closed-${STORE.currentBoard.id}" src="./assets/images/closed.svg" alt="star">
        </div>
        <ul class="js-lists"></ul>
      </section>
    `
  }
}

CurrentBoard.prototype.render = function() {
  this.parentElement.innerHTML = this;
}

// CurrentBoard.prototype.returnChangeState = function() {

// }