// Import Sortable Library
import Sortable from "../../node_modules/sortablejs/modular/sortable.esm.js";

// Html Calls
const list = document.querySelector(".todo-list");
const background = document.querySelector(".bg");
const moodIcon = document.querySelector(".mood-icon");
const createTab = document.querySelector(".data__create");
const checkBox = document.querySelectorAll(".checkBox");
const listBox = document.querySelector(".data__list");
const controlCenter = document.querySelector(".controlCenter");
const createTodoBtn = document.getElementById("createTodo");
const mobileCategory = document.querySelector(".mobile-category");
const counter = document.getElementById("counter");
let removeBtn = document.querySelectorAll(".removeBtn");

// Variables
let currentMode = "light";

// Adding Sorting Functionality using Sortable Lobrary
let sortable = Sortable.create(list);

// Fix Background Image on Resize
window.onresize = () => {
  if (currentMode == "light") {
    if (window.innerWidth < 1000) {
      background.style.content = "url(../../images/bg-mobile-light.jpg)";
    } else {
      background.style.content = "url(../../images/bg-desktop-light.jpg)";
    }
  } else {
    if (window.innerWidth < 1000) {
      background.style.content = "url(../../images/bg-mobile-dark.jpg)";
    } else {
      background.style.content = "url(../../images/bg-desktop-dark.jpg)";
    }
  }
};

// Change Theme When icon CLicked
moodIcon.addEventListener("click", () => {
  if (currentMode == "light") {
    darkMode();
    currentMode = "dark";
  } else {
    lightMode();
    currentMode = "light";
  }
});

// Dark Mode Values
const darkMode = () => {
  document.body.style.backgroundColor = "hsl(235, 21%, 11%)";
  moodIcon.src = "./images/icon-sun.svg";

  createTab.classList.add("data__create-dark");

  checkBox.forEach((el) => {
    el.classList.add("checkBox-dark");
  });

  listBox.classList.add("data__list-dark");

  controlCenter.classList.add("controlCenter-dark");

  mobileCategory.classList.add("mobile-category-dark");

  if (window.innerWidth < 1000) {
    background.style.content = "url(../../images/bg-mobile-dark.jpg)";
  } else {
    background.style.content = "url(../../images/bg-desktop-dark.jpg)";
  }
};

// Light Mode Values
const lightMode = () => {
  document.body.style.backgroundColor = "hsl(0, 0%, 98%)";
  moodIcon.src = "./images/icon-moon.svg";

  createTab.classList.remove("data__create-dark");

  checkBox.forEach((el) => {
    el.classList.remove("checkBox-dark");
  });

  listBox.classList.remove("data__list-dark");

  controlCenter.classList.remove("controlCenter-dark");

  mobileCategory.classList.remove("mobile-category-dark");

  if (window.innerWidth < 1000) {
    background.style.content = "url(../../images/bg-mobile-light.jpg)";
  } else {
    background.style.content = "url(../../images/bg-desktop-light.jpg)";
  }
};

// Make New Task
createTodoBtn.addEventListener("click", () => {
  let inputValue = createTodoBtn.parentNode.querySelector(".createTask").value;

  if (inputValue !== "") {
    addElement(inputValue);
    createTodoBtn.parentNode.querySelector(".createTask").value = "";
  }
});

removeBtn.forEach((el) => {
  el.addEventListener("click", () => {
    el.parentNode.remove();
  });
});

const addElement = (req) => {
  let htmlString = `
    <li class="flex flex-ai-c flex-jc-sb">
    <div class="todoObject flex flex-ai-c">
    <div class="checkBox">
    <img src="./images/icon-check.svg" alt="check" />
    </div>
    <h2>${req}</h2>
    </div>
    <img
    src="./images/icon-cross.svg"
    alt="cross"
    class="removeBtn"
    />
    </li>  
    
    `;
  list.innerHTML = list.innerHTML + htmlString;
  removeBtn = document.querySelectorAll(".removeBtn");
};
