import { CurrentBoard } from "./current_board.js";
import { ModalCard } from "./modal_card.js";
import { CardServices } from "./services/card_services.js";
import { STORE } from "./store.js";

export function Card(parentSelector, dataList, dataCard) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.dataList = dataList;
  this.dataCard = dataCard;
  this.toString = function () {
    return `
    <li class="js-card-${this.dataCard.cardId} card" draggable="true">
      ${this.dataCard.name}
    </li>`;
  };
}

Card.prototype.addEventListeners = function () {
  this.viewModalCard();
  this.listenDragEvents();
};

Card.prototype.listenDragEvents = function () {
  const card = this.parentElement.querySelector(
    `.js-card-${this.dataCard.cardId}`
  );
  card.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        cardName: this.dataCard.name,
        cardDesc: this.dataCard.desc,
        cardId: this.dataCard.cardId,
        listId: this.dataList.listId,
      })
    );
  });

  card.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
  });

  card.addEventListener("dragenter", (e) => {
    e.target.classList.add("dashed");
  });

  card.addEventListener("dragleave", (e) => {
    e.target.classList.remove("dashed");
  });

  card.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  card.addEventListener("drop", async (e) => {
    try {
      // Aunque sea repetitivo, selectedList es más declarativo
      const selectedList = STORE.currentBoard.lists.find(
        (list) => list.listId === this.dataList.listId
      );
      let reorderedCards = [...selectedList.cards];
      const draggable = JSON.parse(e.dataTransfer.getData("text"));
      const dropabbleId = this.dataCard.cardId;
      let dragIdx, dropIdx;

      if (selectedList.listId !== draggable.listId) {
        dropIdx = reorderedCards.findIndex(
          (card) => card.cardId === dropabbleId
        );
        dragIdx = dropIdx + 1
      } else {
        dragIdx = reorderedCards.findIndex(
          (card) => card.cardId === draggable.cardId
        );
        dropIdx = reorderedCards.findIndex(
          (card) => card.cardId === dropabbleId
        );
      }
      
      const cardServices = new CardServices();
      const dataDrag = await cardServices.update(
        draggable.listId,
        draggable.cardId,
        draggable.cardName,
        selectedList.listId,
        dropIdx + 1,
        draggable.cardDesc
      );
      const updatedDrag = {
        cardId: dataDrag.id,
        name: dataDrag.name,
        desc: dataDrag.desc,
        pos: dataDrag.pos,
        closed: dataDrag.closed,
        labels: dataDrag.labels,
        checkItems: 0,
        completedCheckItems: 0,
      }

      const dataDrop = await cardServices.update(
        selectedList.listId,
        dropabbleId,
        this.dataCard.name,
        selectedList.listId,
        dragIdx + 1,
        this.dataCard.desc
      )
      const updatedDrop = {
        cardId: dataDrop.id,
        name: dataDrop.name,
        desc: dataDrop.desc,
        pos: dataDrop.pos,
        closed: dataDrop.closed,
        labels: dataDrop.labels,
        checkItems: 0,
        completedCheckItems: 0,
      }

      if(dropIdx === 0 && selectedList.listId !== draggable.listId) {
        reorderedCards = [updatedDrag, ...reorderedCards]
      } else {
        reorderedCards[dragIdx] = updatedDrop;
        reorderedCards[dropIdx] = updatedDrag;
      }

      STORE.currentBoard.lists = STORE.currentBoard.lists.map(list => {
        if(list.listId === draggable.listId && draggable.listId !== selectedList.listId) {
          return {
            ...list,
            cards: list.cards.filter(card => card.cardId !== draggable.cardId)
          }
        }
        if(list.listId === selectedList.listId) {
          return {
            ...list,
            cards: reorderedCards
          };
        }
        return list
      })

      const currentBoard = new CurrentBoard('.js-content');
      currentBoard.render();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  });
};

Card.prototype.viewModalCard = function () {
  const card = this.parentElement.querySelector(
    `.js-card-${this.dataCard.cardId}`
  );
  const section = document.querySelector(".js-modal-card");
  card.addEventListener("click", async () => {
    section.style.display = "flex";
    const cardServices = new CardServices();
    const card = await cardServices.show(
      this.dataList.listId,
      this.dataCard.cardId
    );
    const modalCard = new ModalCard(".js-modal-card", card);
    modalCard.render();
  });
};
