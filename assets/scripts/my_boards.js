import { Main } from "./main.js";
import { BoardServices } from "./services/board_services.js";
import { STORE } from "./store.js";

export function MyBoards(parentSelector) {
  if(!MyBoards.instance) {
    this.parentSelector = parentSelector
    this.parentElement = document.querySelector(parentSelector)
    this.toString = function() {
      return `
      <div>
        <img src="./assets/images/starred_section.svg" alt="starred_section">
        <h2>Your Starred Boards</h2>
      </div>
      <ul class="js-starred-boards"></ul>
      <div>
        <img src="./assets/images/brackets.svg" alt="brackets">
        <h2>Your Boards</h2>
      </div>
      <ul class="js-boards"></ul>
      <a href="#">Create a new board</a>
      `
    }
    MyBoards.instance = this;
  }
  return MyBoards.instance
}

MyBoards.prototype.render = function() {
  this.parentElement.innerHTML = this;
  this.renderStarredBoards();
  this.renderBoards();
  this.changeStateStarred();
  this.changeStateClosed();
}

MyBoards.prototype.renderStarredBoards = function() {
  const container = this.parentElement.querySelector('.js-starred-boards');
  const starredBoards = STORE.boards.filter(board => board.starred && !board.closed);
  container.innerHTML = starredBoards.map(starredBoard => this.renderStarred(starredBoard)).join('');
}

MyBoards.prototype.renderBoards = function() {
  const container = this.parentElement.querySelector('.js-boards')
  const boards = STORE.boards.filter(board => !board.starred && !board.closed);
  container.innerHTML = boards.map(board => this.renderBoard(board)).join('');
}

MyBoards.prototype.changeStateStarred = function() {
  const stars = this.parentElement.querySelectorAll('.js-toggle-star')
  stars.forEach(star => {
    star.addEventListener('click', async (e) => {
      try {
        const boardId = parseInt(star.closest('LI').dataset.id)
        const boardSelected = STORE.boards.find(board => board.id === boardId);
        boardSelected.starred = !boardSelected.starred
        const boardServices = new BoardServices();
        const data = await boardServices.update(boardSelected.id, boardSelected.starred, boardSelected.closed);
        STORE.boards = STORE.boards.map(board => {
          if(board.id === data.id) {
            return data;
          }
          return board;
        })
        const main = new Main();
        main.render();
      } catch (e) {
        alert(e)
      }
    })
  });
}

MyBoards.prototype.changeStateClosed = function() {
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
        const main = new Main();
        main.render();
      }catch(e) {
        alert(e.message)
      }
    })
  })
}

MyBoards.prototype.renderStarred = function(starredBoard) {
  return `
    <li data-id="${starredBoard.id}" style="background-color:${starredBoard.color}">
      <h3>${starredBoard.name}</h3>
      <div>
        <img class="js-toggle-star" src="./assets/images/starred.svg" alt="starred">
      </div>
    </li>
  `
}

MyBoards.prototype.renderBoard = function(board) {
  return `
  <li data-id="${board.id}" style="background-color:${board.color}">
    <h3>${board.name}</h3>
    <div>
      <img class="js-closed-icon" src="./assets/images/closed.svg" alt="closed">
      <img class="js-toggle-star" src="./assets/images/board_normal.svg" alt="board-normal">
    </div>
  </li>
  `
}