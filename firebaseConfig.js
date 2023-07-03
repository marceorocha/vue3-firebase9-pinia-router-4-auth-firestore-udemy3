// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmWgwJnIu9EUaNStmKaj4q4rtFpgfmp68",
  authDomain: "fir-vue3-2023.firebaseapp.com",
  projectId: "fir-vue3-2023",
  storageBucket: "fir-vue3-2023.appspot.com",
  messagingSenderId: "894798919321",
  appId: "1:894798919321:web:8a4ef514b896929b202a08",
  measurementId: "G-XXKH1X1TXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();



export {auth, db};