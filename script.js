import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://realtime-database-93b45-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const componentsListInDB = ref(database, "ComponentsList");

const componentTypeEl = document.getElementById("component-type");
const componentNameEl = document.getElementById("component-name");
const addComponentBtnEl = document.getElementById("add-btn");
const componentsListEl = document.querySelector(".components-list");
const componentsTitleEl = document.querySelector(".components-title");
const quantityEl = document.querySelector(".quantity");
const quantityMinusBtn = document.querySelector(".btn--minus");
const quantitPlusBtn = document.querySelector(".btn--plus");
addComponentBtnEl.addEventListener("click", function () {
  let inputValue = componentTypeEl.value;
  if (inputValue !== "") {
    push(componentsListInDB, inputValue);
    clearInputValue();
  } else return;
});

onValue(componentsListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let componentsArray = Object.entries(snapshot.val());
    clearComponentsListEl();
    displayComponentListTitle();

    for (let i = 0; i < componentsArray.length; i++) {
      let currentComponent = componentsArray[i];
      appendItemtoComponentsListEl(currentComponent);
    }
  } else {
    componentsTitleEl.style.display = "none";
    componentsListEl.innerHTML = "No components available";
  }
});

function appendItemtoComponentsListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `ComponentsList/${itemID}`);

    remove(exactLocationOfItemInDB);
  });

  componentsListEl.append(newEl);
}

function clearInputValue() {
  componentTypeEl.value = "";
}

function clearComponentsListEl() {
  componentsListEl.innerHTML = "";
}

function displayComponentListTitle() {
  componentsTitleEl.style.display = "block";
  componentsTitleEl.textContent = "Tech Specs";
}
