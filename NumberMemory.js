// Number Memory
// For some reason the website really doesnt like it
// When using Dispatch events to type the numbers
// And it causes issues with the submit button
// Just paste the number it prints instead
// It will automatically put it in your clipboard

let prevNumber = NaN;

function copyNumberToClipboard() {
    const bigNumberElement = document.querySelector('.big-number');
    
    if (bigNumberElement && bigNumberElement.textContent.trim()) {
        const number = bigNumberElement.textContent.trim();
        
        // Use the Clipboard API to copy the number to clipboard
        navigator.clipboard.writeText(number).then(() => {
            console.log('Number copied to clipboard:', number);
        }).catch((error) => {
            console.error('Error copying number to clipboard:', error);
        });
    } else {
        console.log('No number found to copy.');
    }
}

function processNumber() {
    const intervalID = setInterval(() => {
        const bigNumberElement = document.querySelector('.big-number');

        // Check if the element has text content
        if (bigNumberElement && bigNumberElement.textContent.trim()) {
            const number = bigNumberElement.textContent.trim();
            if (number !== prevNumber) {
                console.log('Number found:', number);
                
                // Copy the new number to clipboard
                copyNumberToClipboard();
                
                prevNumber = number; // Update the global prevNumber
            }
        }
    }, 1000); // Check every 1 second
}

// Start the process
processNumber();