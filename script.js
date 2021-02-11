// import { BoardServices } from "./assets/scripts/services/board_services.js";
import { Layout } from "./assets/scripts/layout.js";
import { UserServices } from "./assets/scripts/services/user_services.js";
import { SignUp } from "./assets/scripts/signup.js";
import { STORE } from './assets/scripts/store.js';

async function init() {
  const signUp = new SignUp('.js-content');
  const layout = new Layout('.js-content');
  if (sessionStorage.getItem('token')) {
      try {
        const userServices = new UserServices();
        // const boardServices = new BoardServices();
        STORE.user = await userServices.show(sessionStorage.getItem('id'));
        // STORE.boards = await boardServices.boards();
        layout.render();
      } catch (e) {
        if (e.message === 'Access denied') {
          sessionStorage.removeItem('token');
          signUp.render();
        }
      }
  } else {
    signUp.render();
  } 
}

init();
