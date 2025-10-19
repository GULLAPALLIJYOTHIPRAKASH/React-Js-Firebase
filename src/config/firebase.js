// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {
  apiKey: "AIzaSyCSq7Bs-bFvWqJl1xH6pvjXpbHoCztxlPw",
  authDomain: "fir-learn-3aff2.firebaseapp.com",
  projectId: "fir-learn-3aff2",
  storageBucket: "fir-learn-3aff2.firebasestorage.app",
  messagingSenderId: "318329712510",
  appId: "1:318329712510:web:5e9102f1416a733fbecd2f",
  measurementId: "G-ZH2N5EXVCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
