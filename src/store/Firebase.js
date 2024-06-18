// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClk1mntdayByft8xwlpB1sNV9z5dN9vGI",
  authDomain: "automenz.firebaseapp.com",
  projectId: "automenz",
  storageBucket: "automenz.appspot.com",
  messagingSenderId: "105339826050",
  appId: "1:105339826050:web:5b37978947b52d20e8299b",
  measurementId: "G-9HK97L94DD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);