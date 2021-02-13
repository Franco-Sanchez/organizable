import { CreateBoard } from "./form_create_board.js";
import { SingleBoard } from "./single_board.js";
import { StarredBoard } from "./starred_board.js";
import { STORE } from "./store.js";

export function MyBoards(parentSelector) {
  if(!MyBoards.instance) {
    this.parentSelector = parentSelector
    this.parentElement = document.querySelector(parentSelector)
    this.toString = function() {
      return `
      <div class="boards-title">
        <img src="./assets/images/starred_section.svg" alt="starred_section">
        <h2>Your Starred Boards</h2>
      </div>
      <ul class="js-starred-boards boards-box"></ul>
      <div class="boards-title">
        <img src="./assets/images/brackets.svg" alt="brackets">
        <h2>Your Boards</h2>
      </div>
      <ul class="js-single-boards boards-box"></ul>
      `
    }
    MyBoards.instance = this;
  }
  return MyBoards.instance
}

MyBoards.prototype.render = function() {
  // Esto un error por el singleton, pq al hacer logout elimina 
  // el parentSelector de la primera instancia
  this.parentElement = document.querySelector(this.parentSelector);
  this.parentElement.innerHTML = this;
  const starredBoards = this.generateStarredBoards('.js-starred-boards');
  starredBoards.forEach((starredBoard) => {
    starredBoard.addEventListeners();
  })
  const singleBoards = this.generateSingleBoards('.js-single-boards');
  singleBoards.forEach((singleBoard) => {
    singleBoard.addEventListeners();
  })
  this.viewFormCreate();
}

MyBoards.prototype.generateStarredBoards = function(parentSelector) {
  const container = this.parentElement.querySelector(parentSelector);
  const filterStarredBoards = STORE.boards.filter(board => board.starred && !board.closed);
  const starredBoards = filterStarredBoards.map(starredBoard => {
    return new StarredBoard(parentSelector, starredBoard);
  })
  container.innerHTML = starredBoards.join('');
  return starredBoards;
}

MyBoards.prototype.generateSingleBoards = function(parentSelector) {
  const container = this.parentElement.querySelector(parentSelector);
  const filterSingleBoards = STORE.boards.filter(board => !board.starred && !board.closed);
  const singleBoards = filterSingleBoards.sort((a ,b) => a.createdAt > b.createdAt ? 1 : -1).map(singleBoard => {
    return new SingleBoard(parentSelector, singleBoard);
  })
  container.innerHTML = singleBoards.join('');
  container.innerHTML += `<a class="js-create-board boards-create" href="#">Create a new board</a>`
  return singleBoards;
}

MyBoards.prototype.viewFormCreate = function() {
  const viewCreate = this.parentElement.querySelector('.js-create-board');
  const section = document.querySelector('.js-section-board')
  viewCreate.addEventListener('click', (e) => {
    e.preventDefault();
    section.style.display = 'flex'
    const createBoard = new CreateBoard('.js-section-board');
    createBoard.render();
  })
}