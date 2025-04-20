const openProfilePopupBttn = document.querySelector(
  "#profile__lapiz-action-add"
);
const profileFormPopup = document.querySelector(".popup");
const closeProfilePopupBttn = document.querySelector(
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
