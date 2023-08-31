/* eslint-disable no-restricted-globals */

self.addEventListener("install", (event) => {
    self.skipWaiting();
});

self.addEventListener("activate", () => {
});

self.addEventListener("push", (e) => {
    const data = e.data.json();

    const notificationOptions = {
        body: "Nowe zgłoszenie w bazie danych",
        icon: "/logo512.png",
    };

    self.registration.showNotification(data.title, notificationOptions);
});

self.addEventListener("notificationclick", (e) => {
    const clickedNotification = e.notification;
    clickedNotification.close();
    
    const urlToOpen = "/logowanie";
    e.waitUntil(
        self.clients.openWindow(urlToOpen)
    );
});
