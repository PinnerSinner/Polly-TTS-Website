const convertButton = document.getElementById('convert-btn');
const echoToggle = document.getElementById('echo-toggle');
const textInput = document.getElementById('text-input');
const audioPlayer = document.getElementById('audio-player');
const audioOutputSection = document.getElementById('audio-output-section');

const API_URL = "https://j43phkl462.execute-api.us-east-1.amazonaws.com/dev/convert"; // Update with your API Gateway URL

// Function to use a sample prompt
function useSample(text) {
    textInput.value = text;
}

// Event Listener for Convert Button
convertButton.addEventListener('click', async () => {
    const text = textInput.value.trim();
    if (!text) {
        alert("Come on, give me something to say!");
        return;
    }

    console.log("🔵 Sending request to Lambda:", text);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text })
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

            // Echo Chamber Mode: Loop the audio if enabled
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
