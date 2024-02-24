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
const quantityNumberEl = document.querySelector(".quantity-number");
const quantityMinusBtn = document.querySelector(".btn--minus");
const quantityPlusBtn = document.querySelector(".btn--plus");

let ComponentObject = {
  type: "",
  name: "",
  quantity: "",
};

quantityPlusBtn.addEventListener("click", function (e) {
  let quantityNumberValue = Number(quantityNumberEl.textContent);
  e.preventDefault();
  quantityNumberValue++;
  quantityNumberEl.textContent = quantityNumberValue;
});

quantityMinusBtn.addEventListener("click", function (e) {
  let quantityNumberValue = Number(quantityNumberEl.textContent);
  e.preventDefault();
  quantityNumberValue--;
  if (quantityNumberValue < 0) return;
  else quantityNumberEl.textContent = quantityNumberValue;
});

addComponentBtnEl.addEventListener("click", function () {
  addComponent();
  resetInputValue();
});

onValue(componentListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let componentsArray = Object.entries(snapshot.val()).reverse();
    clearComponentsListEl();
    displayComponentListTitle();

    for (let i = 0; i < componentsArray.length; i++) {
      let currentComponent = componentsArray[i];
      renderComponent(currentComponent);
    }
  } else {
    componentsTitleEl.style.display = "none";
    componentsListEl.innerHTML = "No components available";
  }
});

const resetInputValue = () => {
  componentTypeEl.value = "";
  componentNameEl.value = "";
  quantityNumberEl.textContent = "0";
};

const clearComponentsListEl = () => {
  componentsListEl.innerHTML = "";
};

function displayComponentListTitle() {
  componentsTitleEl.style.display = "block";
  componentsTitleEl.textContent = "Tech Specs";
}

function createNewElement(element) {
  return document.createElement(element);
}

function addComponent() {
  let componentTypeValue = componentTypeEl.value;
  let componentNameValue = componentNameEl.value;
  let componentQuantityValue = quantityNumberEl.textContent;

  if (
    (componentTypeValue !== "" || componentNameValue !== "") &&
    componentQuantityValue !== "0"
  ) {
    ComponentObject = {
      type: componentTypeValue,
      name: componentNameValue,
      quantity: `x${componentQuantityValue}`,
    };

    push(componentListInDB, ComponentObject);
  } else alert("Please select the number of components!");
}

function renderComponent(item) {
  let itemID = item[0];
  let itemValue = item[1];

  const newComponentItem = createNewElement("li");
  newComponentItem.classList.add("components-item", "grid-flow");
  newComponentItem.setAttribute("data-spacing", "small");

  newComponentItem.addEventListener("click", () => {
    let componentLocationInDB = ref(database, `ComponentsTypeList/${itemID}`);
    remove(componentLocationInDB);
  });

  const newComponentTitle = createNewElement("h3");
  newComponentTitle.textContent = itemValue.type;
  newComponentTitle.style.textAlign = "start";

  if (newComponentTitle.textContent === "")
    newComponentTitle.style.display = "none";

  const newComponentDescription = createNewElement("p");
  newComponentDescription.textContent = itemValue.name;

  if (newComponentDescription.textContent === "")
    newComponentDescription.style.display = "none";

  const newComponentQuantity = createNewElement("span");
  newComponentQuantity.textContent = itemValue.quantity;
  newComponentQuantity.style.textAlign = "end";

  componentsListEl.append(newComponentItem);
  newComponentItem.append(
    newComponentTitle,
    newComponentDescription,
    newComponentQuantity
  );
}
