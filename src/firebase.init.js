// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLHXSZeMtINikNHEZPJmaSEW9PANsTl60",
    authDomain: "to-do-list-5cb2f.firebaseapp.com",
    projectId: "to-do-list-5cb2f",
    storageBucket: "to-do-list-5cb2f.appspot.com",
    messagingSenderId: "113064044832",
    appId: "1:113064044832:web:b59cbd2b85ee5d598e4f45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;