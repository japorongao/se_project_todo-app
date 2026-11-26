class PopupWithForm {
  constructor(popupSelector, handleFormSubmit) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__submit");
    this._submitButtonText = this._submitButton.textContent;
  }

  open() {
    modal.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscClose);
  }
}
export default PopupWithForm;
