/*
Any live cell with two or three live neighbours survives.
Any dead cell with three live neighbours becomes a live cell.
All other live cells die in the next generation. Similarly, all other dead cells stay dead.
*/


function randomOnOff(){
  return Math.round(Math.random());
}

// First attempt at creating a grid
function createGrid(){ 
  let grid = [];
  let gridSize = 10;

  for (let i = 0; i < gridSize; i++){
    grid[i] = [];
    for (let j = 0; j < gridSize; j++){
      let random = randomOnOff();
      grid[i].push(random);
    }
  }
  return grid;
}


function stepForward(grid){ 
  
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
      if (liveNeighbors < 2) { gridSteppedForward[i].push(0)};
      if (liveNeighbors === 2) {gridSteppedForward[i].push(grid[i][j])};
      if (liveNeighbors > 2) { gridSteppedForward[i].push(1)};
    }
  }
  return gridSteppedForward;
}