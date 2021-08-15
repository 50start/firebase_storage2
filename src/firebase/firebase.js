import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDrknDyFgGmfhVOwPVyhvCFU__fQ7bu58",
  authDomain: "fir-storage2-b4e01.firebaseapp.com",
  projectId: "fir-storage2-b4e01",
  storageBucket: "fir-storage2-b4e01.appspot.com",
  messagingSenderId: "836727656999",
  appId: "1:836727656999:web:c5f4aa3367939d2352f402",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const db = firebase.firestore();

export { db, storage, firebase as default };
