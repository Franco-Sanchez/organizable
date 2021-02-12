import { UserServices } from "./services/user_services.js";
import { STORE } from "./store.js";
import { SignUp } from './signup.js';

export function MyProfile(parentSelector) {
  if(!MyProfile.instance) {
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
          <button class="profile--button__edit">Edit</button>
          <button class="js-delete-user profile--button__delete">Delete</button>
        </div>
      </article>`
    }
    MyProfile.instance = this;
  }
  return MyProfile.instance
}

MyProfile.prototype.render = function() {
  this.parentElement.innerHTML = this;
  this.deleteUser();
}

MyProfile.prototype.deleteUser = function() {
  const deleteUser = this.parentElement.querySelector('.js-delete-user');
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