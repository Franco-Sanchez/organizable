import { Main } from './main.js';
import { BoardServices } from "./services/board_services.js";
import { STORE } from "./store.js";
import { List } from './list.js';

export function CurrentBoard(parentSelector) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.toString = function () {
    return `
      <section class="js-container-current-board current-board" style="background-color:${
        STORE.currentBoard.color
      }">
        <article>
          <h3>${STORE.currentBoard.name}</h3>
          <div class="js-star-${STORE.currentBoard.id}">${
            STORE.currentBoard.starred
              ? `<img src="./assets/images/starred.svg" alt="star">`
              : `<img src="./assets/images/board_normal.svg" alt="star">`
            }
          </div>
          <div class="js-current-closed-${STORE.currentBoard.id}">
            <img src="./assets/images/closed.svg" alt="star">
          </div>
        </article>
        <ul class="js-lists lists-box"></ul>
      </section>
    `;
  };
}

CurrentBoard.prototype.render = function () {
  this.parentElement.innerHTML = this;
  const lists = this.generateLists('.js-lists')
  lists.forEach(list => {
    list.addEventListeners();
  });
  this.changeStateStarred();
  this.changeStateClosed();
};

CurrentBoard.prototype.generateLists = function (parentSelector) {
  const container = this.parentElement.querySelector(parentSelector);
  const lists = STORE.currentBoard.lists.map(list => {
    return new List(parentSelector, list)
  })
  container.innerHTML = lists.join('');
  return lists
}

CurrentBoard.prototype.changeStateStarred = function () {
  const star = this.parentElement.querySelector(
    `.js-star-${STORE.currentBoard.id}`
  );
  star.addEventListener("click", async (e) => {
    try {
      const boardServices = new BoardServices();
      STORE.currentBoard = await boardServices.update(
        STORE.currentBoard.id,
        !STORE.currentBoard.starred,
        STORE.currentBoard.closed
      );
      STORE.boards = STORE.boards.map((board) => {
        if (board.id === STORE.currentBoard.id) {
          return STORE.currentBoard;
        }
        return board;
      });
      this.render();
    } catch (e) {
      console.log(e);
      alert(e);
    }
  });
};

CurrentBoard.prototype.changeStateClosed = function () {
  const closed = this.parentElement.querySelector(
    `.js-current-closed-${STORE.currentBoard.id}`
  );
  closed.addEventListener("click", async (e) => {
    try {
      const boardServices = new BoardServices();
      STORE.currentBoard = await boardServices.update(
        STORE.currentBoard.id,
        STORE.currentBoard.starred,
        true
      );
      STORE.boards = STORE.boards.map((board) => {
        if (board.id === STORE.currentBoard.id) {
          return STORE.currentBoard;
        }
        return board;
      });
      STORE.currentBoard = null
      const main = new Main();
      main.render();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  });
};