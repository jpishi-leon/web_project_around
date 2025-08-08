const openProfilePopupBttn = document.querySelector(
  "#profile__lapiz-action-add"
);
const profileFormPopup = document.querySelector(".popup-edit");
const closeProfilePopupBttn = profileFormPopup.querySelector(
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
  const isNameFilled =
    inputProfileName.value.trim().length >= 2 &&
    inputProfileName.value.trim().length <= 40;

  const isAboutFilled =
    inputProfileAbout.value.trim().length >= 2 &&
    inputProfileAbout.value.trim().length <= 200;

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

const inputTitle = document.querySelector("#inputTitle");
const inputLink = document.querySelector("#inputLink");

const saveNewPlaceBttn = document.querySelector("#savePlace");

function validateInputsB() {
  const isTitleFilled =
    inputTitle.value.trim().length >= 2 && inputTitle.value.trim().length <= 30;

  // Usar la validación nativa del navegador
  const isLinkValid = inputLink.validity.valid;

  if (isTitleFilled && isLinkValid) {
    savePlace.classList.remove("popup__form-submit-disable");
    savePlace.disabled = false;
  } else {
    savePlace.classList.add("popup__form-submit-disable");
    savePlace.disabled = true;
  }
}

validateInputsB();

inputTitle.addEventListener("input", validateInputsB);
inputLink.addEventListener("input", validateInputsB);

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

  const title = inputTitle.value;
  let link = inputLink.value.trim();
  if (link && !/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(link)) {
    link = `https://${link}`;
  }

  createCard(title, link);

  newCardPopup.classList.remove("popup__show");
  newCardForm.reset();
  validateInputsB();
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

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".popup__form-input")
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      //checkInputValidity(formElement, inputElement);
      console.log("probando");
      showInputError(formElement, inputElement, inputElement.validationMessage);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
};

// Selecciona todos los popups
const popups = document.querySelectorAll(".popup");

// Función para cerrar cualquier popup
function closeModal(popup) {
  popup.classList.remove("popup__show");
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
    const popupAbierto = document.querySelector(".popup.popup__show");
    if (popupAbierto) {
      closeModal(popupAbierto);
    }
  }
});
