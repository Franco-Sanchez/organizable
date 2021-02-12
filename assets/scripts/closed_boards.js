import { ClosedBoard } from "./closed_board.js";
import { STORE } from "./store.js";

export function ClosedBoards(parentSelector) {
  if(!ClosedBoards.instance) {
    this.parentSelector = parentSelector
    this.parentElement = document.querySelector(parentSelector)
    this.toString = function() {
      return `
        <div>
          <img src="./assets/images/closed_section.svg" alt="closed_section"> 
          <h2>Closed boards</h2>
        </div>
        <ul class="js-closed-boards"></ul>
      `
    }
    ClosedBoards.instance = this;
  }
  return ClosedBoards.instance
}

ClosedBoards.prototype.render = function() {
  this.parentElement = document.querySelector(this.parentSelector);
  this.parentElement.innerHTML = this;
  const closedBoards = this.generateClosedBoards('.js-closed-boards');
  closedBoards.forEach(closedBoard => {
    closedBoard.addEventListeners();
  })
}

ClosedBoards.prototype.generateClosedBoards = function(parentSelector) {
  const container = this.parentElement.querySelector(parentSelector);
  const filterClosedBoards = STORE.boards.filter(board => board.closed);
  const closedBoards = filterClosedBoards.map(closedBoard => {
    return new ClosedBoard(parentSelector, closedBoard);
  })
  container.innerHTML = closedBoards.join('');
  return closedBoards;
}