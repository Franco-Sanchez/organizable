import { STORE } from "./store.js";

export function MyProfile(parentSelector) {
  if(!MyProfile.instance) {
    this.parentSelector = parentSelector
    this.parentElement = document.querySelector(parentSelector)
    this.toString = function() {
      return `<section>
      <form class="js-form-profile">
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
          <button class="profile--button__delete">Delete</button>
        </div>
      </form>
    </section>`
    }
    MyProfile.instance = this;
  }
  return MyProfile.instance
}

MyProfile.prototype.render = function() {
  this.parentElement.innerHTML = this;
}