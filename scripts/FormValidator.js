export class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  // Método privado para mostrar error
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  // Método privado para ocultar error
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }

  // Método privado para verificar validez usando HTML5
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Método privado para verificar si hay inputs inválidos
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Método privado para alternar estado del botón
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // Método privado para agregar listeners
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  // Método público para habilitar validación
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }

  // Método público para resetear validación (oculta errores y actualiza botón)
  resetValidation() {
    this._inputList.forEach((inputElement) =>
      this._hideInputError(inputElement)
    );
    this._toggleButtonState();
  }
}
