// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc1B-B5u7xukF9aK7KYExOglJLhpdXQXM",
  authDomain: "advanced-internship-6f9f3.firebaseapp.com",
  projectId: "advanced-internship-6f9f3",
  storageBucket: "advanced-internship-6f9f3.appspot.com",
  messagingSenderId: "1096175279580",
  appId: "1:1096175279580:web:5f2203efa6d3fcb9a8c319"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)