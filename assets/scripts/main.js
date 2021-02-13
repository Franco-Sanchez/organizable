import { SessionServices } from './services/session_services.js';
import { MyBoards } from "./my_boards.js";
import { ClosedBoards } from './closed_boards.js';
import { Login } from './login.js';
import { ViewProfile } from "./view_profile.js";
import { STORE } from './store.js';

export function Main(parentSelector) {
  if(!Main.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function() {
      return `
        <aside>
          <ul class="js-views">
            <li>
              <a class="js-redirect selected" data-value="my_boards" href="#">My boards</a>
            </li>
            <li>
              <a class="js-redirect" data-value="closed_boards" href="#">Closed boards</a>
            </li>
            <li>
              <a class="js-redirect" data-value="my_profile" href="#">My profile</a>
            </li>
            <li>
              <a class="js-redirect" data-value="log_out" href="#">Log out</a>
            </li>
          </ul>
        </aside>
        <section class="js-container"></section>
      `
    }
    Main.instance = this;
  }
  return Main.instance;
}

Main.prototype.render = function() {
  this.parentElement.innerHTML = this;
  const myBoards = new MyBoards('.js-container');
  myBoards.render();
  this.addRedirectListener();
}

Main.prototype.addRedirectListener = function() {
  const container = this.parentElement.querySelector('.js-views')
  container.addEventListener('click', (e) => {
    const triggers = container.querySelectorAll('.js-redirect');
    triggers.forEach(async (trigger) => {
      e.preventDefault();
      if(e.target === trigger) {
        trigger.classList.add('selected')
        switch (trigger.dataset.value) {
          case 'closed_boards':
            const closedBoards = new ClosedBoards('.js-container');
            closedBoards.render();
            break;
          case 'my_profile':
            const viewProfile = new ViewProfile('.js-container');
            viewProfile.render();
            break;
          case 'log_out':
            try {
              const logOut = new SessionServices();
              await logOut.logout();
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('id');
              STORE.user = {};
              STORE.boards = [];
              STORE.currentBoard = null;
              const login = new Login();
              login.render();
            }catch(e) {
              console.log(e);
              alert(e.message);
            }
            break;
          default:
            const myBoards = new MyBoards()
            myBoards.render();
            break;
        }
      } else {
        trigger.classList.remove('selected');
      }
    })
  })
}