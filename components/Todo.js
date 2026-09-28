class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxEl.checked;
    });
  }

  _generateCheckbox() {
    this._todoCheckboxEl.checked = Boolean(this._data.completed);
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", this._todoCheckboxEl.id);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoNameEl.textContent = this._data.name;
    this._generateCheckbox();

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate.getTime())) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._setEventListeners();
    return this._todoElement;
  }
}

export default Todo;
