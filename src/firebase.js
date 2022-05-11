import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "quiz-app-f19ed.firebaseapp.com",
  projectId: "quiz-app-f19ed",
  storageBucket: "quiz-app-f19ed.appspot.com",
  messagingSenderId: "43682004901",
  appId: "1:43682004901:web:8f4d44cdd10ba9d843724c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
