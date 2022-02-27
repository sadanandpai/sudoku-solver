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

  debugger;
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

export const getMediumBoard = (size) => {
  const board = Array.from(new Array(size), () => Array.from(new Array(size), () => ""));
  board[3][0] = 7;
  board[5][0] = 1;
  board[7][1] = 8;
  board[8][1] = 5;
  board[2][3] = 6;
  board[4][3] = 4;
  board[6][3] = 1;
  board[1][4] = 3;
  board[6][4] = 2;
  board[1][5] = 5;
  board[3][6] = 3;
  board[4][6] = 8;
  board[8][6] = 6;

  board[0][7] = 1;
  board[2][7] = 7;
  board[7][7] = 4;
  board[0][8] = 2;
  return board;
};
