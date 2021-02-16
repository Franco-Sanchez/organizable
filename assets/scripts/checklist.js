import { CurrentBoard } from "./current_board.js";
import { ChecklistServices } from "./services/checklist_services.js";

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
};

Checklist.prototype.deleteChecklist = function () {
  const deleteButton = this.parentElement.querySelector(
    `.js-delete-checklist-${this.dataChecklist.checklistId}`);
  const section = document.querySelector('.js-modal-card');
  deleteButton.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const checklistServices = new ChecklistServices();
      await checklistServices.delete(this.dataCard.id, this.dataChecklist.checklistId);
      section.style.display = 'none';
      const currentBoard = new CurrentBoard('.js-content');
      currentBoard.render();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  })
};
