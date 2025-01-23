// Verbal Memory
// To stop simply type stopLoop() into the console

let waitTime = 0; // Adjust if going too fast
const buttons = document.querySelectorAll('.css-de05nr.e19owgy710');

// Assign IDs to buttons based on their text content
buttons.forEach(button => {
    const text = button.textContent.trim().toUpperCase();
    if (text === 'SEEN') button.id = 'seen';
    else if (text === 'NEW') button.id = 'new';
});

let words = [];
let shouldStop = false;

function loopWords() {
    if (shouldStop) return;
    
    const currentWord = document.querySelector('.word').textContent;

    if (words.includes(currentWord)) {
        document.getElementById('seen').click();
    } else {
        document.getElementById('new').click();
        words.push(currentWord); // Add new word to the list
    }
}

let intervalID = setInterval(loopWords, waitTime); // 50ms = 20 words per second

function stopLoop() {
    shouldStop = true;
    clearInterval(intervalID); // Stop the loop
}
