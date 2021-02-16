import { CheckItemServices } from "./services/check_item_services.js";

export function CheckItem(parentSelector, dataChecklist, dataCheckItem) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.dataChecklist = dataChecklist;
  this.dataCheckItem = dataCheckItem;
  this.toString = function () {
    return `
      <li class="js-check-item-${this.dataCheckItem.checkItemId} check-item">
        ${
          this.dataCheckItem.completed
            ? `<input class="js-checked-item-${this.dataCheckItem.checkItemId}" type="checkbox" checked>`
            : `<input class="js-checked-item-${this.dataCheckItem.checkItemId}" type="checkbox">`
        }
        ${this.dataCheckItem.name}
      </li>
      `;
  };
}

CheckItem.prototype.addEventListeners = function () {
  this.updateItem();
};

CheckItem.prototype.updateItem = function () {
  const input = this.parentElement.querySelector(
    `.js-checked-item-${this.dataCheckItem.checkItemId}`
  );
  input.addEventListener("click", async (e) => {
    try {
      const checkItemServices = new CheckItemServices();
      await checkItemServices.update(
        this.dataChecklist.checklistId,
        this.dataCheckItem.checkItemId,
        e.target.checked
      );
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  });
};
