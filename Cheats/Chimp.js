// Chimp Test
// Paste this in after clicking start test
// Lower or Raise wait time to change the speed of button presses

let numButtons = 4;
let running = true;
let waitTime = 10; // This is wait time, currently set to 10ms

const clickSequence = async () => {
  while (running) {
    for (let i = 1; i <= numButtons; i++) {
      const cell = document.querySelector(`[data-cellnumber="${i}"]`);
      if (cell) {
        cell.click();
        console.log(`Cell #${i} clicked`);
      } else {
        console.log(`Cell #${i} not found`);
      }
      
      // Change waitTime to adjust the time between button clicks
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  
    // Click the "Continue" button after each round
    const continueButton = document.querySelector('.css-de05nr.e19owgy710');
    if (continueButton) {
      continueButton.click();
      console.log('Clicked on continue button');
    } else {
      console.log('Continue button not found');
    }
  
    // Change waitTime to adjust the time between button clicks
    await new Promise(resolve => setTimeout(resolve, waitTime));
    numButtons++;

    if (numButtons === 41) {stopLoop()}
  }
}

function stopLoop() {
  running = false;
}

// Run the click sequence function
clickSequence();
