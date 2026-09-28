class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._isEnabled = false;
    this._validationRules = settings;
    this._errors = {};
    this._formEl = formEl;
  }

  _checkInputValidity(inputElement) {
    return checkInputValidity(
      this._formEl,
      inputElement,
      this._validationRules,
    );
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector),
    );
    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector,
    );

    toggleButtonState(inputList, buttonElement, this._validationRules);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(this._formEl, inputElement, this._validationRules);
        toggleButtonState(inputList, buttonElement, this._validationRules);
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
