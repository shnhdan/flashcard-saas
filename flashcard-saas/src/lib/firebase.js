// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Authentication
import { getFirestore } from "firebase/firestore"; // Firestore database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY3G6Ta7Y_w5fWhjesEwOacZ3OPFEj7CA",
  authDomain: "flashcardsaas-6eef3.firebaseapp.com",
  projectId: "flashcardsaas-6eef3",
  storageBucket: "flashcardsaas-6eef3.appspot.com",
  messagingSenderId: "38571675381",
  appId: "1:38571675381:web:6a06e9a066735919d1bfbc",
  measurementId: "G-T8Z2VYZBXN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const firestore = getFirestore(app);

// Export services
export { auth, firestore, GoogleAuthProvider };
