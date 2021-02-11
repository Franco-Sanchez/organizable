import { SessionServices } from './services/session_services.js';
// import { SignUp } from './signup.js';
import { MyBoards } from "./my_boards.js";
import { ClosedBoards } from './closed_boards.js';
import { MyProfile } from "./profile.js";

export function Main(parentSelector) {
  if(!Main.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function() {
      return `
        <aside>
          <ul>
            <li>
              <a class="js-redirect" data-value="my_boards" href="#">My boards</a>
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
  this.renderMyBoards();
  this.addRedirectListener();
}

Main.prototype.addRedirectListener = function() {
  const triggers = this.parentElement.querySelectorAll('.js-redirect');
  const container = this.parentElement.querySelector('.js-container');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', async (e) => {
      e.preventDefault();
      switch (trigger.dataset.value) {
        case 'closed_boards':
          const closedBoards = new ClosedBoards('.js-container');
          closedBoards.render();
          break;
        case 'my_profile':
          const myProfile = new MyProfile('.js-container');
          myProfile.render();
          break;
        case 'log_out':
          try {
            const logOut = new SessionServices();
            await logOut.logout();
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('id');
            const signUp = new SignUp();
            signUp.render();
          }catch(e) {
            alert(e.message)
          }
          break;
        default:
          const myBoards = new MyBoards()
          myBoards.render();
          break;
      }
    })
  });
}

Main.prototype.renderMyBoards = function() {
  const myBoards = new MyBoards('.js-container');
  myBoards.render();
}