// Typing Test
// Very simple just start the test, then run the script

let waitTime = 0;

const gatherAndType = async () => {
  const spans = document.querySelectorAll('.letters.notranslate span');
  let textToType = Array.from(spans).map(span => span.textContent).join('');

  console.log('Text to type:', textToType);

  const targetDiv = document.querySelector('.letters.notranslate');
  if (!targetDiv) {
    console.log('Target div not found');
    return;
  }

  targetDiv.focus();

  for (let char of textToType) {
    const keyEvent = (type) => new KeyboardEvent(type, {
      key: char,
      code: `Key${char.toUpperCase()}`,
      keyCode: char.charCodeAt(0),
      which: char.charCodeAt(0),
      bubbles: true,
    });

    targetDiv.dispatchEvent(keyEvent('keydown'));
    targetDiv.dispatchEvent(keyEvent('keypress'));
    targetDiv.dispatchEvent(keyEvent('keyup'));

    targetDiv.dispatchEvent(new InputEvent('input', {
      data: char,
      bubbles: true,
    }));

    await new Promise(resolve => setTimeout(resolve, waitTime)); // Adjust delay if needed
  }

  console.log('Typing completed!');
};

gatherAndType();
