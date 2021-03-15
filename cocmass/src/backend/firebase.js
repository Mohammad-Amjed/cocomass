import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCRir8sg5CZtlPCikBB7s4xvxodxboAu0E",
    authDomain: "cocomass-d0045.firebaseapp.com",
    projectId: "cocomass-d0045",
    storageBucket: "cocomass-d0045.appspot.com",
    messagingSenderId: "785958187186",
    appId: "1:785958187186:web:3dc5f6d7c48138165a99ab",
    measurementId: "G-3THY9T4HPM"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  export { db, auth, timestamp };