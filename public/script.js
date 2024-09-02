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