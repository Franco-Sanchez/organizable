import { Main } from "./main.js";
import { Login } from "./login.js";
import { UserServices } from "./services/user_services.js";
import { STORE } from "./store.js";

export function SignUp(parentSelector) {
  if (!SignUp.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function () {
      return `
      <section class="form">
      <form class="js-form-signup">
        <div>
          <label for="username">Username</label><br />
          <input type="text" name="username" id="username">
        </div>
        <div>
          <label for="password">Password</label><br />
          <input type="password" name="password" id="password">
        </div>
        <div>
          <label for="email">Email</label><br />
          <input type="email" name="email" id="email">
        </div>
        <div>
          <label for="first_name">First Name</label><br />
          <input type="text" name="first_name" id="first_name">
        </div>
        <div>
          <label for="last_name">Last Name</label><br />
          <input type="text" name="last_name" id="last_name">
        </div>
        <div> 
          <button type="submit">Create!</button>
        </div>
        <a class="js-login-view" href="#">or login with existing user</a>
      </form>
    </section>`
    };
    SignUp.instance = this;
  }
  return SignUp.instance;
}

SignUp.prototype.render = function () {
  this.parentElement.innerHTML = this;
  this.addListenerFormSubmit();
  this.addListenerLoginView();
};

SignUp.prototype.addListenerFormSubmit = function () {
  const form = this.parentElement.querySelector(".js-form-signup");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const { username, password, email, first_name, last_name } = form;
    try {
      const userServices = new UserServices();
      const data = await userServices.create(
        username.value,
        password.value,
        email.value,
        first_name.value,
        last_name.value
      );
      if (data.token) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('id', data.id);
        STORE.user = data;
        const main = new Main();
        main.render();
      }
    } catch (e) {
      alert(e);
    }
  });
};

SignUp.prototype.addListenerLoginView = function () {
  const changeLogin = this.parentElement.querySelector(".js-login-view");
  changeLogin.addEventListener("click", (e) => {
    e.preventDefault();
    const login = new Login();
    login.render();
  });
};
