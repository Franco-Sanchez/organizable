import { SessionServices } from "./services/session_services.js";
import { SignUp } from "./signup.js";

export function Login(parentSelector) {
  if (!Login.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function () {
      return `
        <form class="js-form-login">
          <div>
            <label for="username">Username</label><br />
            <input type="text" name="username" id="username">
          </div>
          <div>
            <label for="password">Password</label><br />
            <input type="password" name="password" id="password">
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
          <a class="js-signup-view" href="#">Create an Account</a>
        </form>
      `;
    };
    Login.instance = this;
  }
  return Login.instance;
}

Login.prototype.render = function () {
  this.parentElement.innerHTML = this;
  this.addListenerFormSubmit();
  this.addListenerSignUpView();
};

Login.prototype.addListenerFormSubmit = function () {
  const form = this.parentElement.querySelector(".js-form-login");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const { username, password } = form;
    try {
      const sessionServices = new SessionServices();
      const data = await sessionServices.login(username.value, password.value);
      if (data.token) {
        sessionStorage.setItem("token", data.token);
        console.log(data);
      }
    } catch (e) {
      alert(e.message);
    }
  });
};

Login.prototype.addListenerSignUpView = function () {
  const changeSignUp = this.parentElement.querySelector(".js-signup-view");
  changeSignUp.addEventListener("click", (e) => {
    e.preventDefault();
    const signUp = new SignUp();
    signUp.render();
  });
};
