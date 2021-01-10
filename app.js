/*
Any live cell with two or three live neighbours survives.
Any dead cell with three live neighbours becomes a live cell.
All other live cells die in the next generation. Similarly, all other dead cells stay dead.
*/

const initiatePanel = grid => {
  // grab stepForward button
  let stepForwardBtn = document.getElementById('stepForwardBtn');

  // call stepForward with button
  stepForwardBtn.addEventListener("click", function(){
    grid = stepForward(grid);
    displayStepForward(grid);
  })
}


// Create the grid
function createGrid() {
  let gridHTML = document.getElementById('grid');

  let grid = [];
  let gridSize = 80;

  for (let i = 0; i < gridSize; i++) {
    let rowHTML = document.createElement('div'); // create row
    rowHTML.className = 'row'; // add row class to row
    rowHTML.id = 'row-' + i; // add id to row
    gridHTML.appendChild(rowHTML); // add row to grid

    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      let cellHTML = document.createElement('div'); // create cell
      cellHTML.className = 'cell'; // add cell class to cell
      cellHTML.id = 'r' + i + 'c' + j; // add id to cell
      cellHTML.style.width = 800 / gridSize + 'px'; // set cell width
      cellHTML.style.height = (800 - 4 * gridSize) / gridSize + 'px'; // set cell height
      cellHTML.style.backgroundColor = 'lightgrey';
      rowHTML.appendChild(cellHTML); // add cell to row

      grid[i].push(0); // Create a full grid


      // add click listener to change from populated/unpopulated
      cellHTML.addEventListener("click", function () {
        if (grid[i][j] === 0) {
          grid[i][j] = 1;
          cellHTML.style.backgroundColor = 'grey';
        } else {
          grid[i][j] = 0;
          cellHTML.style.backgroundColor = 'lightgrey';
        }
      });
    }
  }

  return grid;
}


const stepForward = grid => { 
  
  let gridSteppedForward = []; // define a next-iteration grid to push to
  
  for (let i = 0; i < grid.length; i++){ // step into the grid
    
    gridSteppedForward[i]=[]; // create an array to push to within the next iteration grid
    
    for (let j = 0; j < grid[i].length; j++){
      let liveNeighbors = 0; // define live cell number
      
      // check for surrounding cells and then if cell exists check for populated/unpopulated.
      // check row above cell
      for (let k = -1; k < 2; k++){ 
        if (grid[i-1] && grid[i-1][j + k] && grid[i-1][j + k] === 1){
          liveNeighbors++;
        }
      } 
      // check row cell is on
      if (grid[i][j-1] && grid[i][j-1] === 1){
        liveNeighbors++;
      }    
      if (grid[i][j+1] && grid[i][j+1] === 1){
        liveNeighbors++;
      }
      // check row below cell
      for (let k = -1; k < 2; k++){
        if (grid[i+1] && grid[i+1][j + k] && grid[i+1][j + k] === 1){
          liveNeighbors++;
        }
      }
      
      // rules to determine if next iteration of cell should be populated or unpopulated
      if (liveNeighbors < 2) { gridSteppedForward[i].push(0) };
      if (liveNeighbors === 2 && grid[i][j] === 0) { gridSteppedForward[i].push(0) };
      if (liveNeighbors === 2 && grid[i][j] === 1) { gridSteppedForward[i].push(1) };
      if (liveNeighbors === 3) { gridSteppedForward[i].push(1) };
      if (liveNeighbors > 3) { gridSteppedForward[i].push(0) };
    }
  }

  return gridSteppedForward;
}

const displayStepForward = grid => {
  for (let i = 0; i < grid.length; i++){
    for (let j = 0; j < grid[i].length; j++){
      let workingCell = document.getElementById('r' + i + 'c' + j);
      grid[i][j] === 0 ? 
        workingCell.style.backgroundColor = 'lightgrey' : 
        workingCell.style.backgroundColor = 'grey';
    }
  }
}

grid = createGrid();
initiatePanel(grid);