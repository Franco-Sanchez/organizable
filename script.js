import { BoardServices } from "./assets/scripts/services/board_services.js";
import { UserServices } from "./assets/scripts/services/user_services.js";
import { Login } from "./assets/scripts/login.js";
import { STORE } from './assets/scripts/store.js';
import { Main } from "./assets/scripts/main.js";

function returnHome() {
    const header = document.querySelector('.js-logo');
    header.addEventListener('click', () => {
      if(sessionStorage.getItem('token')) {
        STORE.currentBoard = null;
        const main = new Main();
        main.render();
      }
    })
}

async function init() {
  const login = new Login('.js-content');
  const main = new Main('.js-content');
  if (sessionStorage.getItem('token')) {
      try {
        const userServices = new UserServices();
        const boardServices = new BoardServices();
        STORE.user = await userServices.show(sessionStorage.getItem('id'));
        STORE.boards = await boardServices.boards();
        STORE.currentBoard = null;
        main.render();
      } catch (e) {
        if (e.message === 'Access denied') {
          sessionStorage.removeItem('token');
          login.render();
        }
      }
  } else {
    login.render();
  }
  returnHome();
}

init();
