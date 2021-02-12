import { STORE } from './store.js';
import { BoardServices } from './services/board_services.js';
import { MyBoards } from './my_boards.js';

export function SingleBoard(parentSelector, dataBoard) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.data = dataBoard;
  this.toString = function() {
    return `
    <li data-id="${this.data.id}" style="background-color:${this.data.color}">
      <h3>${this.data.name}</h3>
      <div>
        <img class="js-closed-icon" src="./assets/images/closed.svg" alt="closed">
        <img class="js-toggle-star" src="./assets/images/board_normal.svg" alt="board-normal">
      </div>
    </li>`
  }
}

SingleBoard.prototype.addEventListeners = function() {
  this.changeStateStarred();
  this.changeStateClosed();
}

SingleBoard.prototype.changeStateStarred = function() {
  const stars = this.parentElement.querySelectorAll('.js-toggle-star')
  stars.forEach(star => {
    star.addEventListener('click', async (e) => {
      try {
        const boardId = parseInt(star.closest('LI').dataset.id)
        const boardSelected = STORE.boards.find(board => board.id === boardId);
        boardSelected.starred = true;
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
        alert(e)
      }
    })
  });
}

SingleBoard.prototype.changeStateClosed = function() {
  const closedIcons = this.parentElement.querySelectorAll('.js-closed-icon');
  closedIcons.forEach(closedIcon => {
    closedIcon.addEventListener('click', async (e) => {
      try {
        const boardId = parseInt(closedIcon.closest('LI').dataset.id);
        const boardSelected = STORE.boards.find(board => board.id === boardId);
        boardSelected.closed = true;
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
      }catch(e) {
        alert(e.message)
      }
    })
  })
}