// Aim Trainer
// This one is simple, simply load the page, don't start it, and run the script

const clickTargetElement = async () => {
  let targetCount = 0;

  while (targetCount < 31) {
    let targetElement;
    while (!targetElement) {
      targetElement = document.querySelector('[data-aim-target="true"].css-q4kt6s.e6yfngs1');
      await new Promise(resolve => setTimeout(resolve, 0)); // Wait as fast as JavaScript allows
    }
    ['mousedown', 'mouseup', 'click'].forEach(type =>
      targetElement.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, clientX: 0, clientY: 0 }))
    );
    console.log('Clicked on the "view-target" element');
    targetCount++;
  }

  console.log('Completed 31 target element clicks');
};

clickTargetElement();
