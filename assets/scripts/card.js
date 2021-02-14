import { ModalCard } from "./modal_card.js";
import { CardServices } from "./services/card_services.js";

export function Card(parentSelector, dataList, dataCard) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.dataList = dataList;
  this.dataCard = dataCard;
  this.toString = function() {
    return `
    <li class="js-card-${this.dataCard.cardId} card" draggable="true">
      ${this.dataCard.name}
    </li>`
  }
}

Card.prototype.addEventListeners = function() {
  this.viewModalCard();
}

Card.prototype.viewModalCard = function() {
  const card = this.parentElement.querySelector(`.js-card-${this.dataCard.cardId}`);
  const section = document.querySelector('.js-modal-card');
  card.addEventListener('click', async () => {
    section.style.display = 'flex';
    const cardServices = new CardServices();
    const card = await cardServices.show(this.dataList.listId, this.dataCard.cardId);
    const modalCard = new ModalCard('.js-modal-card', card);
    modalCard.render();
  })
}