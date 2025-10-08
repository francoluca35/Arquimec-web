// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwKKJNULeG4p5VKbuHvaVluYZYhiejP-k",
  authDomain: "arquimec-9ab5c.firebaseapp.com",
  projectId: "arquimec-9ab5c",
  storageBucket: "arquimec-9ab5c.firebasestorage.app",
  messagingSenderId: "36076901245",
  appId: "1:36076901245:web:8fe73c2ab798b188ff3214",
  measurementId: "G-3LM8V4R4PY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics
export const analytics = getAnalytics(app);

export default app;
