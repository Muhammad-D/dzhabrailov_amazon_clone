// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA3KZdIczLJubCMmNU2LKOKfvjrSZf08cc",
  authDomain: "dzhabrailov--clone.firebaseapp.com",
  databaseURL: "https://dzhabrailov--clone.firebaseio.com",
  projectId: "dzhabrailov--clone",
  storageBucket: "dzhabrailov--clone.appspot.com",
  messagingSenderId: "15756603096",
  appId: "1:15756603096:web:fe32db519b5b5befd2b1ad",
  measurementId: "G-SYF899JL83",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
