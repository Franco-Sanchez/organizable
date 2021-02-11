// import { BoardServices } from "./assets/scripts/services/board_services.js.js";
// import { UserServices } from "./assets/scripts/services/user_services.js.js";
// import { SignUp } from "./assets/scripts/signup.js";
// import { STORE } from './assets/scripts/store.js';

// function init() {
//   const signUp = new SignUp('.js-content');
//   signUp.render();
// }

// init()

// async function init() {
//   const login = new Login('.js-content')
//   if (sessionStorage.getItem('token')) {
//       try {
//         const userServices = new UserServices();
//         const boardServices = new BoardServices();
//         STORE.user = await userServices.show(); // falta pasar el id
//         STORE.boards = await boardServices.boards();
//         console.log('Acceso habilitado')
//       } catch (e) {
//         if (e.message === 'Access denied') {
//           sessionStorage.removeItem('token');
//           login.render();
//         }
//       }
//   } else {
//     login.render();
//   } 
// }

// init();
