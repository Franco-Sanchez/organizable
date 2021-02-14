export function ModalCard(parentSelector, dataCard) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.data = dataCard;
    this.toString = function() {
      return `
        <div class="modal">
          <header>
            <h4>${this.data.name}</h4>
            <img class="js-close-modal modal__close" src="./assets/images/close_form.svg" alt="close-modal">
          </header>
          <section>
            <article>
              <div>
                <h5>LABELS</h5>
                <ul class="js-labels-card-${this.data.cardId}"></ul>
              </div>
              <div>
                <h5>DESCRIPTION</h5>
                <div>
                  <p>${this.data.desc || "Enter a description"}</p>
                  <a class="modal__boton-edit" href="#">Edit</a>
                </div>
              </div>
              <div class="modal__new-feature">
                <img src="./assets/images/building.svg" alt="building">
                <p>Building a new feature for you</p>
              </div>
            </article>
            <article>
              <div>
                <h6>LABELS</h6>
                <ul class="js-board-labels"></ul>
                <a class="js-modal-create-label modal__create-label" href="#">Create a new label</a>
              </div>
              <a class="js-close-delete-card modal__delete-card" href="#">Delete card</a>
            </article>
          </section>
        </div>
      `
    }
}

ModalCard.prototype.render = function() {
  this.parentElement.innerHTML = this;
  this.closeModal();
}

ModalCard.prototype.closeModal = function() {
  const closeModal = this.parentElement.querySelector('.js-close-modal');
  const section = document.querySelector('.js-modal-card');
  closeModal.addEventListener('click', () => {
    section.style.display = 'none';
  })
}