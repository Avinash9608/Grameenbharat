// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLvBQH5_hMZfssb57d4QHdRP1oRZ7YrwM",
  authDomain: "cybershield-1hvks.firebaseapp.com",
  projectId: "cybershield-1hvks",
  storageBucket: "cybershield-1hvks.appspot.com",
  messagingSenderId: "626212486324",
  appId: "1:626212486324:web:770121e652fef3c4972be1"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
