import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLemseOViYvoVA7g3Ky1Iyc3ZPg7OJ9F0",
  authDomain: "project-705fd.firebaseapp.com",
  projectId: "project-705fd",
  storageBucket: "project-705fd.appspot.com",
  messagingSenderId: "1053518486591",
  appId: "1:1053518486591:web:3fc74b9231297436062c8a",
  measurementId: "G-MW190WD2VL"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

