// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyASMPm5VN7dF_Zn9kcm6oG2FJqh9h4TW-I",
  authDomain: "todos-e5f5c.firebaseapp.com",
  projectId: "todos-e5f5c",
  storageBucket: "todos-e5f5c.appspot.com",
  messagingSenderId: "1031560743052",
  appId: "1:1031560743052:web:bc3fc7d901c26f0730d3a9",
  measurementId: "G-DSFYRHL6FP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);