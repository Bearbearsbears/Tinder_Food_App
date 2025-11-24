import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_AUTH_DOMAIN_HERE",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "YOUR_APP_ID_HERE",
};
//initializes firebase
const app = initializeApp(firebaseConfig);
// auth context export
export const auth = getAuth(app);
//exporting login w google provider
export const googleProvider = new GoogleAuthProvider();
// firestore for saving likes/dislikes
export const db = getFirestore(app);
