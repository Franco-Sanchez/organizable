import { Card } from "./card.js";
import { ListServices } from "./services/list_services.js";
import { STORE } from "./store.js";
import { CurrentBoard } from "./current_board.js";
import { CardServices } from "./services/card_services.js";

export function List(parentSelector, dataList) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.data = dataList;
  this.toString = function () {
    return `
      <li class="js-list-${this.data.listId} list">
        <header class="list-header">
          <h4 class="js-name-list-${this.data.listId}">${this.data.name}</h4>
          <form class="js-form-edit-list-${this.data.listId} lists__form-edit">
            <input type="text" name="name" value="${this.data.name}">
          </form>
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
  this.showFormEditList();
  this.updateList();
  this.deleteList();
  this.openFormCard();
  this.closeFormCard();
  this.addFormCard();
  this.listenDrop();
};

List.prototype.generateCards = function (parentSelector) {
  const container = this.parentElement.querySelector(parentSelector);
  const cards = this.data.cards.map((card) => {
    return new Card(parentSelector, this.data, card);
  });
  container.innerHTML = cards.join("");
  container.innerHTML += `
    <div class="js-open-form-card-${this.data.listId} card__open-form">
      <img src="./assets/images/open_form_card.svg" alt="open-form-card">
      <p>Add another card</p>
    </div>
    <form class="js-create-card-${this.data.listId} list__form">
      <input type="text" placeholder="Enter a title for this card..." name="name" required>
      <div>
        <button type="submit">Add Card</button>
        <img class="js-close-form-card-${this.data.listId}" src="./assets/images/close_form.svg" alt="close-form">
      </div>
    </form>
  `;
  return cards;
};

List.prototype.showFormEditList = function() {
  const name = this.parentElement.querySelector(`.js-name-list-${this.data.listId}`);
  const form = this.parentElement.querySelector(`.js-form-edit-list-${this.data.listId}`);
  name.addEventListener('click', () => {
    name.style.display = 'none';
    form.style.display = 'block';
  }) 
}

List.prototype.updateList = function() {
  const form = this.parentElement.querySelector(`.js-form-edit-list-${this.data.listId}`);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const name = form.name.value
      const listServices = new ListServices();
      const data = await listServices.update(STORE.currentBoard.id, this.data.listId, name)
      STORE.currentBoard.lists = STORE.currentBoard.lists.map(list => {
        if(list.listId === data.id) {
          return {
            listId: data.id,
            name: data.name,
            pos: data.pos,
            closed: data.closed,
            cards: list.cards
          }
        }
        return list
      })
      const currentBoard = new CurrentBoard('.js-content')
      currentBoard.render();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  })
}

List.prototype.deleteList = function () {
  const deleteList = this.parentElement.querySelector(
    `.js-delete-list-${this.data.listId}`
  );
  deleteList.addEventListener("click", async (e) => {
    try {
      const listServices = new ListServices();
      await listServices.delete(STORE.currentBoard.id, this.data.listId);
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

List.prototype.openFormCard = function () {
  const openForm = this.parentElement.querySelector(
    `.js-open-form-card-${this.data.listId}`
  );
  const form = this.parentElement.querySelector(
    `.js-create-card-${this.data.listId}`
  );
  openForm.addEventListener("click", () => {
    openForm.style.display = "none";
    form.style.display = "block";
  });
};

List.prototype.closeFormCard = function () {
  const openForm = this.parentElement.querySelector(
    `.js-open-form-card-${this.data.listId}`
  );
  const form = this.parentElement.querySelector(
    `.js-create-card-${this.data.listId}`
  );
  const closeForm = this.parentElement.querySelector(
    `.js-close-form-card-${this.data.listId}`
  );
  closeForm.addEventListener("click", () => {
    openForm.style.display = "flex";
    form.style.display = "none";
    form.reset();
  });
};

List.prototype.addFormCard = function () {
  const form = this.parentElement.querySelector(
    `.js-create-card-${this.data.listId}`
  );
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const name = form.name.value;
      const cardServices = new CardServices();
      const data = await cardServices.create(this.data.listId, name, null);
      const newCard = {
        cardId: data.id,
        name: data.name,
        desc: data.desc,
        pos: data.pos,
        closed: data.closed,
        labels: data.labels,
        checkItems: 0,
        completedCheckItems: 0
      };
      STORE.currentBoard.lists = STORE.currentBoard.lists.map(list => {
        if(list.listId === this.data.listId) {
          return { ...list, cards: [...list.cards, newCard] }
        }
        return list;
      })
      const currentBoard = new CurrentBoard('.js-content')
      currentBoard.render();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  });
};

List.prototype.listenDrop = function() {
  const container = this.parentElement.querySelector(`.js-list-${this.data.listId}`);
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
  })
  container.addEventListener('drop', async (e) => {
    try {
      const draggable = JSON.parse(e.dataTransfer.getData('text'));
      const selectedListId = this.data.listId;
      const cardServices = new CardServices();
      const data = await cardServices.update(
        draggable.listId,
        draggable.cardId,
        draggable.cardName,
        selectedListId,
        1,
        draggable.cardDesc
      );
      const updatedCard = {
        cardId: data.id,
        name: data.name,
        desc: data.desc,
        pos: data.pos,
        closed: data.closed,
        labels: data.labels,
        checkItems: draggable.cardCheckItems,
        completedCheckItems: draggable.cardCompletedCheckItems
      }
      STORE.currentBoard.lists = STORE.currentBoard.lists.map(list => {
        if(list.listId === selectedListId) {
          return {
            ...list,
            cards: [updatedCard, ...list.cards]
          }
        }
        if(list.listId === draggable.listId) {
          return {
            ...list,
            cards: list.cards.filter(card => card.cardId !== draggable.cardId)
          }
        }
        return list;
      })
      const currentBoard = new CurrentBoard('.js-content');
      currentBoard.render();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  })
}