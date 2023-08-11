import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3Y0EunazoUJkEli-dJXPXkHkWUhGG1Pk",
  authDomain: "whatsapp-f3ae9.firebaseapp.com",
  projectId: "whatsapp-f3ae9",
  storageBucket: "whatsapp-f3ae9.appspot.com",
  messagingSenderId: "170830936027",
  appId: "1:170830936027:web:20af21f91c9b80d85819fe",
  measurementId: "G-EW1JLCC0TX"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);