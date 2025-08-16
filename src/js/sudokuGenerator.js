// sudokuGenerator.js

function isSafe(grid, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num || grid[x][col] === num) return false;
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[startRow + r][startCol + c] === num) return false;
    }
  }

  return true;
}

function fillSudoku(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        const nums = [...Array(9).keys()].map((n) => n + 1);
        for (let i = nums.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [nums[i], nums[j]] = [nums[j], nums[i]];
        }

        for (let num of nums) {
          if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillSudoku(grid)) return true;
            grid[row][col] = 0;
          }
        }

        return false;
      }
    }
  }

  return true;
}

function removeCells(grid, blanks) {
  const removed = new Set();
  while (removed.size < blanks) {
    const i = Math.floor(Math.random() * 9);
    const j = Math.floor(Math.random() * 9);
    const key = `${i},${j}`;
    if (!removed.has(key)) {
      grid[i][j] = 0;
      removed.add(key);
    }
  }
}

export function generateSudoku(difficulty = "easy") {
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillSudoku(grid);

  let blanks = 20; // default: easy
  if (difficulty === "medium") blanks = 35;
  else if (difficulty === "hard") blanks = 50;

  removeCells(grid, blanks);
  return grid;
}
