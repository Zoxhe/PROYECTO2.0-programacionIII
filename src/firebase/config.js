import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDHffFkr3Bkwl-_vPghJZ7N15eNAKRWKC0",
    authDomain: "final-proyecto-programacion3.firebaseapp.com",
    projectId: "final-proyecto-programacion3",
    storageBucket: "final-proyecto-programacion3.appspot.com",
    messagingSenderId: "668834513253",
    appId: "1:668834513253:web:123e62e3d2428b76f8a18c"
};dsdsd

app.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
