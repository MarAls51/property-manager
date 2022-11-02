import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC4wJR8bKI0ijF788PHKo8Jr37VHzFM9GE",
  authDomain: "g8-property-manager.firebaseapp.com",
  projectId: "g8-property-manager",
  storageBucket: "g8-property-manager.appspot.com",
  messagingSenderId: "898650189237",
  appId: "1:898650189237:web:23767c31a1abf1ec15bdfc",
  measurementId: "G-S7ZNYZ4DCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
