import { ModalCard } from "./modal_card.js";
import { CardServices } from './services/card_services.js';

export function Card(parentSelector, dataCard) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.data = dataCard;
  this.toString = function() {
    return `
    <li class="js-card-${this.data.cardId} card" draggable="true">
      ${this.data.name}
    </li>`
  }
}

Card.prototype.addEventListeners = function() {
  this.viewModalCard();
}

Card.prototype.viewModalCard = function() {
  const card = this.parentElement.querySelector(`.js-card-${this.data.cardId}`);
  const section = document.querySelector('.js-modal-card');
  card.addEventListener('click', () => {
    section.style.display = 'flex';
    const modalCard = new ModalCard('.js-modal-card', this.data);
    modalCard.render();
  })
}