import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.GOOGLE_FIREBASE_API_KEY,
  authDomain: process.env.GOOGLE_FIREBASE_AUTO_DOMAIN,
  projectId: process.env.GOOGLE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GOOGLE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GOOGLE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GOOGLE_FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

if (process.env.NODE_ENV === "development") {
  console.log("localhost detected!");
  db.settings({
    host: "localhost:8080",
    ssl: false,
  });
}
