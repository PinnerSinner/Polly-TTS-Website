const convertButton = document.getElementById('convert-btn');
const echoToggle = document.getElementById('echo-toggle');
const textInput = document.getElementById('text-input');
const audioOutputSection = document.getElementById('audio-output-section');
const audioPlayer = document.getElementById('audio-player');

let echoMode = false;

convertButton.addEventListener('click', async () => {
    const text = textInput.value;
    if (!text) {
        alert("Come on, give me something to say!");
        return;
    }

    try {
        const response = await fetch('https://j43phkl462.execute-api.us-east-1.amazonaws.com/dev/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) throw new Error("Bad response from server.");

        const data = await response.json();
        if (!data.fileUrl) throw new Error("No audio file received.");

        audioPlayer.src = data.fileUrl;
        audioOutputSection.style.display = 'block';

        if (echoToggle.checked) {
            echoMode = true;
            audioPlayer.loop = true;
        } else {
            echoMode = false;
            audioPlayer.loop = false;
        }

        audioPlayer.play();
    } catch (error) {
        console.error("Error:", error);
        alert("I tried. The machine gods have denied us.");
    }
});
