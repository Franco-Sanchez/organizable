import { CheckItemServices } from "./services/check_item_services.js";

export function CheckItem(parentSelector, dataChecklist) {
  this.parentSelector = parentSelector;
  this.parentElement = document.querySelector(parentSelector);
  this.dataChecklist = dataChecklist;
  this.toString = function () {
    return `
    <ul class="js-check-items-${this.dataChecklist.checklistId}"></ul>`;
  };
}

CheckItem.prototype.render = function() {
  this.parentElement.innerHTML = this;
  this.renderCheckItems();
  this.renderToggleForm();
  this.showFormCheckItem();
  this.hideFromCheckItem();
  this.addFormCheckItem();
  this.getInput();
}

CheckItem.prototype.renderCheckItems = function() {
  const container = this.parentElement.querySelector(`.js-check-items-${this.dataChecklist.checklistId}`);
  container.innerHTML = this.dataChecklist.checkItems.map(checkItem => this.renderCheckItem(checkItem)).join('');
}

CheckItem.prototype.renderCheckItem = function(checkItem) {
  return `
  <li data-checkitemId="${checkItem.checkItemId}" class="js-check-items check-item">
  ${
    checkItem.completed
      ? `<input class="js-checked-item-${checkItem.checkItemId}" type="checkbox" checked>`
      : `<input class="js-checked-item-${checkItem.checkItemId}" type="checkbox">`
  }
  ${checkItem.name}
</li>`
}

CheckItem.prototype.renderToggleForm = function() {
  const container = this.parentElement.querySelector(`.js-check-items-${this.dataChecklist.checklistId}`);
  container.innerHTML +=
  `<a class="js-show-form-${this.dataChecklist.checklistId} modal__button-edit">Add Item</a>
  <form class="js-form-create-${this.dataChecklist.checklistId} check-item__form">
    <input type="text" name="name" placeholder="Add check item...">
    <div>
      <button type="submit">Add</button>
      <img class="js-close-form-${this.dataChecklist.checklistId}" src="./assets/images/close_form.svg" alt="close-form">
    </div>
  </form>`
}

CheckItem.prototype.showFormCheckItem = function () {
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

CheckItem.prototype.hideFromCheckItem = function () {
  const buttonShow = this.parentElement.querySelector(
    `.js-show-form-${this.dataChecklist.checklistId}`
  );
  const form = this.parentElement.querySelector(
    `.js-form-create-${this.dataChecklist.checklistId}`
  );
  const closeForm = this.parentElement.querySelector(
    `.js-close-form-${this.dataChecklist.checklistId}`
  );
  closeForm.addEventListener("click", () => {
    buttonShow.style.display = "inline-block";
    form.style.display = "none";
  });
};

CheckItem.prototype.addFormCheckItem = function () {
  const form = this.parentElement.querySelector(
    `.js-form-create-${this.dataChecklist.checklistId}`
  );
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const name = form.name.value;
      const checkItemServices = new CheckItemServices();
      const data = await checkItemServices.create(this.dataChecklist.checklistId, name);
      const newCheckItem = {
        checkItemId: data.id,
        name: data.name,
        pos: data.pos,
        completed: data.completed
      }
      this.dataChecklist.checkItems = [...this.dataChecklist.checkItems, newCheckItem]
      this.render();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  });
};

CheckItem.prototype.getInput = function() {
  const checkItems = this.parentElement.querySelectorAll('.js-check-items');
  checkItems.forEach(checkItem => {
    this.updateItem(checkItem)
  })
}

CheckItem.prototype.updateItem = function (checkItem) {
  const checkItemId = parseInt(checkItem.dataset.checkitemid);
  const input = this.parentElement.querySelector(
    `.js-checked-item-${checkItemId}`
  );
  input.addEventListener("click", async (e) => {
    try {
      const checkItemServices = new CheckItemServices();
      const data = await checkItemServices.update(
        this.dataChecklist.checklistId,
        checkItemId,
        e.target.checked
      );
      console.log(data);
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  });
};