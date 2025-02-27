const convertButton = document.getElementById('convert-btn');
const echoToggle = document.getElementById('echo-toggle');
const textInput = document.getElementById('text-input');
const audioPlayer = document.getElementById('audio-player');

function useSample(text) {
    textInput.value = text;
}

convertButton.addEventListener('click', async () => {
    const text = textInput.value;
    if (!text) {
        alert("Come on, give me something to say!");
        return;
    }
    console.log("Sending request:", text);
});
