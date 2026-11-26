import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formData) => {
    // Handle form submission logic here
  },
});

addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos,
  renderer: (item) => renderTodo(item),
  containerSelector: ".todos__list",
});

section.renderItems();

function openModal(modal) {
  modal.classList.add("popup_visible");
}

function closeModal(modal) {
  modal.classList.remove("popup_visible");
}

function generateTodo(data) {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
}

function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    addTodoPopup.close();
    document.removeEventListener("keyup", handleEscapeClose);
  }
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

function renderTodo(item) {
  return generateTodo(item);
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

initialTodos.forEach(renderTodo);

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
