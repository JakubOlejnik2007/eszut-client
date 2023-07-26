import { config } from "../config";
import urls from "../urls";

export const register = async () => {
    const publicVapidKey = config.public_vapid;
    let counter = 0;
    const interval = setInterval(async () => {
        if ("serviceWorker" in navigator) {
            const registration = await navigator.serviceWorker.register("/worker.js", {
                scope: "/",
            });
            await navigator.serviceWorker.ready;
            await send(registration, publicVapidKey).catch((err) => console.error(err));
            counter++;
            if (counter === 3) clearInterval(interval);
        }
    }, 1500);
};

async function send(registration: ServiceWorkerRegistration, publicVapidKey: string) {
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    await fetch(`http://${config.backend}${urls.backend.push.subscribe}`, {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json",
        },
    });
}
function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
