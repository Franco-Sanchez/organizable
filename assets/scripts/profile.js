import { UserServices } from "./services/user_services.js";
import { STORE } from "./store.js";
import { SignUp } from './signup.js';

export function MyProfile(parentSelector) {
  if(!MyProfile.instance) {
    this.parentSelector = parentSelector
    this.parentElement = document.querySelector(parentSelector)
    this.edit = false;
    this.toString = function() {
      return `
      ${this.edit ? this.formEdit() : this.renderProfile()}`
      
    }
    MyProfile.instance = this;
  }
  return MyProfile.instance
}

MyProfile.prototype.render = function() {
  this.parentElement.innerHTML = this;
  this.activeEdit();
  this.deleteUser();
  this.addFormEdit();
  this.desactiveEdit();
}

MyProfile.prototype.renderProfile = function() {
  return `<article class="js-form-profile">
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
  </article>`
}

MyProfile.prototype.formEdit = function() {
  return `<form class="js-form-profile">
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
</form>`
} 

MyProfile.prototype.activeEdit = function() {
  const activeEdit = this.parentElement.querySelector('.js-active-edit');
  if(activeEdit) {
    activeEdit.addEventListener('click', ()=> {
      this.edit = true;
      this.render();
    })
  }
}

MyProfile.prototype.deleteUser = function() {
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
        const signUp = new SignUp();
        signUp.render();
      } catch (e) {
        alert(e.message)
      }
    }
    })
  }
}

MyProfile.prototype.addFormEdit = function() {
  const form = this.parentElement.querySelector('.js-form-profile');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const { username, email, first_name, last_name } = form
    try {
      const userServices = new UserServices();
      const data = await userServices.update(STORE.user.id, username.value, email.value, first_name.value, last_name.value);
      STORE.user = data;
      this.edit = false;
      this.render();
    } catch (e) {
      alert(e.message);
    }
  })
}

MyProfile.prototype.desactiveEdit = function() {
  const desactiveEdit = this.parentElement.querySelector('.js-desactive-edit');
  if(desactiveEdit) {
    desactiveEdit.addEventListener('click', () => {
      this.edit = false;
      this.render();
    })
  }
}