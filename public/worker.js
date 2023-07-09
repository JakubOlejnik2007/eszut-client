/* eslint-disable no-restricted-globals */
self.addEventListener("install", (event) => {
  self.skipWaiting()
});

self.addEventListener("push", (e) => {
    const data = e.data.json();
    self.registration.showNotification(data.title, {
        body: "Nowe zgłoszenie w bazie danych",
        icon: "/eszut/img/icons/mstile-150x150.png",
    });
});
