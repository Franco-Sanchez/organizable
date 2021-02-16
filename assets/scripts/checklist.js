import { CheckItem } from "./check_item.js";
import { CurrentBoard } from "./current_board.js";
import { ChecklistServices } from "./services/checklist_services.js";
import { CheckItemServices } from './services/check_item_services.js';

export function Checklist(parentSelector, dataCard, dataChecklist) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.dataCard = dataCard;
  this.dataChecklist = dataChecklist;
  this.toString = function () {
    return `
    <li class="js-checklist-${this.dataChecklist.checklistId}">
      <header class="checklist__header">  
        <h6>${this.dataChecklist.name}</h6>
        <a class="js-delete-checklist-${this.dataChecklist.checklistId}" href="#">Delete</a>
      </header>
      <ul class="js-check-items-${this.dataChecklist.checklistId}"></ul>
    </li>
    `;
  };
}

Checklist.prototype.addEventListeners = function () {
  this.deleteChecklist();
  const checkItems = this.generateCheckItems(
    `.js-check-items-${this.dataChecklist.checklistId}`
  );
  checkItems.forEach((checkItem) => {
    checkItem.addEventListeners();
  });
  this.showFormCheckItem();
  this.hideFromCheckItem();
  this.addFormCheckItem();
};

Checklist.prototype.generateCheckItems = function (parentSelector) {
  const container = this.parentElement.querySelector(parentSelector);
  const checkItems = this.dataChecklist.checkItems.map((checkItem) => {
    return new CheckItem(parentSelector, this.dataChecklist, checkItem);
  });
  container.innerHTML = checkItems.join("");
  container.innerHTML += `
  <a class="js-show-form-${this.dataChecklist.checklistId} modal__button-edit">Add Item</a>
  <form class="js-form-create-${this.dataChecklist.checklistId} check-item__form">
    <input type="text" name="name" placeholder="Add check item...">
    <div>
      <button type="submit">Add</button>
      <img class="js-close-form-${this.dataChecklist.checklistId}" src="./assets/images/close_form.svg" alt="close-form">
    </div>
  </form>`;
  return checkItems;
};

Checklist.prototype.deleteChecklist = function () {
  const deleteButton = this.parentElement.querySelector(
    `.js-delete-checklist-${this.dataChecklist.checklistId}`
  );
  const section = document.querySelector(".js-modal-card");
  deleteButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const checklistServices = new ChecklistServices();
      await checklistServices.delete(
        this.dataCard.id,
        this.dataChecklist.checklistId
      );
      // hacer que se renderice el modal
      section.style.display = "none";
      const currentBoard = new CurrentBoard(".js-content");
      currentBoard.render();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  });
};

Checklist.prototype.showFormCheckItem = function () {
  const buttonShow = this.parentElement.querySelector(
    `.js-show-form-${this.dataChecklist.checklistId}`
  );
  const form = this.parentElement.querySelector(
    `.js-form-create-${this.dataChecklist.checklistId}`
  );
  buttonShow.addEventListener("click", () => {
    buttonShow.style.display = "none";
    form.style.display = "block";
  });
};

Checklist.prototype.hideFromCheckItem = function () {
  const buttonShow = this.parentElement.querySelector(
    `.js-show-form-${this.dataChecklist.checklistId}`
  );
  const form = this.parentElement.querySelector(
    `.js-form-create-${this.dataChecklist.checklistId}`
  );
  const closeForm = this.parentElement.querySelector(
    `.js-close-form-${this.dataChecklist.checklistId}`
  );
  closeForm.addEventListener('click', () => {
    buttonShow.style.display = 'inline-block';
    form.style.display = 'none';
  })
};

Checklist.prototype.addFormCheckItem = function () {
  const form = this.parentElement.querySelector(`.js-form-create-${this.dataChecklist.checklistId}`);
  const section = document.querySelector(".js-modal-card");
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const name = form.name.value;
      const checkItemServices = new CheckItemServices()
      await checkItemServices.create(this.dataChecklist.checklistId, name)
      section.style.display = 'none';
      const currentBoard = new CurrentBoard('.js-content');
      currentBoard.render();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  })
}