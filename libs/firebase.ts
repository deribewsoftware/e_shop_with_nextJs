// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9NqQwcPBVZ3UlKPBEwPoaQjeOJJQRfKw",
  authDomain: "e-shop-vid-190bb.firebaseapp.com",
  projectId: "e-shop-vid-190bb",
  storageBucket: "e-shop-vid-190bb.appspot.com",
  messagingSenderId: "812127345588",
  appId: "1:812127345588:web:4c0636a090049be651f0e1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;