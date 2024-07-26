// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-b8365.firebaseapp.com",
  projectId: "mern-blog-b8365",
  storageBucket: "mern-blog-b8365.appspot.com",
  messagingSenderId: "997760433020",
  appId: "1:997760433020:web:ed41fbbf262e424478c2f9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);