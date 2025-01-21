// Verbal Memory
// To stop simply type stopLoop() into the console

const buttons = document.querySelectorAll('.css-de05nr.e19owgy710');

// Loop through each button and assign an ID based on its text content
buttons.forEach((button, index) => {
    // Assign unique IDs based on the text of the button
    if (button.textContent.trim().toUpperCase() === 'SEEN') {
        button.id = 'seen'; // Assign 'seen' to the SEEN button
    } else if (button.textContent.trim().toUpperCase() === 'NEW') {
        button.id = 'new'; // Assign 'new' to the NEW button
    }
});

let words = []; // Add your known words here
let shouldStop = false

function loopWords() {
    // Stop if Necessary
    if (shouldStop) return;
    
    // Get the word from the div
    let currentWord = document.querySelector('.word').textContent;

    // Check if the word is in the list 'words'
    if (words.includes(currentWord)) {
        // If it is, click the 'seen' button
        document.getElementById('seen').click();
    } else {
        // If not, click the 'new' button and add it to the 'words' list
        document.getElementById('new').click();
        words.push(currentWord); // Add the new word to the list
    }
}

// Run the loop every 0.5 seconds
let intervalID = setInterval(loopWords, 50); // 50ms = 0.05 seconds or 20 words per second

// To stop the loop immediately, set the flag to true
function stopLoop() {
    shouldStop = true;
    clearInterval(intervalID); // Clear the interval to stop further executions
}
