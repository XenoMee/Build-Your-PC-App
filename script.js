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
const componentListInDB = ref(database, "ComponentsTypeList");

const componentTypeEl = document.getElementById("component-type");
const componentNameEl = document.getElementById("component-name");
const addComponentBtnEl = document.getElementById("add-btn");
const componentsListEl = document.querySelector(".components-list");
const componentsTitleEl = document.querySelector(".components-title");
const quantityEl = document.querySelector(".quantity");
const quantityMinusBtn = document.querySelector(".btn--minus");
const quantitPlusBtn = document.querySelector(".btn--plus");

const ComponentObject = {
  type: "",
  name: "",
  quantity: "",
};

addComponentBtnEl.addEventListener("click", function () {
  let componentTypeValue = componentTypeEl.value;
  let componentNameValue = componentNameEl.value;
  if (componentTypeValue !== "" && componentNameValue !== "") {
    push(componentListInDB, componentTypeValue);
    resetInputValue();
  } else return;
});

onValue(componentListInDB, function (snapshot) {
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

  let newLiEl = createNewElement("li");
  newLiEl.textContent = itemValue;

  newLiEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `ComponentsTypeList/${itemID}`);

    remove(exactLocationOfItemInDB);
  });

  componentsListEl.append(newLiEl);
}

const resetInputValue = function () {
  componentTypeEl.value = "";
  componentNameEl.value = "";
  quantityEl.textContent = 0;
};

function clearComponentsListEl() {
  componentsListEl.innerHTML = "";
}

function displayComponentListTitle() {
  componentsTitleEl.style.display = "block";
  componentsTitleEl.textContent = "Tech Specs";
}

function createNewElement(element) {
  return document.createElement(element);
}
