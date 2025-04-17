const form = document.querySelector(".form");
const inputWord = form.querySelector(".form__input");
const elements = document.querySelector(".elements");
const popupImage = document.querySelector(".popup_image");
const popupImageClose = popupImage.querySelector(".popup__close-button");
const words = [
  {
    name: "Juan",
    link: "https://randomuser.me/api/portraits/men/95.jpg",
  },
  {
    name: "Martin",
    link: "https://randomuser.me/api/portraits/men/92.jpg",
  },
  {
    name: "Pedro",
    link: "https://randomuser.me/api/portraits/men/17.jpg",
  },
];

words.forEach((item) => {
  const card = createElement(item.name, item.link);
  elements.append(card);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const card = createElement(inputWord.value, inputLink.value);

  elements.prepend(card);
  form.reset();
});

popupImageClose.addEventListener("click", function () {
  popupImage.classList.remove("popup_opened");
});

function createElement(name, link) {
  const cardNode = document
    .querySelector(".template")
    .content.querySelector(".card")
    .cloneNode(true);
  cardNode.querySelector(".card__image").src = link;
  cardNode.querySelector(".card__image").alt = name;
  cardNode.querySelector(".card__text").textContent = name;

  const likeButton = cardNode.querySelector(".card__like");

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like_active");
  });

  const trashButton = cardNode.querySelector(".card__trash");

  trashButton.addEventListener("click", function () {
    cardNode.remove();
  });

  return cardNode;
}
