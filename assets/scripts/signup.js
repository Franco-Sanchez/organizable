import { Layout } from "./layout.js";
import { Login } from "./login.js";
import { UserServices } from "./services/user_services.js";

export function SignUp(parentSelector) {
  if (!SignUp.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function () {
      return `
      <section>
      <form class="js-form-profile">
        <div>
          <label for="username">Username</label><br />
          <p>prueba</p>
        </div>
        <div>
          <label for="email">Email</label><br />
          <p>prueba</p>
        </div>
        <div>
          <label for="first_name">First Name</label><br />
          <p>prueba</p>
        </div>
        <div>
          <label for="last_name">Last Name</label><br />
          <p>prueba</p>
        </div>
        <div class = "profile-button"> <br> 
          <button class="profile--button__edit">Edit</button>
          <button class="profile--button__delete">Delete</button>
        </div>
      </form>
    </section>
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
    </aside>`
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
        const layout = new Layout();
        layout.render();
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
    const login = new Login(".js-content");
    login.render();
  });
};
