// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFDXSIFY_qaHzsw1Zx8ZuMfReZSEyVMv4",
  authDomain: "ecommerce-5e13e.firebaseapp.com",
  projectId: "ecommerce-5e13e",
  storageBucket: "ecommerce-5e13e.appspot.com",
  messagingSenderId: "777493792162",
  appId: "1:777493792162:web:5144b2ed2adef2544bdefb"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp;