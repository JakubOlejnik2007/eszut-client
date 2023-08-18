/* eslint-disable no-restricted-globals */

self.addEventListener("install", (event) => {
    console.log("Install event");
    self.skipWaiting();
});

self.addEventListener("activate", () => {
    console.log("activate event");
});

self.addEventListener("push", (e) => {
    const data = e.data.json();
    console.log(data);

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
