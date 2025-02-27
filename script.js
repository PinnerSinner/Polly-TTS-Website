document.addEventListener("DOMContentLoaded", () => {
    const convertButton = document.getElementById("convert-btn");
    const textInput = document.getElementById("text-input");
    const voiceSelect = document.getElementById("voice");
    const audioPlayer = document.getElementById("audio-player");
    const audioOutputSection = document.getElementById("audio-output-section");
    const echoToggle = document.getElementById("echo-toggle");
    const loadingMessage = document.getElementById("loading-message");
    const clearTextBtn = document.getElementById("clear-text-btn");

    const API_URL = "https://j43phkl462.execute-api.us-east-1.amazonaws.com/dev/convert";

    // Function to set text from sample prompts
    window.useSample = (text) => {
        textInput.value = text;
        textInput.focus();
        updateButtonState();
    };

    // Function to clear text area
    window.clearText = () => {
        textInput.value = "";
        updateButtonState();
    };

    // Function to enable/disable the button based on input
    const updateButtonState = () => {
        convertButton.disabled = textInput.value.trim() === "";
    };

    textInput.addEventListener("input", updateButtonState);

    convertButton.addEventListener("click", async () => {
        const text = textInput.value.trim();
        const selectedVoice = voiceSelect.value;

        if (!text) {
            alert("Come on, give me something to say!");
            return;
        }

        console.log("🔵 Sending request to Lambda with text & voice:", text, selectedVoice);
        
        loadingMessage.style.display = "block";
        convertButton.disabled = true;
        
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: text, voice: selectedVoice })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("🟢 Lambda Response:", data);

            if (data.fileUrl) {
                audioPlayer.src = data.fileUrl;
                audioOutputSection.style.display = "block";
                audioPlayer.controls = true;
                audioPlayer.style.width = "100%";
                audioPlayer.style.maxWidth = "600px";
                audioPlayer.style.height = "50px";
                audioPlayer.style.marginTop = "10px";
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
        } finally {
            loadingMessage.style.display = "none";
            convertButton.disabled = false;
        }
    });

    updateButtonState(); // Initialize button state
});
