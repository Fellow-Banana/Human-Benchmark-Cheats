// Number Memory
// Issues with dispatch events break the submit button will fix soon
// For now run the script then start the test, after the time is up each number will be copied into your clipboard
// type stopLoop() to stop the loop

let prevNumber = '';
let intervalID;

const copyNumberToClipboard = () => {
    const bigNumberElement = document.querySelector('.big-number');
    const number = bigNumberElement?.textContent.trim();

    if (number) {
        navigator.clipboard.writeText(number)
            .then(() => console.log('Number copied to clipboard:', number))
            .catch((error) => console.error('Error copying number:', error));
    } else {
        console.log('No number found to copy.');
    }
};

const processNumber = () => {
    intervalID = setInterval(() => {
        const bigNumberElement = document.querySelector('.big-number');
        const number = bigNumberElement?.textContent.trim();

        if (number && number !== prevNumber) {
            console.log('Number found:', number);
            copyNumberToClipboard();
            prevNumber = number;
        }
    }, 1000); // Check every second
};

// Stops the interval loop
const stopLoop = () => {
    clearInterval(intervalID);
    console.log('Number processing stopped.');
};

// Start the process
processNumber();
