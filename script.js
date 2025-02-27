// script.js

document.getElementById('convert-btn').addEventListener('click', async () => {
    const textInput = document.getElementById('text-input').value;
    if (!textInput) {
        alert('Please enter some text.');
        return;
    }

    try {
        const response = await fetch('https://j43phkl462.execute-api.us-east-1.amazonaws.com/dev/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const audioUrl = data.audioUrl; // Ensure your Lambda function returns this URL

        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.src = audioUrl;

        const audioOutputSection = document.getElementById('audio-output-section');
        audioOutputSection.style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error processing your request.');
    }
});
