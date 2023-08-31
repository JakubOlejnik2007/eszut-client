import { config } from "../config";
import urls from "../urls";

export const register = async () => {
    let counter = 0;
    const interval = setInterval(async () => {
        if (counter >= 3) clearInterval(interval);
        try {
            if ("serviceWorker" in navigator) {
                const registration = await navigator.serviceWorker.register("/worker.js", {
                    scope: "/",
                });

                if (registration.active) {
                    const subscription = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(config.public_vapid),
                    });
                    await sendSubscriptionToServer(subscription);
                }
            }
        } catch (error) {
            console.error("Błąd podczas rejestracji Service Workera:", error);
        }
        counter++;
    }, 1000);
};

async function sendSubscriptionToServer(subscription: PushSubscription) {
    try {
        await fetch(`${config.backend}${urls.backend.push.subscribe}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(subscription),
        });
    } catch {}
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
