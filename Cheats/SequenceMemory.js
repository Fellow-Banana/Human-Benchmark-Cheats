// Sequence Memory
// Again fairly simple just paste the script in then start the test
// The script will do the rest


const monitorTiles = async () => {
  const gridSelector = '.css-1qvtbrk.e19owgy78 .squares';
  const flippedClass = 'active';
  let previousState = null;
  let flippedTiles = [];
  let intervalId = null; // Store the interval ID to stop it later

  const getGridState = () => {
    const gridContainer = document.querySelector(gridSelector);
    if (!gridContainer) return null;
    return Array.from(gridContainer.children).map(row =>
      Array.from(row.children).map(tile => tile.classList.contains(flippedClass))
    );
  };

  const clickTile = (rowIndex, colIndex) => {
    const targetTile = document.querySelector(`${gridSelector} > :nth-child(${rowIndex + 1}) > :nth-child(${colIndex + 1})`);
    if (targetTile) {
      ['mousedown', 'mouseup', 'click'].forEach(type =>
        targetTile.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true })));
      console.log(`Clicked on tile at (${rowIndex}, ${colIndex})`);
    }
  };

  const printBoardState = (state) => {
    console.log('Current board state:');
    state.forEach(row => {
      console.log(row.map(tile => (tile ? '1' : '0')).join(' '));
    });
  };

  const monitorGrid = async () => {
    intervalId = setInterval(() => {
      const gridState = getGridState();
      if (!gridState) return;

      if (previousState && JSON.stringify(gridState) !== JSON.stringify(previousState)) {
        console.log('Grid state changed!');
        printBoardState(gridState);

        const isBoardEmpty = gridState.every(row => row.every(tile => !tile));

        if (isBoardEmpty) {
          console.log('Board is empty. Clicking previously active tiles...');
          flippedTiles.forEach(tile => clickTile(tile.rowIndex, tile.colIndex));
          flippedTiles = [];
        } else {
          gridState.forEach((row, rowIndex) =>
            row.forEach((tile, colIndex) => {
              if (tile) flippedTiles.push({ rowIndex, colIndex });
            })
          );
        }
      }

      previousState = gridState;
    }, 500);
  };

  const stopLoop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      console.log('Grid monitoring stopped.');
    }
  };

  monitorGrid();
  
};

monitorTiles();
