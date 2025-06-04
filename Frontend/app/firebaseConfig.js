import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDD08kgxnKPIDaGD14q6Pi3FQWQZQMr9qQ",
  authDomain: "mediai-9100d.firebaseapp.com",
  projectId: "mediai-9100d",
  storageBucket: "mediai-9100d.appspot.com",
  messagingSenderId: "233694137860",
  appId: "1:233694137860:web:ea1357620ee0d2c1a1ef51",
  measurementId: "G-0DHCJB5HZT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
