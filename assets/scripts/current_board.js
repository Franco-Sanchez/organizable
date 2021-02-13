import { BoardServices } from "./services/board_services.js";
import { STORE } from "./store.js";

export function CurrentBoard(parentSelector) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.toString = function () {
    return `
      <section class="js-container-current-board current-board" style="background-color:${
        STORE.currentBoard.color
      }">
        <h3>${STORE.currentBoard.name}</h3>
        <div>
          ${
            STORE.currentBoard.starred
              ? `<img class="js-star-${STORE.currentBoard.id}" src="./assets/images/starred.svg" alt="star"`
              : `<img class="js-star-${STORE.currentBoard.id}" src="./assets/images/board_normal.svg" alt="star">`
          }
        </div>
        <div>
          <img class="js-current-closed-${
            STORE.currentBoard.id
          }" src="./assets/images/closed.svg" alt="star">
        </div>
        <ul class="js-lists"></ul>
      </section>
    `;
  };
}

CurrentBoard.prototype.render = function () {
  this.parentElement.innerHTML = this;
  this.changeStateStarred();
  this.changeStateClosed();
};

CurrentBoard.prototype.changeStateStarred = function () {
  const star = this.parentElement.querySelector(`.js-star-${STORE.currentBoard.id}`);
  star.addEventListener("click", async (e) => {
    try {
      const boardServices = new BoardServices();
      STORE.currentBoard = await boardServices.update(
        STORE.currentBoard.id,
        !STORE.currentBoard.starred,
        STORE.currentBoard.closed
      );
      STORE.boards = STORE.boards.map(board => {
        if(board.id === STORE.currentBoard.id) {
          return STORE.currentBoard;
        }
        return board;
      })
      this.render();
    } catch (e) {
      console.log(e);
      alert(e);
    }
  });
};

CurrentBoard.prototype.changeStateClosed = function () {
  const closed = this.parentElement.querySelector(`.js-current-closed-${STORE.currentBoard.id}`)
  closed.addEventListener('click', async (e) => {
    try {
      const boardServices = new BoardServices();
      STORE.currentBoard = await boardServices.update(
        STORE.currentBoard.id,
        STORE.currentBoard.starred,
        !STORE.currentBoard.closed
      );
      STORE.boards = STORE.boards.map(board => {
        if(board.id === STORE.currentBoard.id) {
          return STORE.currentBoard;
        }
        return board;
      })
      this.render();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  })
}