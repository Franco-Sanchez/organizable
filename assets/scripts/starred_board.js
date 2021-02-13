import { STORE } from './store.js';
import { BoardServices } from "./services/board_services.js";
import { MyBoards } from './my_boards.js';
import { CurrentBoard } from './current_board.js';
 
export function StarredBoard(parentSelector, dataBoard) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.data = dataBoard;
  this.toString = function() {
    return `
    <li class="js-show-board-${this.data.id}" data-id="${this.data.id}" style="background-color:${this.data.color}">
      <h3>${this.data.name}</h3>
      <div>
        <img class="js-toggle-star-${this.data.id}" src="./assets/images/starred.svg" alt="starred">
      </div>
    </li>`
  }
}

StarredBoard.prototype.addEventListeners = function () {
  this.changeStateStarred();
  this.renderShowBoard();
}

StarredBoard.prototype.changeStateStarred = function () {
  const star = this.parentElement.querySelector(`.js-toggle-star-${this.data.id}`)
    star.addEventListener('click', async (e) => {
      try {
        const boardId = parseInt(star.closest('LI').dataset.id)
        const boardSelected = STORE.boards.find(board => board.id === boardId);
        boardSelected.starred = false;
        const boardServices = new BoardServices();
        const data = await boardServices.update(boardSelected.id, boardSelected.starred, boardSelected.closed);
        STORE.boards = STORE.boards.map(board => {
          if(board.id === data.id) {
            return data;
          }
          return board;
        })
        const myBoards = new MyBoards();
        myBoards.render(); 
      } catch (e) {
        console.log(e)
        alert(e)
      }
    })
}

StarredBoard.prototype.renderShowBoard = function() {
  const board = this.parentElement.querySelector(`.js-show-board-${this.data.id}`);
  const star = board.querySelector(`.js-toggle-star-${this.data.id}`)
  board.addEventListener('click', async (e) => {
    if(e.target !== star) {
      try {
        const boardId = parseInt(board.dataset.id)
        const boardServices = new BoardServices();
        STORE.currentBoard = await boardServices.show(boardId);
        const currentBoard = new CurrentBoard('.js-content');
        currentBoard.render();
      } catch (e) {
        console.log(e);
        alert(e.message)
      }
    }
  });
}