const openProfilePopupBttn = document.querySelector(
  "#profile__lapiz-action-add"
);
const profileFormPopup = document.querySelector(".popup-edit");
const closeProfilePopupBttn = profileFormPopup.querySelector(
  ".popup__container-bttn-close"
);
const saveProfilePopupBttn = document.querySelector(".popup__form-submit");
const inputProfileName = document.querySelector("#InputName");
const inputProfileAbout = document.querySelector("#InputAbout");
const nameProfileHeader = document.querySelector(".profile__details-name");
const aboutProfileHeader = document.querySelector(
  ".profile__details-profession"
);
const formElement = document.querySelector(".popup__form");

const templateCard = document.querySelector(".template-card");
const cardsList = document.querySelector(".elements");

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

initialCards.forEach(function (item) {
  createCard(item.name, item.link);
});

function createCard(name, link) {
  const clonedCard = templateCard.content
    .querySelector(".elements__element")
    .cloneNode(true);

  const cardTitle = clonedCard.querySelector(".elements__info-name");
  const cardImage = clonedCard.querySelector(".elements__image");
  const cardLikeButton = clonedCard.querySelector(".elements__info-love");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // Toggle "like"
  let isLiked = false;
  cardLikeButton.addEventListener("click", function () {
    isLiked = !isLiked;
    cardLikeButton.src = isLiked
      ? "./images/Love-full.svg"
      : "./images/Love.svg";
  });

  // Hover efecto "like"
  cardLikeButton.addEventListener("mouseenter", function () {
    if (!isLiked) {
      cardLikeButton.src = "./images/Love-hover.svg";
    }
  });
  cardLikeButton.addEventListener("mouseleave", function () {
    cardLikeButton.src = isLiked
      ? "./images/Love-full.svg"
      : "./images/Love.svg";
  });

  // 🔥 Eliminar tarjeta
  const deleteIcon = clonedCard.querySelector(".elements__trash");
  deleteIcon.addEventListener("click", () => {
    clonedCard.remove();
  });

  // Abrir imagen ampliada (antes de añadir al DOM)
  cardImage.addEventListener("click", () => {
    const popup = document.querySelector(".popup-image");
    const popupImage = popup.querySelector(".popup__image-content");
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt || "Vista ampliada";
    popup.classList.add("popup__show");
  });

  cardsList.append(clonedCard);
}

function validateInputs() {
  const isNameFilled = inputProfileName.value.trim() !== "";
  const isAboutFilled = inputProfileAbout.value.trim() !== "";

  if (isNameFilled && isAboutFilled) {
    saveProfilePopupBttn.classList.remove("popup__form-submit-disable");
    saveProfilePopupBttn.disabled = false;
  } else {
    saveProfilePopupBttn.classList.add("popup__form-submit-disable");
    saveProfilePopupBttn.disabled = true;
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfileHeader.textContent = inputProfileName.value;
  aboutProfileHeader.textContent = inputProfileAbout.value;
  profileFormPopup.classList.remove("popup__show");
}

// Al abrir el popup, llena los campos y valida
openProfilePopupBttn.addEventListener("click", () => {
  inputProfileName.value = nameProfileHeader.textContent;
  inputProfileAbout.value = aboutProfileHeader.textContent;
  profileFormPopup.classList.add("popup__show");

  validateInputs(); // validación inicial al abrir
});

// Al cerrar el popup
closeProfilePopupBttn.addEventListener("click", () => {
  profileFormPopup.classList.remove("popup__show");
});

// Validación en tiempo real
inputProfileName.addEventListener("input", validateInputs);
inputProfileAbout.addEventListener("input", validateInputs);

// Enviar
formElement.addEventListener("submit", handleProfileFormSubmit);

const openNewCardPopupBttn = document.querySelector("#profile__add-button");
const newCardPopup = document.querySelector(".popup-new");
const closeNewCardPopupBttn = newCardPopup.querySelector(
  ".popup__container-bttn-close"
);
const newCardForm = newCardPopup.querySelector(".popup__form-new");

const inputCardTitle = document.querySelector("#card-title");
const inputCardLink = document.querySelector("#card-link");

// Abrir formulario
openNewCardPopupBttn.addEventListener("click", () => {
  newCardPopup.classList.add("popup__show");
});

// Cerrar formulario
closeNewCardPopupBttn.addEventListener("click", () => {
  newCardPopup.classList.remove("popup__show");
  newCardForm.reset();
});

// Enviar formulario para crear tarjeta
newCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const title = inputCardTitle.value;
  const link = inputCardLink.value;

  createCard(title, link); // Reusa tu función

  newCardPopup.classList.remove("popup__show");
  newCardForm.reset();
});

const imagePopup = document.querySelector(".popup-image");
const imagePopupContent = imagePopup.querySelector(".popup__image-content");
const popupImageCloseButton = imagePopup.querySelector(
  ".popup__container-bttn-close"
);

popupImageCloseButton.addEventListener("click", () => {
  imagePopup.classList.remove("popup__show");
  imagePopupContent.src = "";
  imagePopupContent.alt = "";
});
