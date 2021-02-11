export function SignUp(parentSelector) {
  if (!SignUp.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function () {
      return `
      <section>
        <form class="js-form-profile">
          <div>
            <label for="username">Username</label>
            <input type="text" name="username" id="username">
          </div>
          <div>
            <label for="email">Email</label>
            <input type="email" name="email" id="email">
          </div>
          <div>
            <label for="first_name">First Name</label>
            <input type="text" name="first_name" id="first_name">
          </div>
          <div>
            <label for="last_name">Last Name</label>
            <input type="text" name="last_name" id="last_name">
          </div>
          <div class = "profile-button">
            <button class="profile--button__edit">Edit</button>
            <button class="profile--button__delete">Delete</button>
          </div>
        </form>
      </section>`
    };
    SignUp.instance = this;
  }
  return SignUp.instance;
}
