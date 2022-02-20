// Import Sortable Library
import Sortable from "../../node_modules/sortablejs/modular/sortable.esm.js";

// Html Calls
const background = document.querySelector(".bg");
const moodIcon = document.querySelector(".mood-icon");
const createTab = document.querySelector(".data__create");
const listBox = document.querySelector(".data__list");
const controlCenter = document.querySelector(".controlCenter");
const createTodoBtn = document.getElementById("createTodo");
const mobileCategory = document.querySelector(".mobile-category");
const counter = document.getElementById("counter");
const allSel = document.querySelectorAll(".allSel");
const activeSel = document.querySelectorAll(".activeSel");
const completedSel = document.querySelectorAll(".completedSel");
const clearBtn = document.getElementById("clearCompleted");
const logo = document.getElementById("logo");
let list = document.querySelector(".todo-list");
let checkBox = document.querySelectorAll(".checkBox");
let removeBtn = document.querySelectorAll(".removeBtn");
let checkBtn = document.querySelectorAll(".checkBtn");

// Variables
let currentMode = "light";
let counterNum = 0;
let completedOnly = "";
let activeOnly = "";

// Adding Sorting Functionality using Sortable Lobrary
let sortable = new Sortable(list, {
  handle: ".handle",
  animation: 150,
});

// Reload Page when
logo.addEventListener("click", () => {
  document.location.reload(true);
});

// Set Counter Number
const setCounter = () => {
  let activeList = document.querySelectorAll(".active");

  counterNum = 0;
  for (let i = 0; i < activeList.length; i++) {
    counterNum++;
  }

  counter.innerHTML = `${counterNum} items left`;
};

setCounter();

// Fix Background Image on Resize
window.onresize = () => {
  if (currentMode == "light") {
    if (window.innerWidth < 1000) {
      background.style.content = "url(./images/bg-mobile-light.jpg)";
    } else {
      background.style.content = "url(./images/bg-desktop-light.jpg)";
    }
  } else {
    if (window.innerWidth < 1000) {
      background.style.content = "url(./images/bg-mobile-dark.jpg)";
    } else {
      background.style.content = "url(./images/bg-desktop-dark.jpg)";
    }
  }
};

// Change Theme When icon CLicked
moodIcon.addEventListener("click", () => {
  setMode();
});

const setMode = () => {
  if (currentMode == "light") {
    darkMode();
    currentMode = "dark";
    localStorage.setItem("mode", "light");
  } else {
    lightMode();
    currentMode = "light";
    localStorage.setItem("mode", "dark");
  }
};

// Set List color after change or being added
const setListMode = () => {
  checkBox = document.querySelectorAll(".checkBox");

  if (currentMode == "light") {
    checkBox.forEach((el) => {
      el.classList.remove("checkBox-dark");
    });
  } else {
    checkBox.forEach((el) => {
      el.classList.add("checkBox-dark");
    });
  }
};

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
    background.style.content = "url(./images/bg-mobile-dark.jpg)";
  } else {
    background.style.content = "url(./images/bg-desktop-dark.jpg)";
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
    background.style.content = "url(./images/bg-mobile-light.jpg)";
  } else {
    background.style.content = "url(./images/bg-desktop-light.jpg)";
  }
};

window.addEventListener("load", () => {
  if (
    localStorage.getItem("mode") !== "" &&
    localStorage.getItem("mode") !== undefined
  ) {
    currentMode = localStorage.getItem("mode");
    setMode();
  } else {
    if (currentMode == "light") {
      if (window.innerWidth < 1000) {
        background.style.content = "url(./images/bg-mobile-light.jpg)";
      } else {
        background.style.content = "url(./images/bg-desktop-light.jpg)";
      }
    } else {
      if (window.innerWidth < 1000) {
        background.style.content = "url(./images/bg-mobile-light.jpg)";
      } else {
        background.style.content = "url(./images/bg-desktop-light.jpg)";
      }
    }
  }
});

// Make New Task
const createTodo = () => {
  let inputValue = createTodoBtn.parentNode.querySelector(".createTask").value;

  if (inputValue !== "") {
    addElement(inputValue);
    createTodoBtn.parentNode.querySelector(".createTask").value = "";
  }
};

// Create New Task on check box click
createTodoBtn.addEventListener("click", () => {
  setAll();
  setCompletedOnly();
  setActiveOnly();

  createTodo();
});

// Create New Task On Keypress 'Enter'
createTodoBtn.parentNode
  .querySelector(".createTask")
  .addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      setAll();
      setCompletedOnly();
      setActiveOnly();

      createTodo();
    }
  });

// Add new todo to list
const addElement = (req) => {
  let htmlString = `
    <li class="flex flex-ai-c flex-jc-sb active">
    <div class="todoObject flex flex-ai-c">
    <div class="checkBox checkBtn">
    <img src="./images/icon-check.svg" alt="check" />
    </div>
    <h2 class="handle">${req}</h2>
    </div>
    <img
    src="./images/icon-cross.svg"
    alt="cross"
    class="removeBtn"
    />
    </li>  
    
    `;
  list.innerHTML = list.innerHTML + htmlString;

  removeFunc();
  completeFunc();
  setCounter();
  setListMode();

  setActiveOnly();
  setCompletedOnly();
};

// Set eventlistner for all remove buttons
const removeFunc = () => {
  removeBtn = document.querySelectorAll(".removeBtn");

  removeBtn.forEach((el) => {
    el.addEventListener("click", () => {
      el.parentNode.remove();
      setCounter();
      setActiveOnly();
      setCompletedOnly();
    });
  });
};

removeFunc();

// Mark Task As Completed
const completeFunc = () => {
  checkBtn = document.querySelectorAll(".checkBtn");

  checkBtn = checkBtn.forEach((el) => {
    el.addEventListener("click", () => {
      el.parentElement.parentElement.classList.add("completed");
      el.parentElement.parentElement.classList.remove("active");
      setCounter();
      setActiveOnly();
      setCompletedOnly();
    });
  });
};

completeFunc();

// Filter Active Tasks
const setActiveOnly = () => {
  let el = list.getElementsByTagName("li");

  activeOnly = "";

  for (let i = 0; i < el.length; i++) {
    if (el[i].classList.contains("active")) {
      activeOnly += `
      <li class="flex flex-ai-c flex-jc-sb active">
        ${el[i].innerHTML}
      </li>
      `;
    }
  }

  activeSel.forEach((el) => {
    el.addEventListener("click", () => {
      el.style.color = "hsl(220, 98%, 61%)";

      allSel.forEach((el) => {
        el.style.color = "hsl(236, 9%, 61%)";
      });

      completedSel.forEach((el) => {
        el.style.color = "hsl(236, 9%, 61%)";
      });

      list.innerHTML = activeOnly;
      completeFunc();
      removeFunc();
      setListMode();
    });
  });
};

setActiveOnly();

// Filter Completed Tasks
const setCompletedOnly = () => {
  let el = list.getElementsByTagName("li");

  completedOnly = "";

  for (let i = 0; i < el.length; i++) {
    if (el[i].classList.contains("completed")) {
      completedOnly += `
      <li class="flex flex-ai-c flex-jc-sb completed">
        ${el[i].innerHTML}
      </li>
      `;
    }
  }

  completedSel.forEach((el) => {
    el.addEventListener("click", () => {
      el.style.color = "hsl(220, 98%, 61%)";

      activeSel.forEach((el) => {
        el.style.color = "hsl(236, 9%, 61%)";
      });

      allSel.forEach((el) => {
        el.style.color = "hsl(236, 9%, 61%)";
      });

      list.innerHTML = completedOnly;
      completeFunc();
      removeFunc();
      setListMode();
    });
  });
};

setCompletedOnly();

// Show All Tasks
const selectAll = () => {
  allSel.forEach((el) => {
    el.addEventListener("click", () => {
      el.style.color = "hsl(220, 98%, 61%)";

      activeSel.forEach((el) => {
        el.style.color = "hsl(236, 9%, 61%)";
      });

      completedSel.forEach((el) => {
        el.style.color = "hsl(236, 9%, 61%)";
      });

      setAll();
    });
  });
};

selectAll();

const setAll = () => {
  list.innerHTML = activeOnly + completedOnly;
  completeFunc();
  removeFunc();
  setListMode();

  allSel.forEach((el) => {
    el.style.color = "hsl(220, 98%, 61%)";

    activeSel.forEach((el) => {
      el.style.color = "hsl(236, 9%, 61%)";
    });

    completedSel.forEach((el) => {
      el.style.color = "hsl(236, 9%, 61%)";
    });
  });
};

const removeCompleted = () => {
  completedOnly = "";

  setAll();
};

clearBtn.addEventListener("click", () => {
  removeCompleted();
});
