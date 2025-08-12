import { toggleButtonState, enableValidation } from "./validate.js";

// Helpers para abrir/cerrar popups compatible con popup__show y popup_opened
function openPopup(popup) {
  if (!popup) return;
  popup.classList.add("popup__show");
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  if (!popup) return;
  popup.classList.remove("popup__show");
  popup.classList.remove("popup_opened");
}

const openProfilePopupBttn = document.querySelector(
  "#profile__lapiz-action-add"
);
const profileFormPopup = document.querySelector(".popup-edit");
const closeProfilePopupBttn = profileFormPopup?.querySelector(
  ".popup__container-bttn-close"
);
const saveProfilePopupBttn = document.querySelector("#submit");
const inputProfileName = document.querySelector("#InputName");
const inputProfileAbout = document.querySelector("#InputAbout");
const nameProfileHeader = document.querySelector(".profile__details-name");
const aboutProfileHeader = document.querySelector(
  ".profile__details-profession"
);
const formElement = document.querySelector(".popup__form");

const templateCard =
  document.querySelector(".template-card") ||
  document.querySelector("#card-template") ||
  document.querySelector("#template-card");
const cardsList =
  document.querySelector(".elements") ||
  document.querySelector(".elements__list") ||
  document.querySelector(".cards");

// Acepta <template> o un nodo contenedor como template
const templateRoot =
  templateCard &&
  ("content" in templateCard ? templateCard.content : templateCard);

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

if (templateRoot && cardsList) {
  initialCards.forEach((item) => createCard(item.name, item.link));
} else {
  console.warn(
    "No se encontró el template (.template-card/#card-template) o el contenedor de tarjetas (.elements). Verifica el HTML."
  );
}

function createCard(name, link) {
  const clonedCard = templateRoot
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
    openPopup(popup);
  });

  cardsList.append(clonedCard);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfileHeader.textContent = inputProfileName.value;
  aboutProfileHeader.textContent = inputProfileAbout.value;
  closePopup(profileFormPopup);
}

// Al abrir el popup, llena los campos y valida
if (
  openProfilePopupBttn &&
  profileFormPopup &&
  saveProfilePopupBttn &&
  formElement &&
  inputProfileName &&
  inputProfileAbout
) {
  openProfilePopupBttn.addEventListener("click", () => {
    inputProfileName.value = nameProfileHeader.textContent;
    inputProfileAbout.value = aboutProfileHeader.textContent;
    openPopup(profileFormPopup);
    toggleButtonState(formElement, saveProfilePopupBttn);
  });
}

if (closeProfilePopupBttn && profileFormPopup) {
  closeProfilePopupBttn.addEventListener("click", () => {
    closePopup(profileFormPopup);
  });
}

if (inputProfileName && formElement && saveProfilePopupBttn) {
  inputProfileName.addEventListener("input", () =>
    toggleButtonState(formElement, saveProfilePopupBttn)
  );
}

if (inputProfileAbout && formElement && saveProfilePopupBttn) {
  inputProfileAbout.addEventListener("input", () =>
    toggleButtonState(formElement, saveProfilePopupBttn)
  );
}

if (formElement) {
  formElement.addEventListener("submit", handleProfileFormSubmit);
}

const openNewCardPopupBttn = document.querySelector("#profile__add-button");
const newCardPopup = document.querySelector(".popup-new");
const closeNewCardPopupBttn = newCardPopup?.querySelector(
  ".popup__container-bttn-close"
);
const newCardForm = newCardPopup?.querySelector(".popup__form-new");

const inputTitle = document.querySelector("#inputTitle");
const inputLink = document.querySelector("#inputLink");

const saveNewPlaceBttn = document.querySelector("#savePlace");

// Validación en tiempo real para nueva tarjeta
if (inputTitle && newCardForm && saveNewPlaceBttn) {
  inputTitle.addEventListener("input", () =>
    toggleButtonState(newCardForm, saveNewPlaceBttn)
  );
}
if (inputLink && newCardForm && saveNewPlaceBttn) {
  inputLink.addEventListener("input", () =>
    toggleButtonState(newCardForm, saveNewPlaceBttn)
  );
}

if (openNewCardPopupBttn && newCardPopup && newCardForm && saveNewPlaceBttn) {
  openNewCardPopupBttn.addEventListener("click", () => {
    openPopup(newCardPopup);
    toggleButtonState(newCardForm, saveNewPlaceBttn);
  });
}

if (closeNewCardPopupBttn && newCardPopup && newCardForm) {
  closeNewCardPopupBttn.addEventListener("click", () => {
    closePopup(newCardPopup);
    newCardForm.reset();
  });
}

if (newCardForm) {
  newCardForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const title = inputTitle ? inputTitle.value : "";
    let link = inputLink ? inputLink.value.trim() : "";
    if (link && !/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(link)) {
      link = `https://${link}`;
    }
    if (title && link) createCard(title, link);
    if (newCardPopup) closePopup(newCardPopup);
    newCardForm.reset();
    if (saveNewPlaceBttn) toggleButtonState(newCardForm, saveNewPlaceBttn);
  });
}

const imagePopup = document.querySelector(".popup-image");
const imagePopupContent = imagePopup?.querySelector(".popup__image-content");
const popupImageCloseButton = imagePopup?.querySelector(
  ".popup__container-bttn-close"
);

if (popupImageCloseButton && imagePopup) {
  popupImageCloseButton.addEventListener("click", () => {
    closePopup(imagePopup);
    if (imagePopupContent) {
      imagePopupContent.src = "";
      imagePopupContent.alt = "";
    }
  });
}

// Selecciona todos los popups
const popups = document.querySelectorAll(".popup");

// Función para cerrar cualquier popup
function closeModal(popup) {
  closePopup(popup);
}

// Cierre por clic en overlay
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// Cierre por Escape
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const popupAbierto = document.querySelector(
      ".popup.popup__show, .popup.popup_opened"
    );
    if (popupAbierto) {
      closeModal(popupAbierto);
    }
  }
});

// Activar validación de errores
enableValidation();
