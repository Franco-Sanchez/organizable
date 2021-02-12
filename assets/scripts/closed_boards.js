import { Main } from "./main.js";
import { BoardServices } from "./services/board_services.js";
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
  this.parentElement.innerHTML = this;
  this.renderClosedBoards();
  this.deleteBoard();
  this.changeStateClosed();
}

ClosedBoards.prototype.renderClosedBoards = function() {
  const container = this.parentElement.querySelector('.js-closed-boards');
  const closedBoards = STORE.boards.filter(board => board.closed);
  container.innerHTML = closedBoards.map(closedBoard => this.renderClosedBoard(closedBoard)).join('');
}

ClosedBoards.prototype.changeStateClosed = function() {
  const closedIcons = this.parentElement.querySelectorAll('.js-return');
  closedIcons.forEach(closedIcon => {
    closedIcon.addEventListener('click', async (e) => {
      try {
        const boardId = parseInt(closedIcon.closest('LI').dataset.id);
        const boardSelected = STORE.boards.find(board => board.id === boardId);
        boardSelected.closed = false;
        const boardServices = new BoardServices();
        const data = await boardServices.update(boardId, boardSelected.starred, boardSelected.closed)
        STORE.boards = STORE.boards.map(board => {
          if(board.id === data.id) {
            return data;
          }
          return board;
        })
        const main = new Main();
        main.render();
      } catch (e) {
        alert(e.message)
      }
    })
  })
}

ClosedBoards.prototype.deleteBoard = function() {
  const trashes = this.parentElement.querySelectorAll('.js-trash');
  trashes.forEach(trash => {
    trash.addEventListener('click', async (e) => {
      try {
        const boardId = parseInt(trash.closest('LI').dataset.id);
        const boardServices = new BoardServices();
        await boardServices.delete(boardId);
        STORE.boards = STORE.boards.filter(board => board.id !== boardId);
        const main = new Main();
        main.render();
      } catch (e) {
        alert(e)
      }
    })
  });
}

ClosedBoards.prototype.renderClosedBoard = function(closedBoard) {
  return `
    <li data-id="${closedBoard.id}" style="background-color:${closedBoard.color}">
      <h3>${closedBoard.name}</h3>
      <div>
        <img class="js-trash" src="./assets/images/trash.svg" alt="trash">
        <img class="js-return" src="./assets/images/return.svg" alt="return-icon">
      </div>
    </li>
  `
}