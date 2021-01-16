/*
Any live cell with two or three live neighbours survives.
Any dead cell with three live neighbours becomes a live cell.
All other live cells die in the next generation. Similarly, all other dead cells stay dead.
*/

// global variables
let gridSize;
let gridHTML = document.getElementById('grid');


const initiatePanel = grid => {
  // grab playback buttons
  let stepForwardBtn = document.getElementById('stepForwardBtn');
  let playPauseBtn = document.getElementById('playPauseBtn');
  let refreshBtn = document.getElementById('refreshBtn');
  let gridSizeSlider = document.getElementById('gridSizeSlider');
  let playbackSpeedSlider = document.getElementById('playbackSpeedSlider');
  
  // we have to initialize setInterval as a numeric value to stop from automatically running
  let playIntervalId = 0; 
  // A simple counter to toggle play and pause
  let playCount = 2;

  // change gridsize when the slider moves
  gridSizeSlider.onchange = function(){
    gridSize = +gridSizeSlider.value;
    grid = clearGrid(grid, gridSize);
  }

  // call stepForward with button
  stepForwardBtn.addEventListener("click", function(){
    grid = stepForwardGrid(grid);
    displayStepForward(grid);
  })

  // playPauseBtn is setup with a setInterval function to simulate playback 
  playPauseBtn.addEventListener("click", function(){
    if (playCount % 2 === 0){
      playPauseBtn.src = 'img/pause.png';
      playCount++;
      playIntervalId = setInterval(function(){
        grid = stepForwardGrid(grid);
        displayStepForward(grid);
      }, playbackSpeedSlider.value)
    } else {
      playPauseBtn.src = 'img/play.png';
      playCount++;
      clearInterval(playIntervalId);
    }
  })

  // refreshBtn just clears the grid
  refreshBtn.addEventListener("click", function(){
    const gridSize = +document.getElementById('gridSizeSlider').value;
    grid = clearGrid(grid, gridSize);
  });
}

// simple function to clear the grid and recreate it
const clearGrid = (grid, gridSize) => {
  gridHTML.innerHTML = "";
  grid = createGrid(gridSize);
  debugger;
  return grid;
}

// Create the grid
function createGrid(gridSize = 50) {
  
  let grid = [];
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
      cellHTML.style.height = (800 - 4.2 * gridSize) / gridSize + 'px'; // set cell height
      cellHTML.style.backgroundColor = 'lightgrey';
      rowHTML.appendChild(cellHTML); // add cell to row

      grid[i].push(0); // Create a full grid

      // add click listener to change from populated/unpopulated
      cellHTML.addEventListener("click", function () {
        if (grid[i][j] === 0) {
          grid[i][j] = 1;
          console.log(grid);
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


const stepForwardGrid = grid => { 
  
  let gridSteppedForward = []; // define a next-iteration grid to push to
  
  for (let i = 0; i < grid.length; i++){ // step into the grid
    
    gridSteppedForward[i] = []; // create an array to push to within the next iteration grid
    
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
      // get a cell from the id created in createGrid
      let workingCell = document.getElementById('r' + i + 'c' + j);
      
      // add eventlistener just in case user clicks after stepping forward
      workingCell.addEventListener("click", function(){
        grid[i][j] === 0 ? grid[i][j] = 1 : grid[i][j] = 0;
      });
      
      // display the current grid after step forward
      grid[i][j] === 0 ? 
        workingCell.style.backgroundColor = 'lightgrey' : 
        workingCell.style.backgroundColor = 'grey';
    }
  }
}

// start the app
grid = createGrid();
initiatePanel(grid);