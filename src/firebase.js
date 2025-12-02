import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMMaHfblXxUhz7LJpi2LEREJnDCqFxSx0",
  authDomain: "foodtinder-4bb14.firebaseapp.com",
  projectId: "foodtinder-4bb14",
  storageBucket: "foodtinder-4bb14.firebasestorage.app",
  messagingSenderId: "593952674549",
  appId: "1:593952674549:web:07a08254f3db4eefaeabbc",
};
//initializes firebase
const app = initializeApp(firebaseConfig);
// auth context export
export const auth = getAuth(app);
//exporting login w google provider
export const googleProvider = new GoogleAuthProvider();
// firestore for saving likes/dislikes
export const db = getFirestore(app);
