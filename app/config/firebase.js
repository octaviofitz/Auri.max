import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "aurimax-42342.firebaseapp.com",
  projectId: "aurimax-42342",
  storageBucket: "aurimax-42342.appspot.com",
  messagingSenderId: "387863652963",
  appId: "1:387863652963:web:ea221ee01edf8ac232e656",
  measurementId: "G-948PZGY17N"
};

const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
const storage= getStorage(app);
const auth = getAuth(app); 

setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
        console.error("Error setting persistence: ", error);
    });


export {
  app,
  db,
  storage,
  auth
}


