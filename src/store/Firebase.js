// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken } from "firebase/messaging";
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

const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });
      console.log('FCM Token:', token);
      // Send this token to your server to associate it with the user
      return token;
    }
  } catch (error) {
    console.error('Error getting notification permission:', error);
  }
};

// Function to handle incoming messages
const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

  const getFcmToken = async () => {
    try {
      const currentToken = await getToken(messaging, { vapidKey: import.meta.env.VAPID });
      if (currentToken) {
        console.log('FCM token:', currentToken);
        return currentToken;
      } else {
        console.log('No registration token available. Request permission to generate one.');
        return null;
      }
    } catch (err) {
      console.log('An error occurred while retrieving token. ', err);
      return null;
    }
  };

export { auth, getFcmToken, messaging, onMessageListener, requestNotificationPermission, storage };

