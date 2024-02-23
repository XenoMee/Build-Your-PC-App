import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://realtime-database-93b45-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const componentsListInDB = ref(database, "ComponentsList");
