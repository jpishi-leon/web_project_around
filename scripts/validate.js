export function toggleButtonState(formElement, submitButton) {
  const inputs = Array.from(formElement.querySelectorAll("input"));
  let isValid = true;

  inputs.forEach((input) => {
    const value = input.value.trim();
    switch (input.id) {
      case "InputName":
        if (value.length < 2 || value.length > 40) isValid = false;
        break;
      case "InputAbout":
        if (value.length < 2 || value.length > 200) isValid = false;
        break;
      case "inputTitle":
        if (value.length < 2 || value.length > 30) isValid = false;
        break;
      case "inputLink":
        if (!input.validity.valid) isValid = false;
        break;
      default:
        // Ignora otros inputs si los hay
        break;
    }
  });

  if (isValid) {
    submitButton.classList.remove("popup__form-submit-disable");
    submitButton.disabled = false;
  } else {
    submitButton.classList.add("popup__form-submit-disable");
    submitButton.disabled = true;
  }
}

export function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
}

export function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(".popup__form-input")
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    });
  });
}

export function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}
