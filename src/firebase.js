// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASq5VgDoZbKl4eRMHANOk4OrfYXJHA45g",
  authDomain: "portfolio-2fca9.firebaseapp.com",
  projectId: "portfolio-2fca9",
  storageBucket: "portfolio-2fca9.firebasestorage.app",
  messagingSenderId: "239638905312",
  appId: "1:239638905312:web:c3da6938ff430ac0572b85",
  measurementId: "G-5X3H8LT5DL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);