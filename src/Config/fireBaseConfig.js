// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDJxClBnYB9KRf0CDUCpR8Hr-0aGPH2AN0",
  authDomain: "fir-54225.firebaseapp.com",
  projectId: "fir-54225",
  storageBucket: "fir-54225.appspot.com",
  messagingSenderId: "45858746108",
  appId: "1:45858746108:web:427bfec775dd8433bef179",
  measurementId: "G-CZKE8ZV80Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const fireBaseStore = fireBaseStore(app);
export const Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const DB = getFirestore(app);
export const Storage = getStorage(app)