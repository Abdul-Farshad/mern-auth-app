// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-f1035.firebaseapp.com",
  projectId: "mern-auth-f1035",
  storageBucket: "mern-auth-f1035.appspot.com",
  messagingSenderId: "348233845158",
  appId: "1:348233845158:web:1ad1125f84fe840969e767"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);