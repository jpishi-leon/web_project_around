import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";

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

const validationConfig = {
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "popup__form-submit-disable",
  inputErrorClass: "popup__form-input_type_error",
};

const cardTemplateSelector = "#card-template";
const cardsContainerSelector = ".elements";

const profileForm = document.querySelector(".popup-edit .popup__form");
const newCardForm = document.querySelector(".popup-new .popup__form");

const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.enableValidation();

const newCardValidator = new FormValidator(validationConfig, newCardForm);
newCardValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__details-name",
  jobSelector: ".profile__details-profession",
});

const imagePopup = new PopupWithImage(".popup-image");
imagePopup.setEventListeners();

const createCard = (data) => {
  const card = new Card(data, cardTemplateSelector, (cardData) =>
    imagePopup.open(cardData)
  );
  return card.generateCard();
};

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => createCard(item),
  },
  cardsContainerSelector
);
cardsSection.renderItems();

const editProfilePopup = new PopupWithForm(
  ".popup-edit",
  ({ name, about }) => {
    userInfo.setUserInfo({ name, about });
    editProfilePopup.close();
  }
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(".popup-new", ({ title, link }) => {
  let normalizedLink = link ? link.trim() : "";
  if (
    normalizedLink &&
    !/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(normalizedLink)
  ) {
    normalizedLink = `https://${normalizedLink}`;
  }
  const newCardElement = createCard({
    name: title,
    link: normalizedLink,
  });
  cardsSection.addItem(newCardElement, true);
  addCardPopup.close();
  newCardValidator.resetValidation();
});
addCardPopup.setEventListeners();

const openProfileButton = document.querySelector("#profile__lapiz-action-add");
const inputName = document.querySelector("#InputName");
const inputAbout = document.querySelector("#InputAbout");

openProfileButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  inputName.value = name;
  inputAbout.value = about;
  profileValidator.resetValidation();
  editProfilePopup.open();
});

const openNewCardButton = document.querySelector("#profile__add-button");
openNewCardButton.addEventListener("click", () => {
  newCardForm.reset();
  newCardValidator.resetValidation();
  addCardPopup.open();
});
