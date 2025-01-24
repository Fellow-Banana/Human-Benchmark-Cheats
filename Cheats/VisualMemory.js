// Visual Memory
// Simple to use, paste in the script before starting the test
// Then start the test and watch the magic happen
// If you ever want to stop typle stopLoop()

const monitorTiles = async () => {
  const gridSelector = '.css-hvbk5q.eut2yre0'; // Selector for the grid container
  const tileSelector = '.css-lxtdud.eut2yre1'; // Selector for each tile
  const flippedClass = 'active'; // Class name indicating a flipped tile
  let initialState = null; // To store the initial state of the grid
  let gridChangedOnce = false; // Flag to track if grid has changed once
  let flippedTiles = []; // Store the coordinates of flipped tiles
  let intervalID, emptyIntervalID; // Hold interval IDs for stopping

  const getGridState = () => {
    const gridContainer = document.querySelector(gridSelector);
    if (!gridContainer) return null;

    const rows = Array.from(gridContainer.children); // Each row is a direct child
    return rows.map(row => Array.from(row.children).map(tile => tile.classList.contains(flippedClass)));
  };

  const printBoardReadyForInput = () => {
    console.log('Board is populated and ready for user input!');
  };

  const clickTile = (rowIndex, colIndex) => {
    const gridContainer = document.querySelector(gridSelector);
    const targetTile = gridContainer?.children[rowIndex]?.children[colIndex];
    if (targetTile) {
      ['mousedown', 'mouseup', 'click'].forEach(type =>
        targetTile.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, clientX: 0, clientY: 0 }))
      );
      console.log(`Clicked on tile at (${rowIndex}, ${colIndex})`);
    }
  };

  const stopLoop = () => {
    if (intervalID) clearInterval(intervalID); // Stop monitoring grid changes
    if (emptyIntervalID) clearInterval(emptyIntervalID); // Stop monitoring empty board
    console.log('Monitoring stopped.');
  };

  const monitorGrid = async () => {
    intervalID = setInterval(() => {
      const gridState = getGridState();
      if (!gridState) return;

      // Initial grid state capture
      if (!initialState) {
        initialState = gridState;
        console.log('Captured initial board state. Waiting for changes...');
        return;
      }

      const isGridChanged = !gridState.every((row, rowIndex) =>
        row.every((tile, colIndex) => tile === initialState[rowIndex][colIndex])
      );

      if (!gridChangedOnce && isGridChanged) {
        gridChangedOnce = true; // Grid has flipped or changed from the initial state
        flippedTiles = gridState.reduce((tiles, row, rowIndex) => {
          row.forEach((tile, colIndex) => {
            if (tile) tiles.push({ rowIndex, colIndex });
          });
          return tiles;
        }, []);
        console.log('Grid state changed. Waiting for full update...');
        return;
      }

      if (gridChangedOnce && isGridChanged) {
        printBoardReadyForInput();
        clearInterval(intervalID); // Stop monitoring once it's all good
        setTimeout(() => {
          flippedTiles.forEach(tile => clickTile(tile.rowIndex, tile.colIndex));
          setTimeout(() => {
            console.log('Waiting for the board to reset...');
            monitorEmptyBoard();
          }, 500);
        }, 1500);
      }
    }, 500); // Check for grid updates every 500ms
  };

  const monitorEmptyBoard = async () => {
    emptyIntervalID = setInterval(() => {
      const gridState = getGridState();
      if (!gridState) return;

      const isEmpty = gridState.every(row => row.every(tile => !tile));

      if (isEmpty) {
        console.log('Board is empty. Starting a new round!');
        clearInterval(emptyIntervalID);
        initialState = null;
        gridChangedOnce = false;
        monitorGrid(); // Start the next round
      }
    }, 500); // Check for empty board every 500ms
  };

  monitorGrid(); // Start the process

  // Expose the stopLoop function to be called externally
  window.stopLoop = stopLoop;
};
monitorTiles();
