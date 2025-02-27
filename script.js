const convertButton = document.getElementById('convert-btn');
const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice');
const audioPlayer = document.getElementById('audio-player');
const audioOutputSection = document.getElementById('audio-output-section');
const echoToggle = document.getElementById('echo-toggle');

const API_URL = "https://j43phkl462.execute-api.us-east-1.amazonaws.com/dev/convert"; // Update with your API Gateway URL

convertButton.addEventListener('click', async () => {
    const text = textInput.value.trim();
    const selectedVoice = voiceSelect.value; // Get the selected voice

    if (!text) {
        alert("Come on, give me something to say!");
        return;
    }

    console.log("🔵 Sending request to Lambda with text & voice:", text, selectedVoice);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text, voice: selectedVoice }) // Send voice option
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("🟢 Lambda Response:", data);

        if (data.fileUrl) {
            audioPlayer.src = data.fileUrl;
            audioOutputSection.style.display = "block";
            audioPlayer.play();

            if (echoToggle.checked) {
                audioPlayer.loop = true;
            } else {
                audioPlayer.loop = false;
            }
        } else {
            alert("Something went wrong: No file URL received.");
        }
    } catch (error) {
        console.error("🔴 Error calling Lambda:", error);
        alert("Oops! Something went wrong. Check console for details.");
    }
});
