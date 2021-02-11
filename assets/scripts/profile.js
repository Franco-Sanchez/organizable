export function MyProfile(parentSelector) {
  if(!MyProfile.instance) {
    this.parentSelector = parentSelector
    this.parentElement = document.querySelector(parentSelector)
    this.toString = function() {
      return `<h1>My profile</h1>`
    }
    MyProfile.instance = this;
  }
  return MyProfile.instance
}

MyProfile.prototype.render = function() {
  this.parentElement.innerHTML = this;
}