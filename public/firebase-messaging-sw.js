importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyClk1mntdayByft8xwlpB1sNV9z5dN9vGI",
    authDomain: "automenz.firebaseapp.com",
    projectId: "automenz",
    storageBucket: "automenz.appspot.com",
    messagingSenderId: "105339826050",
    appId: "1:105339826050:web:5b37978947b52d20e8299b",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
