import { STORE } from './store.js';
import { BoardServices} from './services/board_services.js';
import { ClosedBoards } from './closed_boards.js';
// import { CurrentBoard } from './current_board.js'

export function ClosedBoard(parentSelector, dataBoard) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.data = dataBoard;
  this.toString = function() {
    return `
    <li class="js-show-board-${this.data.id}" data-id="${this.data.id}" style="background-color:${this.data.color}">
      <h3>${this.data.name}</h3>
      <div>
        <img class="js-trash-${this.data.id}" src="./assets/images/trash.svg" alt="trash">
        <img class="js-return-${this.data.id}" src="./assets/images/return.svg" alt="return-icon">
      </div>
    </li> `
  }
}

ClosedBoard.prototype.addEventListeners = function() {
  this.changeStateClosed();
  this.deleteBoard();
}

ClosedBoard.prototype.changeStateClosed = function() {
  const closedIcon = this.parentElement.querySelector(`.js-return-${this.data.id}`);
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
        const closedBoards = new ClosedBoards();
        closedBoards.render();
      } catch (e) {
        alert(e.message)
      }
    })
}

ClosedBoard.prototype.deleteBoard = function() {
  const trash = this.parentElement.querySelector(`.js-trash-${this.data.id}`);
  trash.addEventListener('click', async (e) => {
      try {
        const boardId = parseInt(trash.closest('LI').dataset.id);
        const boardServices = new BoardServices();
        await boardServices.delete(boardId);
        STORE.boards = STORE.boards.filter(board => board.id !== boardId);
        const closedBoards = new ClosedBoards();
        closedBoards.render();
      } catch (e) {
        alert(e)
      }
    })
}