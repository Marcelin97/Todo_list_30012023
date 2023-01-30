// selecteurs
// we select all variable
const todoInput = document.querySelector(".todo-input"); // input
const todoButton = document.querySelector(".todo-button"); // button
const todoList = document.querySelector(".todo-list"); // list

// Filter
const filterOption = document.querySelector(".filter-todo");

// ecouteurs d'évenement sur le button au click et j'appel la fonction
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);
// functions
function addTodo(event) {
  event.preventDefault();
  // console.log("hello")

  // create div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;

  // add class to my li
  newTodo.classList.add("todo-item");

  // j'ajoute à ma div mon li
  todoDiv.appendChild(newTodo);
  // J'ajoute ma todo au localStorage au moment de la création d'une tache
  // j'appel ma fonction pour sauvegarder la valeur de mon input
  saveLocalTodos(todoInput.value);

  // button check
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");

  // j'ajoute ce button dans ma div
  todoDiv.appendChild(completedButton);

  // button delete
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");

  // j'ajoute ce button dans ma div
  todoDiv.appendChild(deleteButton);

  // J'ajoute mon todo à notre todolist
  todoList.appendChild(todoDiv);

  // reset value after add and save in localStorage
  todoInput.value = "";
}

function deleteCheck(e) {
  // fix the element on click delete or check btn
  const item = e.target;
  // console.log("DEBUG", item);
  // If delete btn remove the line
  if (item.classList[0] === "delete-btn") {
    // console.log("DEBUG");
    const todo = item.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }
  // If check
  const todo = item.parentElement;
  if (item.classList[0] === "complete-btn") {
    todo.classList.toggle("completed");
  }
}

function filterTodo() {
  // I want all child of my todo
  const todos = todoList.childNodes;
  console.log("DEBUG", todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Save todo in localStorage
function saveLocalTodos(todo) {
  console.log("DEBUG TODO", todo);
  // check if localStorage has todo
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log("DEBUG TODO", todo);
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Get todo in localStorage
function getTodos(todo) {
  console.log("DEBUG TODO", todo);
  // check if localStorage has todo
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    // create div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;

    // add class to my li
    newTodo.classList.add("todo-item");

    // j'ajoute à ma div mon li
    todoDiv.appendChild(newTodo);

    // button check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");

    // j'ajoute ce button dans ma div
    todoDiv.appendChild(completedButton);

    // button delete
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");

    // j'ajoute ce button dans ma div
    todoDiv.appendChild(deleteButton);

    // J'ajoute mon todo à notre todolist
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo){
    console.log("DEBUG TODO", todo);
    // check if localStorage has todo
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}