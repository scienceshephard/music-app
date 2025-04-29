import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuxKHuhCLS_Y0EuDeiR-XieeuyYJ7mgns",
  authDomain: "shephard-sings.firebaseapp.com",
  projectId: "shephard-sings",
  storageBucket: "shephard-sings.firebasestorage.app",
  messagingSenderId: "397444596949",
  appId: "1:397444596949:web:4e0441cbc89c779f468e5c",
  measurementId: "G-F3EM2QMYNJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()