export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__element");
    return template.cloneNode(true);
  }

  _toggleLike(likeButton) {
    this._isLiked = !this._isLiked;
    likeButton.src = this._isLiked
      ? "./images/Love-full.svg"
      : "./images/Love.svg";
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".elements__info-love");
    const deleteButton = this._element.querySelector(".elements__trash");
    const image = this._element.querySelector(".elements__image");

    likeButton.addEventListener("click", () => {
      this._toggleLike(likeButton);
    });

    likeButton.addEventListener("mouseenter", () => {
      if (!this._isLiked) likeButton.src = "./images/Love-hover.svg";
    });

    likeButton.addEventListener("mouseleave", () => {
      likeButton.src = this._isLiked
        ? "./images/Love-full.svg"
        : "./images/Love.svg";
    });

    deleteButton.addEventListener("click", () => this._element.remove());

    image.addEventListener("click", () =>
      this._handleCardClick({ name: this._name, link: this._link })
    );
  }

  generateCard() {
    this._element = this._getTemplate();
    this._isLiked = false;

    const title = this._element.querySelector(".elements__info-name");
    const image = this._element.querySelector(".elements__image");

    title.textContent = this._name;
    image.src = this._link;
    image.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
