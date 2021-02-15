import { CurrentBoard } from "./current_board.js";
import { CardServices } from "./services/card_services.js";
import { STORE } from "./store.js";

export function ModalCard(parentSelector, dataCard) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.data = dataCard;
  this.toString = function () {
    return `
        <div class="modal">
          <header class="js-modal-header">
            <h4>${this.data.name}</h4>
            <img class="js-close-modal modal__close" src="./assets/images/close_form.svg" alt="close-modal">
          </header>
          <form id="edit_form" class="js-form-card-edit modal__form">
            <input type="text" name="name" value="${this.data.name}">
            <img class="js-close-modal modal__close" src="./assets/images/close_form.svg" alt="close-modal">
          </form>
          <section>
            <article>
              <div>
                <h5>LABELS</h5>
                <ul class="js-labels-card-${this.data.id}"></ul>
              </div>
              <div>
                <h5>DESCRIPTION</h5>
                <div class="js-description">
                  <p>${this.data.desc || "Enter a description"}</p>
                  <a class="js-button-edit modal__button-edit" href="#">Edit</a>
                </div>
                <div class="js-description-form modal__form-description">
                  <input form="edit_form" type="text" name="desc" value="${
                    this.data.desc || ""
                  }" placeholder="Add check item...">
                  <div class="modal__form-buttons">
                    <button form="edit_form" type="submit">Save</button>
                    <img class="js-modal-form-close modal__close" src="./assets/images/close_form.svg" alt="close-form">
                  </div>
                </div>
              </div>
              <div class="modal__new-feature">
                <img src="./assets/images/building.svg" alt="building">
                <p>Building a new feature for you</p>
              </div>
            </article>
            <article>
              <div>
                <h6>LABELS</h6>
                <ul class="js-board-labels"></ul>
                <a class="js-modal-create-label modal__create-label" href="#">Create a new label</a>
              </div>
              <a class="js-close-delete-card modal__delete-card" href="#">Delete card</a>
            </article>
          </section>
        </div>
      `;
  };
}

ModalCard.prototype.render = function () {
  this.parentElement.innerHTML = this;
  this.closeModal();
  this.showForm();
  this.deleteCard();
  this.hideForm();
  this.updateCard();
};

ModalCard.prototype.closeModal = function () {
  const buttonsCloseModal = this.parentElement.querySelectorAll(
    ".js-close-modal"
  );
  const section = document.querySelector(".js-modal-card");
  buttonsCloseModal.forEach((button) => {
    button.addEventListener("click", () => {
      section.style.display = "none";
      this.render();
    });
  });
};

ModalCard.prototype.showForm = function () {
  const buttonEdit = this.parentElement.querySelector(".js-button-edit");
  const header = this.parentElement.querySelector(".js-modal-header");
  const form = this.parentElement.querySelector(".js-form-card-edit");
  const description = this.parentElement.querySelector(".js-description");
  const descriptionForm = this.parentElement.querySelector(
    ".js-description-form"
  );
  buttonEdit.addEventListener("click", (e) => {
    e.preventDefault();
    header.style.display = "none";
    description.style.display = "none";
    form.style.display = "flex";
    descriptionForm.style.display = "block";
  });
};

ModalCard.prototype.hideForm = function () {
  const hideForm = this.parentElement.querySelector(".js-modal-form-close");
  const header = this.parentElement.querySelector(".js-modal-header");
  const form = this.parentElement.querySelector(".js-form-card-edit");
  const description = this.parentElement.querySelector(".js-description");
  const descriptionForm = this.parentElement.querySelector(
    ".js-description-form"
  );
  hideForm.addEventListener("click", (e) => {
    e.preventDefault();
    header.style.display = "flex";
    description.style.display = "block";
    form.style.display = "none";
    descriptionForm.style.display = "none";
    form.reset();
  });
};

ModalCard.prototype.updateCard = function () {
  const form = this.parentElement.querySelector(".js-form-card-edit");
  const section = document.querySelector(".js-modal-card");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const name = form.name.value;
      const desc = form.desc.value;
      const cardServices = new CardServices();
      const data = await cardServices.update(
        this.data.listId,
        this.data.id,
        name,
        this.data.listId,
        this.data.pos,
        desc
      );
      const updatedCard = {
        cardId: data.id,
        name: data.name,
        desc: data.desc,
        pos: data.pos,
        closed: data.closed,
        labels: data.labels,
        checkItems: 0,
        completedCheckItems: 0,
      };
      STORE.currentBoard.lists = STORE.currentBoard.lists.map(list => {
        if(list.listId === this.data.listId) {
          return {
            ...list,
            cards: list.cards.map(card => {
              if(card.cardId === updatedCard.cardId) {
                return updatedCard;
              }
              return card;
            })
          }
        }
        return list
      })
      section.style.display = 'none';
      const currentBoard = new CurrentBoard('.js-content');
      currentBoard.render();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  });
};

ModalCard.prototype.deleteCard = function () {
  const deleteCard = this.parentElement.querySelector(".js-close-delete-card");
  const section = document.querySelector(".js-modal-card");
  deleteCard.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const cardServices = new CardServices();
      await cardServices.delete(this.data.listId, this.data.id);
      STORE.currentBoard.lists = STORE.currentBoard.lists.map((list) => {
        if (list.listId === this.data.listId) {
          return {
            ...list,
            cards: list.cards.filter((card) => card.cardId !== this.data.id),
          };
        }
        return list;
      });
      section.style.display = "none";
      const currentBoard = new CurrentBoard(".js-content");
      currentBoard.render();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  });
};