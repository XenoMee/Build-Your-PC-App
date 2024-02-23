import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
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

  push(componentsListInDB, inputValue);
  appendItemtoComponentsListEl(inputValue);
  clearInputValue();
});

function appendItemtoComponentsListEl(item) {
  componentsListEl.innerHTML += `<li>${item}</li>`;
}

function clearInputValue() {
  inputFieldEl.value = "";
}
