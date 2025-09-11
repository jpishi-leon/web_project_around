export class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick; // Función para abrir modal de imagen
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__element");
    return template.cloneNode(true);
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".elements__info-love");
    const deleteButton = this._element.querySelector(".elements__trash");
    const image = this._element.querySelector(".elements__image");

    let isLiked = false;
    likeButton.addEventListener("click", () => {
      isLiked = !isLiked;
      likeButton.src = isLiked ? "./images/Love-full.svg" : "./images/Love.svg";
    });

    likeButton.addEventListener("mouseenter", () => {
      if (!isLiked) likeButton.src = "./images/Love-hover.svg";
    });

    likeButton.addEventListener("mouseleave", () => {
      likeButton.src = isLiked ? "./images/Love-full.svg" : "./images/Love.svg";
    });

    deleteButton.addEventListener("click", () => this._element.remove());

    image.addEventListener("click", () =>
      this._handleImageClick(this._link, this._name)
    );
  }

  generateCard() {
    this._element = this._getTemplate();

    const title = this._element.querySelector(".elements__info-name");
    const image = this._element.querySelector(".elements__image");

    title.textContent = this._name;
    image.src = this._link;
    image.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
