import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image-content");
    this._caption = this._popup.querySelector(".popup__image-title");
  }

  open({ name, link }) {
    this._image.src = link;
    this._image.alt = name || "Vista ampliada";
    if (this._caption) {
      this._caption.textContent = name || "";
    }
    super.open();
  }

  close() {
    super.close();
    this._image.src = "";
    this._image.alt = "";
    if (this._caption) {
      this._caption.textContent = "";
    }
  }
}
