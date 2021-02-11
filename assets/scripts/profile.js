export function Profile(parentSelector) {
  if (!Profile.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function () {
      return `
      <section>
      <form class="js-form-profile">
        <div>
          <label for="username">Username</label><br />
          <p>${user.username}</p>
        </div>
        <div>
          <label for="email">Email</label><br />
          <p>${user.email}</p>
        </div>
        <div>
          <label for="first_name">First Name</label><br />
          <p>${user.first_name}</p>
        </div>
        <div>
          <label for="last_name">Last Name</label><br />
          <p>${user.last_name}</p>
        </div>
        <div class = "profile-button"> <br> 
          <button class="profile--button__edit">Edit</button>
          <button class="profile--button__delete">Delete</button>
        </div>
      </form>
    </section>`
    };
    Profile.instance = this;
  }
  return Profile.instance;
}