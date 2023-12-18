// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAscOYMHNZs4hcAFx2aiOPXb9POswOYLpI",
  authDomain: "advproject-f3919.firebaseapp.com",
  projectId: "advproject-f3919",
  storageBucket: "advproject-f3919.appspot.com",
  messagingSenderId: "152484378998",
  appId: "1:152484378998:web:56a3a0208ea1f08043a257",
  measurementId: "G-TJHKXZG0XJ",
  databaseURL: "https://advproject-f3919-default-rtdb.asia-southeast1.firebasedatabase.app"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app }