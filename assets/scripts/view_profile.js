import { EditProfile } from './edit_profile.js';
import { STORE } from './store.js';
import { UserServices } from './services/user_services.js'
import { Login } from './login.js';

export function ViewProfile(parentSelector) {
  if(!ViewProfile.instance) {
    this.parentSelector = parentSelector
    this.parentElement = document.querySelector(parentSelector)
    this.toString = function() {
      return `
      <article class="js-form-profile">
      <div>
        <label for="username">Username</label><br />
        <p>${STORE.user.username}</p>
      </div>
      <div>
        <label for="email">Email</label><br />
        <p>${STORE.user.email}</p>
      </div>
      <div>
        <label for="first_name">First Name</label><br />
        <p>${STORE.user.firstName}</p>
      </div>
      <div>
        <label for="last_name">Last Name</label><br />
        <p>${STORE.user.lastName}</p>
      </div>
      <div class = "profile-button"> <br> 
        <button class="js-active-edit profile--button__edit">Edit</button>
        <button class="js-delete-user profile--button__delete">Delete</button>
      </div>
    </article>
      `
    }
    ViewProfile.instance = this;
  }
  return ViewProfile.instance;
}

ViewProfile.prototype.render = function() {
  this.parentElement = document.querySelector(this.parentSelector);
  this.parentElement.innerHTML = this;
  this.activeEdit();
  this.deleteUser();
}

ViewProfile.prototype.activeEdit = function(edit) {
  const activeEdit = this.parentElement.querySelector('.js-active-edit');
  if(activeEdit) {
    activeEdit.addEventListener('click', ()=> {
      const editProfile = new EditProfile('.js-container');
      editProfile.render();
    })
  }
}

ViewProfile.prototype.deleteUser = function() {
  const deleteUser = this.parentElement.querySelector('.js-delete-user');
  if(deleteUser) {
    deleteUser.addEventListener('click', async e => {
      const response = confirm('Are you sure?');
    if(response) {
      try {
        const userServices = new UserServices();
        await userServices.delete(sessionStorage.getItem('id'));
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('id');
        STORE.user = {};
        STORE.boards = [];
        STORE.currentBoard = null;
        const login = new Login();
        login.render();
      } catch (e) {
        alert(e.message)
      }
    }
    })
  }
}