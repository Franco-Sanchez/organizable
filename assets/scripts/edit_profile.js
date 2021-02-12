import { ViewProfile } from "./view_profile.js";
import { STORE } from './store.js';
import { UserServices } from './services/user_services.js';

export function EditProfile(parentSelector) {
  if(!EditProfile.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function() {
      return `
      <form class="js-form-profile">
      <div>
        <label for="username">Username</label><br />
        <input type="text" id="username" name="username" value="${STORE.user.username}">
      </div>
      <div>
        <label for="email">Email</label><br />
        <input type="email" id="email" name="email" value="${STORE.user.email}">
      </div>
      <div>
        <label for="first_name">First Name</label><br />
        <input type="text" id="first_name" name="first_name" value="${STORE.user.firstName}">
      </div>
      <div>
        <label for="last_name">Last Name</label><br />
        <input type="text" id="last_name" name="last_name" value="${STORE.user.lastName}">
      </div>
      <div class = "profile-button"> <br> 
        <button class="profile--button__delete" type="submit">Save</button>
        <button class="js-desactive-edit profile--button__delete" type="button">Cancel</button>
      </div>
    </form>
      `
    }
    EditProfile.instance = this;
  }
  return EditProfile.instance;
}

EditProfile.prototype.render = function() {
  this.parentElement.innerHTML = this;
  this.desactiveEdit();
  this.addFormEdit();
}

EditProfile.prototype.desactiveEdit = function() {
  const desactiveEdit = this.parentElement.querySelector('.js-desactive-edit');
  if(desactiveEdit) {
    desactiveEdit.addEventListener('click', () => {
      const viewProfile = new ViewProfile();
      viewProfile.render();
    })
  }
}

EditProfile.prototype.addFormEdit = function() {
  const form = this.parentElement.querySelector('.js-form-profile');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const { username, email, first_name, last_name } = form
    try {
      const userServices = new UserServices();
      const data = await userServices.update(STORE.user.id, username.value, email.value, first_name.value, last_name.value);
      STORE.user = data;
      const viewProfile = new ViewProfile();
      viewProfile.render();
    } catch (e) {
      alert(e.message);
    }
  })
}