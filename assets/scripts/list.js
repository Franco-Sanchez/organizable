import { Card } from "./card.js";
import { ListServices } from "./services/list_services.js";
import { STORE } from "./store.js";
import { CurrentBoard } from "./current_board.js";

export function List(parentSelector, dataList) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.data = dataList;
  this.toString = function () {
    return `
      <li class="js-list-${this.data.listId} list">
        <header class="list-header">
          <h4>${this.data.name}</h4>
          <img class="js-delete-list-${this.data.listId}" src="./assets/images/delete_list.svg" alt="delete-list">
        </header>
        <ul class="js-cards-${this.data.listId} cards-box"></ul>
      </li>
    `;
  };
}

List.prototype.addEventListeners = function () {
  const cards = this.generateCards(`.js-cards-${this.data.listId}`);
  cards.forEach((card) => {
    card.addEventListeners();
  });
  this.deleteList();
};

List.prototype.generateCards = function (parentSelector) {
  const container = this.parentElement.querySelector(parentSelector);
  const cards = this.data.cards.map((card) => {
    return new Card(parentSelector, card);
  });
  container.innerHTML = cards.join("");
  return cards;
};

List.prototype.deleteList = function () {
  const deleteList = this.parentElement.querySelector(
    `.js-delete-list-${this.data.listId}`
  );
  deleteList.addEventListener("click", async (e) => {
    try {
      const listServices = new ListServices();
      await listServices.delete(
        STORE.currentBoard.id,
        this.data.listId
      );
      STORE.currentBoard.lists = STORE.currentBoard.lists.filter(
        (list) => list.listId !== this.data.listId
      );
      const currentBoard = new CurrentBoard(".js-content");
      currentBoard.render();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  });
};
