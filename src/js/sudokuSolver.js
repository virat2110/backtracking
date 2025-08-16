export function getSolvingSteps(board) {
  const steps = [];
  const copied = board.map((row) => [...row]);

  function isSafeToPlace(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }

    const startRow = row - (row % 3);
    const startCol = col - (col % 3);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }

    return true;
  }

  function solve(row = 0, col = 0) {
    if (row === 9) return true;
    if (col === 9) return solve(row + 1, 0);
    if (copied[row][col] !== 0) return solve(row, col + 1);

    for (let num = 1; num <= 9; num++) {
      if (isSafeToPlace(copied, row, col, num)) {
        copied[row][col] = num;
        steps.push({ row, col, value: num, type: "fill" });

        if (solve(row, col + 1)) return true;

        copied[row][col] = 0;
        steps.push({ row, col, value: 0, type: "backtrack" });
      }
    }

    return false;
  }

  solve();
  return steps;
}
