import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBVesfbZVcLthVkWCXiDYKMaYbVQJpbF0",
  authDomain: "chatapp-91219.firebaseapp.com",
  projectId: "chatapp-91219",
  storageBucket: "chatapp-91219.appspot.com",
  messagingSenderId: "761598588517",
  appId: "1:761598588517:web:d3fdf32e5ec530b3e0f88c",
  measurementId: "G-BPBH0HKPGG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
auth.setPersistence(browserLocalPersistence);
export const storage = getStorage(app);
export const db = getFirestore(app);
