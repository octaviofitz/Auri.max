// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa getFirestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfJrb3Zb4QqErSyaNjTDMF6kpHdiwapzg",
  authDomain: "aurimax-42342.firebaseapp.com",
  projectId: "aurimax-42342",
  storageBucket: "aurimax-42342.appspot.com",
  messagingSenderId: "387863652963",
  appId: "1:387863652963:web:ea221ee01edf8ac232e656",
  measurementId: "G-948PZGY17N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);

export {
  app,
  db
}