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

const inputFieldEl = document.getElementById("input-field");
const addComponentBtnEl = document.getElementById("add-btn");
const componentsListEl = document.querySelector(".components-list");
addComponentBtnEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  if (inputValue !== "") {
    push(componentsListInDB, inputValue);
    clearInputValue();
  } else return;
});

onValue(componentsListInDB, function (snapshot) {
  let componentsArray = Object.entries(snapshot.val());
  clearComponentsListEl();

  for (let i = 0; i < componentsArray.length; i++) {
    let currentComponent = componentsArray[i];
    let currentComponentId = currentComponent[0];
    let currentComponentValue = currentComponent[1];
    appendItemtoComponentsListEl(currentComponent);
  }
});

function appendItemtoComponentsListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    removeItemfromComponentsListEl(itemID);
  });

  componentsListEl.append(newEl);
}

function removeItemfromComponentsListEl(itemId) {
  let exactLocationOfItemInDB = ref(database, `ComponentsList/${itemId}`);
  remove(exactLocationOfItemInDB);
}

function clearInputValue() {
  inputFieldEl.value = "";
}

function clearComponentsListEl() {
  componentsListEl.innerHTML = "";
}
