import { Main } from "./main.js";
import { BoardServices } from "./services/board_services.js";
import { STORE } from "./store.js";

export function CreateBoard(parentSelector) {
  if(!CreateBoard.instance) {
    this.parentSelector = parentSelector
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function() {
      return `
        <form class="js-form-create">
          <div class="js-create-box create-board__box">
            <input class="create-board__input" type="text" name="name" placeholder="Board title" required>
            <img class="js-close" src="./assets/images/cancel_create_board.svg" alt="cancel-form">
          </div>
          <div class="create-board__box-colors">
            <a data-color="blue" class="js-color create-board__color blue" href="#"></a>
            <a data-color="red" class="js-color create-board__color red" href="#"></a>
            <a data-color="pink" class="js-color create-board__color pink" href="#"></a>
            <a data-color="lime" class="js-color create-board__color lime" href="#"></a>
            <a data-color="skyblue" class="js-color create-board__color skyblue" href="#"></a>
            <a data-color="yellow" class="js-color create-board__color yellow" href="#"></a>
            <a data-color="green" class="js-color create-board__color green" href="#"></a>
            <a data-color="grey" class="js-color create-board__color grey" href="#"></a>
            <a data-color="purple" class="js-color create-board__color purple" href="#"></a>
          </div>
          <button class="create-board__button" type="submit">Create Board</button>
        </form>
      `
    }
    CreateBoard.instance = this;
  }
  return CreateBoard.instance
}

CreateBoard.prototype.render = function() {
  this.parentElement.innerHTML = this;
  this.closeForm();
  this.changeColorForm();
  this.addFormBoard();
}

CreateBoard.prototype.closeForm = function() {
  const close = this.parentElement.querySelector('.js-close');
  const section = document.querySelector('.js-section-board')
  close.addEventListener('click', (e) => {
    section.style.display = 'none';
  })
}

CreateBoard.prototype.changeColorForm = function() {
  const boxForm = this.parentElement.querySelector('.js-create-box');
  const colors = this.parentElement.querySelectorAll('.js-color');
  colors.forEach(color => {
    color.addEventListener('click', (e) => {
      if(e.target === color) {
        e.preventDefault();
        const colorSelected = color.dataset.color;
        boxForm.style.backgroundColor = colorSelected;
      }
    })
  })
}

CreateBoard.prototype.addFormBoard = function() {
  const form = this.parentElement.querySelector('.js-form-create');
  const boxCreate = this.parentElement.querySelector('.js-create-box')
  const section = document.querySelector('.js-section-board')
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const name = form.name.value;
      const boardServices = new BoardServices()
      const data = await boardServices.create(name, boxCreate.style.backgroundColor || "blue");
      STORE.boards = [...STORE.boards, data]
      section.style.display = 'none';
      const main = new Main();
      main.render();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  })
}