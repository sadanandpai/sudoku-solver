export const getNewBoard = (size) => {
  return Array.from(new Array(size), () => Array.from(new Array(size), () => ""));
};

export const getUserBoard = (size) => {
  const board = getNewBoard(size);
  const boardElement = document.getElementById("userBoard");
  for (let input of boardElement.children) {
    board[+input.dataset.i][+input.dataset.j] = +input.value || "";
  }
  return board;
};

export const checkIfValidSudoku = (board, m, n) => {
  for (let row in board) {
    const elements = getRowElements(board, row);
    if (new Set(elements).size !== elements.length) {
      return false;
    }
  }

  for (let col in board) {
    const elements = getColElements(board, col);
    if (new Set(elements).size !== elements.length) {
      return false;
    }
  }

  for (let i = 0; i < board.length; i += m) {
    for (let j = 0; j < board.length; j += n) {
      const elements = getBoxElements(board, i, j, m, n);
      if (new Set(elements).size !== elements.length) {
        return false;
      }
    }
  }

  return true;
};

export const getRowElements = (board, x) => board[x].filter((v) => v);
export const getColElements = (board, y) => board.map((row) => row[y]).filter((v) => v);
export const getBoxElements = (board, x, y, m, n) => {
  const row = Math.floor(x / m) * m;
  const col = Math.floor(y / n) * n;

  const elements = [];
  for (let i = row; i < row + m; i++) {
    for (let j = col; j < col + n; j++) {
      if(board[i][j]){
        elements.push(board[i][j]);
      }
    }
  }
  return elements;
};
