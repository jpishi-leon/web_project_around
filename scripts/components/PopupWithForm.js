import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(
      this._form.querySelectorAll(".popup__form-input")
    );
    this._submitButton = this._form.querySelector(".popup__form-submit");
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      const key = input.name || input.id;
      values[key] = input.value.trim();
    });
    return values;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this._submitButton);
    });
  }
}
