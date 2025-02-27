const convertButton = document.getElementById('convert-btn');
const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice');
const audioPlayer = document.getElementById('audio-player');
const audioOutputSection = document.getElementById('audio-output-section');
const echoToggle = document.getElementById('echo-toggle');
const loadingMessage = document.getElementById('loading-message');
const clearTextButton = document.getElementById('clear-text-btn');

const API_URL = "https://j43phkl462.execute-api.us-east-1.amazonaws.com/dev/convert"; // Update with your API Gateway URL

// Function to use sample prompts
function useSample(text) {
    textInput.value = text;
}

// Function to clear text input
function clearText() {
    textInput.value = "";
}

// Function to handle API request and audio playback
convertButton.addEventListener('click', async () => {
    const text = textInput.value.trim();
    const selectedVoice = voiceSelect.value; // Get the selected voice

    if (!text) {
        alert("Come on, give me something to say!");
        return;
    }

    // Show loading message
    loadingMessage.style.display = "block";
    audioOutputSection.style.display = "none";
    audioPlayer.src = ""; // Reset previous audio

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
            loadingMessage.style.display = "none";
            audioPlayer.play();

            if (echoToggle.checked) {
                audioPlayer.loop = true;
            } else {
                audioPlayer.loop = false;
            }
        } else {
            throw new Error("No file URL received from server");
        }
    } catch (error) {
        console.error("🔴 Error calling Lambda:", error);
        alert("Oops! Something went wrong. Check console for details.");
        loadingMessage.style.display = "none";
    }
});