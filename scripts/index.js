const openProfilePopupBttn = document.querySelector(".profile__lapiz"); //creacion de las variables
const profileFormPopup = document.querySelector(".popup");
const closeProfilePopupBttn = document.querySelector(
  ".popup__container-bttn-close"
);
const saveProfilePopupBttn = document.querySelector(
  ".popup__form-input_submit"
);
const inputProfileName = document.queryselector("#InputName");
const inputProfileAbout = document.queryselector("#InputAbout");
const nameProfileHeader = document.queryselector(".profile__details-name");
const aboutProfileHeader = document.queryselector(
  ".profile__details-profession"
);
const formElement = document.queryselector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfileHeader.textContent = inputProfileName.value;
  aboutProfileHeader.textContent = inputProfileAbout.value;
  profileFormPopup.classList.remove("popup__show");
}

openProfilePopupBttn.addEventListener("click", () => {
  inputProfileName.value = nameProfileHeader.textContent;
  inputProfileAbout.value = aboutProfileHeader.textContent;
  profileFormPopup.classList.add(".popup__show");
  saveProfilePopupBttn.classList.add(".popup__form-btn-submit-disable");
});

closeProfilePopupBttn.addEventListener("click", () => {
  profileFormPopup.classList.remove(".popup__show");
});
formElement.addEventListener("submit", handleProfileFormSubmit);
