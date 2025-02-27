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
        console.log("API Response:", data); // Debugging line

        // Use the correct key for the audio file URL
        const audioUrl = data.fileUrl; 
        console.log("Audio URL:", audioUrl);

        if (!audioUrl) {
            alert("No audio file received.");
            return;
        }

        // Set the correct audio file URL and play it
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.src = audioUrl;
        audioPlayer.style.display = 'block'; 
        audioPlayer.play();
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error processing your request.');
    }
});
