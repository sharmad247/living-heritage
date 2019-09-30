importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js');
firebase.initializeApp({
  'messagingSenderId': '773233255134'
});
const messaging = firebase.messaging();

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://app.livingheritage.life')
  );
});