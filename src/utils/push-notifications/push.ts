import { config } from "../config";
import urls from "../urls";

export const register = async () => {
    const publicVapidKey = config.public_vapid;
    let counter = 0;
        const interval = setInterval(
            async () => {
                if ("serviceWorker" in navigator) {
                    // Rejestruj Service Workera
                    const registration = await navigator.serviceWorker.register("/worker.js", {
                        scope: "/",
                    });
            
                    // Poczekaj na aktywację Service Workera
                    await navigator.serviceWorker.ready;
            
                    // Wykonaj subskrypcję push, przekazując obiekt rejestracji do funkcji send
                    await send(registration, publicVapidKey).catch((err) => console.error(err))
                            counter++;
                            console.log(`${counter} iteration`)
                            if(counter === 3) clearInterval(interval);
                    
                }
            },1500
        )
        

    
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
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
