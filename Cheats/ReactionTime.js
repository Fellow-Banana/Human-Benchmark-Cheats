// Reaction Time
// This one is easy, on the starting screen don't start the test, it will start it for you
// Then just past in the script and you are good to go

const clickSequence = async () => {
  // Click on the "view-splash" element to start the test
  const splashElement = document.querySelector('.view-splash.e18o0sx0.css-saet2v.e19owgy77');
  if (splashElement) {
    ['mousedown', 'mouseup', 'click'].forEach(type =>
      splashElement.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, clientX: 0, clientY: 0 }))
    );
    console.log('Clicked on the "view-splash" element to start the test');
  }

  let count = 0;

  while (count < 5) { // Change to 5 tests
    // Wait and click on the "view-go" element
    let goElement;
    while (!goElement) {
      goElement = document.querySelector('.view-go.e18o0sx0.css-saet2v.e19owgy77');
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    ['mousedown', 'mouseup', 'click'].forEach(type =>
      goElement.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, clientX: 0, clientY: 0 }))
    );
    console.log('Clicked on the "view-go" element');

    // Wait and click on the "view-result" element
    let resultElement;
    while (!resultElement) {
      resultElement = document.querySelector('.view-result.e18o0sx0.css-saet2v.e19owgy77');
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    ['mousedown', 'mouseup', 'click'].forEach(type =>
      resultElement.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, clientX: 0, clientY: 0 }))
    );
    console.log('Clicked on the "view-result" element');

    count++;
  }

  console.log('Completed 5 cycles');
};

clickSequence();
