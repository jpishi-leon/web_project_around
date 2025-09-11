export function openModal(modal) {
  if (!modal) return;
  modal.classList.add("popup__show");
  modal.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

export function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("popup__show");
  modal.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openModalElement = document.querySelector(
      ".popup.popup__show, .popup.popup_opened"
    );
    if (openModalElement) closeModal(openModalElement);
  }
}

export function setCloseListeners(modals) {
  modals.forEach((modal) => {
    modal.addEventListener("click", (evt) => {
      if (
        evt.target === modal ||
        evt.target.closest(".popup__container-bttn-close")
      ) {
        closeModal(modal);
      }
    });
  });
}
