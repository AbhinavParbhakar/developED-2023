// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Firestore, collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAYbfQoJwuEweTvgDBZh43jastpDkJ_kfw",
  authDomain: "submanage-97a70.firebaseapp.com",
  projectId: "submanage-97a70",
  storageBucket: "submanage-97a70.appspot.com",
  messagingSenderId: "217045540010",
  appId: "1:217045540010:web:b557558f67c42819d544d3"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const userCollection = collection(db,"Users")
const subscriptionCollection = collection(db,"Subscriptions")

export {userCollection,subscriptionCollection}
