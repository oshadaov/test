
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDMQIof_656Ylncg-RVlrUy404joEFGJmA",
  authDomain: "expensetracker-f5632.firebaseapp.com",
  projectId: "expensetracker-f5632",
  storageBucket: "expensetracker-f5632.appspot.com",
  messagingSenderId: "961809871317",
  appId: "1:961809871317:web:95449e82b27e639401cd5c"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);