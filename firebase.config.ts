// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhpm2-3x92nywW9vxqpGAj1qMsedVy4eQ",
  authDomain: "tfip-project-382915.firebaseapp.com",
  projectId: "tfip-project-382915",
  storageBucket: "tfip-project-382915.appspot.com",
  messagingSenderId: "869245493728",
  appId: "1:869245493728:web:09a9dc750bdd8229988b85",
  measurementId: "G-2LGFVP8ZK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

// Export the initialized Firebase app and messaging instance
export { app, messaging };