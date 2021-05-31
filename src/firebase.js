import 'firebase/storage'
import firebase from 'firebase/app'
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyANpH-SR84Rur8dlTl597V6KLtsM0kqS0A",
    authDomain: "tiktoktest-fb160.firebaseapp.com",
    databaseURL: "https://tiktoktest-fb160-default-rtdb.firebaseio.com",
    projectId: "tiktoktest-fb160",
    storageBucket: "tiktoktest-fb160.appspot.com",
    messagingSenderId: "50950151092",
    appId: "1:50950151092:web:97dfeb3803488dd3c530e1",
    measurementId: "G-CN5QKV2S5W"
  };

  //const firebaseApp = firebase.initializeApp(firebaseConfig);
  //const db = firebaseApp.firestore();

  //export default db;

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()

//export default firebase.firestore();
var firebase1 = firebase.firestore();

export  {
    storage, firebase1 as default
}