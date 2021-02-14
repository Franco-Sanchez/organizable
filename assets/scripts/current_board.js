import { Main } from "./main.js";
import { BoardServices } from "./services/board_services.js";
import { STORE } from "./store.js";
import { List } from "./list.js";
import { ListServices } from "./services/list_services.js";

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
  const lists = this.generateLists(".js-lists");
  lists.forEach((list) => {
    list.addEventListeners();
  });
  this.changeStateStarred();
  this.changeStateClosed();
  this.openFormList();
  this.closeFormList();
  this.addFormList();
};

CurrentBoard.prototype.generateLists = function (parentSelector) {
  const container = this.parentElement.querySelector(parentSelector);
  const lists = STORE.currentBoard.lists.map((list) => {
    return new List(parentSelector, list);
  });
  container.innerHTML = lists.join("");
  container.innerHTML += `
    <div class="js-open-form list__open-form">
      <img src="./assets/images/open_form.svg" alt="open-form">
      <p>Add a list</p>
    </div>
    <form class="js-create-list list__form">
      <input type="text" placeholder="Enter list title..." name="name" required>
      <div>
        <button type="submit">Add List</button>
        <img class="js-close-form-list" src="./assets/images/close_form.svg" alt="close-form">
      </div>
    </form>`;
  return lists;
};

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
      STORE.currentBoard = null;
      const main = new Main();
      main.render();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  });
};

CurrentBoard.prototype.openFormList = function () {
  const openForm = this.parentElement.querySelector(".js-open-form");
  const form = this.parentElement.querySelector(".js-create-list");
  openForm.addEventListener("click", () => {
    openForm.style.display = "none";
    form.style.display = "block";
  });
};

CurrentBoard.prototype.closeFormList = function () {
  const openForm = this.parentElement.querySelector(".js-open-form");
  const form = this.parentElement.querySelector(".js-create-list");
  const closeForm = this.parentElement.querySelector(".js-close-form-list");
  closeForm.addEventListener("click", () => {
    openForm.style.display = "flex";
    form.style.display = "none";
    form.reset();
  });
};

CurrentBoard.prototype.addFormList = function () {
  const form = this.parentElement.querySelector(".js-create-list");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const name = form.name.value;
      const listServices = new ListServices();
      const data = await listServices.create(STORE.currentBoard.id, name);
      const newList = {
        listId: data.id,
        name: data.name,
        pos: data.pos,
        closed: data.pos,
        cards: [],
      };
      STORE.currentBoard.lists = [...STORE.currentBoard.lists, newList];
      this.render();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  });
};
