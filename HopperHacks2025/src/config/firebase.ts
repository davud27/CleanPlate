// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { auth, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP5Jnc-4I4yAy8691dSb3d08jLg3l6kJQ",
  authDomain: "clean-plate-1ba29.firebaseapp.com",
  projectId: "clean-plate-1ba29",
  storageBucket: "clean-plate-1ba29.firebasestorage.app",
  messagingSenderId: "39495952201",
  appId: "1:39495952201:web:cc1630b7c8d1aa3f16dc98",
  measurementId: "G-SNYH1KXFL3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { auth, getAuth };
