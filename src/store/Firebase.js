// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getStorage } from "firebase/storage";

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
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const auth = getAuth(app); // Initialize the authentication service
//const db = getFirestore(app);

const storage = getStorage(app);

// Function to handle incoming messages
const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registered successfully', registration);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  };

  
  const getFcmToken = async () => {
    try {
      await registerServiceWorker();
      const messaging = getMessaging();
      const currentPermission = Notification.permission;
  
      if (currentPermission === 'denied') {
        // Provide instructions to enable notifications
        alert("Please enable notifications in your browser settings to receive updates.");
        return;
      }
  
      // Request permission if not already granted
      if (currentPermission === 'default') {
        const permissionResult = await Notification.requestPermission();
        if (permissionResult !== 'granted') {
          alert("Notification permission was not granted.");
          return;
        }
      }
      console.log(import.meta.env.VITE_VAPID,'ggggggggggggg')
      // Get the token
      const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID });
      console.log('FCM Token:', token);
      return token;
    } catch (error) {
      if (error.code === 'messaging/permission-blocked') {
        alert("Notification permission is blocked. Please enable it in your browser settings.");
      } else {
        console.error('An error occurred while retrieving token.', error);
      }
    }
  
  };

export { auth, getFcmToken, messaging, onMessageListener, storage };

