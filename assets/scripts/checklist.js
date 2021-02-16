import { CheckItem } from "./check_item.js";
import { ChecklistServices } from "./services/checklist_services.js";

export function Checklist(parentSelector, dataCard) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.dataCard = dataCard;
  this.toString = function () {
    return `
    <ul class="js-checklists-card-${this.dataCard.id}"></ul>`;
  };
}

Checklist.prototype.render = function () {
  this.parentElement.innerHTML = this;
  this.renderChecklists();
  this.deleteChecklist();
  this.generateCheckItems();
};

Checklist.prototype.renderChecklists = function () {
  const container = this.parentElement.querySelector(
    `.js-checklists-card-${this.dataCard.id}`
  );
  container.innerHTML = this.dataCard.checklists
    .map((checklist) => this.renderChecklist(checklist))
    .join("");
};

Checklist.prototype.renderChecklist = function (checklist) {
  return `
  <li data-checklistId="${checklist.checklistId}" class="js-checklists">
    <header class="checklist__header">  
      <h6>${checklist.name}</h6>
      <a class="js-delete-checklist" href="#">Delete</a>
    </header>
    <div class="js-container-check-items-${checklist.checklistId}"></div>
  </li>
  `;
};

Checklist.prototype.generateCheckItems = function() {
  const checklists = this.parentElement.querySelectorAll('.js-checklists');
  checklists.forEach(checklist => {
    this.generateCheckItem(checklist);
  })
}

Checklist.prototype.generateCheckItem = function(checklist) {
  const checklistId = parseInt(checklist.dataset.checklistid);
  const dataChecklist = this.dataCard.checklists.find(checklist => checklist.checklistId === checklistId)
  const checkItem = new CheckItem(`.js-container-check-items-${checklistId}`, dataChecklist)
  checkItem.render();
}

Checklist.prototype.deleteChecklist = function () {
  const deleteButtons = this.parentElement.querySelectorAll(
    ".js-delete-checklist"
  );
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", async (e) => {
      if (e.target === deleteButton) e.preventDefault();
      try {
        const checklistId = parseInt(
          deleteButton.closest(".js-checklists").dataset.checklistid
        );
        const checklistServices = new ChecklistServices();
        await checklistServices.delete(this.dataCard.id, checklistId);
        this.dataCard.checklists = this.dataCard.checklists.filter(
          (checklist) => checklist.checklistId !== checklistId
        );
        this.render();
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    });
  });
};