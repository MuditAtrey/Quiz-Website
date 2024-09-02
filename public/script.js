const nameInput = document.getElementById('name-input');
const startBtn = document.getElementById('start-btn');

// Enable/disable the start button based on name input
nameInput.addEventListener('input', () => {
    startBtn.disabled = !nameInput.value;
});

startBtn.addEventListener('click', () => {
    const userName = nameInput.value;
    if (!userName) {
        alert("Please enter your name.");
        return;
    }
    // Start the quiz or perform other actions here
    console.log("Quiz started! User name:", userName);
});

function startQuiz() {
    saveUsernameToLocalStorage(userName);
    isQuizActive = true;
    userName = nameInput.value;
    loadQuestion();
    startTimer();

    // Send the username to the server
    fetch('/submit-username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: userName })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error submitting username');
        }
        console.log('Username submitted successfully');
    })
    .catch(error => {
        console.error('Error submitting username:', error);
        alert('Failed to submit username. Please try again later.');
    });
}