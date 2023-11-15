import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';



// const firebaseConfig = {
//    apiKey: process.env.FIREBASE_API_KEY,
//    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//    projectId: process.env.FIREBASE_PROJECT_ID,
//    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//    appId: process.env.FIREBASE_APP_ID
//  };

 const firebaseConfig = {
  apiKey: "AIzaSyDuJ2OpX6YtD1RZiwE3FwuWzW10NezS7sU", // process.env.FIREBASE_API_KEY
  authDomain: "spezi-dashboard-development.firebaseapp.com",
  projectId: "spezi-dashboard-development",
  storageBucket: "spezi-dashboard-development.appspot.com",
  messagingSenderId: "382922669553",
  appId: "1:382922669553:web:1dbad658ccc5fba8561850"
};

console.log("apiKey", firebaseConfig.apiKey);

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
