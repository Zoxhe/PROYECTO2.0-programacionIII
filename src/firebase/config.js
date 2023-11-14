import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD05jaSOhBjcYRsNKtmg9oJa1l3SlJXq3Q",
    authDomain: "proyectoprogratres.firebaseapp.com",
    projectId: "proyectoprogratres",
    storageBucket: "proyectoprogratres.appspot.com",
    messagingSenderId: "542071094771",
    appId: "1:542071094771:web:16cb54956dcecbca6a2686"
  };
  

app.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
