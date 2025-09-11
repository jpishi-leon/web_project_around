import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal, setCloseListeners } from "./utils.js";

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

const cardTemplateSelector = ".template-card";
const cardsList = document.querySelector(".elements");

const handleImageClick = (link, name) => {
  const imagePopup = document.querySelector(".popup-image");
  const popupImage = imagePopup.querySelector(".popup__image-content");
  popupImage.src = link;
  popupImage.alt = name || "Vista ampliada";
  openModal(imagePopup);
};

initialCards.forEach((item) => {
  const card = new Card(item, cardTemplateSelector, handleImageClick);
  cardsList.append(card.generateCard());
});

const validationConfig = {
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "popup__form-submit-disable",
  inputErrorClass: "form__input_type_error",
};

const profileForm = document.querySelector(".popup__form");
const newCardForm = document.querySelector(".popup__form-new");

const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.enableValidation();

const newCardValidator = new FormValidator(validationConfig, newCardForm);
newCardValidator.enableValidation();

const openProfileButton = document.querySelector("#profile__lapiz-action-add");
const profilePopup = document.querySelector(".popup-edit");
const inputName = document.querySelector("#InputName");
const inputAbout = document.querySelector("#InputAbout");
const nameHeader = document.querySelector(".profile__details-name");
const aboutHeader = document.querySelector(".profile__details-profession");

openProfileButton.addEventListener("click", () => {
  inputName.value = nameHeader.textContent;
  inputAbout.value = aboutHeader.textContent;
  profileValidator.resetValidation();
  openModal(profilePopup);
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  nameHeader.textContent = inputName.value;
  aboutHeader.textContent = inputAbout.value;
  closeModal(profilePopup);
});

const openNewCardButton = document.querySelector("#profile__add-button");
const newCardPopup = document.querySelector(".popup-new");
const inputTitle = document.querySelector("#inputTitle");
const inputLink = document.querySelector("#inputLink");

openNewCardButton.addEventListener("click", () => {
  newCardForm.reset();
  newCardValidator.resetValidation();
  openModal(newCardPopup);
});

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let link = inputLink.value.trim();
  if (link && !/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(link)) {
    link = `https://${link}`;
  }
  const newData = { name: inputTitle.value, link };
  const newCard = new Card(newData, cardTemplateSelector, handleImageClick);
  cardsList.prepend(newCard.generateCard()); // Agrega al inicio para visibilidad
  closeModal(newCardPopup);
  newCardForm.reset();
  newCardValidator.resetValidation();
});

const imagePopup = document.querySelector(".popup-image");
const popupImageContent = imagePopup.querySelector(".popup__image-content");

imagePopup
  .querySelector(".popup__container-bttn-close")
  .addEventListener("click", () => {
    closeModal(imagePopup);
    popupImageContent.src = "";
    popupImageContent.alt = "";
  });

const popups = document.querySelectorAll(".popup");
setCloseListeners(popups);
