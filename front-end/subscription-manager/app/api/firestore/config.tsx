// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


const userCollection = collection(db,"Users")
const subscriptionCollection = collection(db,"Subscriptions")
const statisticsCollection = collection(db,"Statistics")


export {userCollection,subscriptionCollection,db,statisticsCollection}
