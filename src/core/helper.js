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

/**
 * @description Check if all the sudoku board rules are followed
 * @param {*} board
 * @param {*} m Box Row size
 * @param {*} n Box Column size
 * @returns boolean
 */
export const checkIfValidSudoku = (board, m, n) => {
  // Check if numbers entered are in the range for the given size
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (Number.isNaN(+board[i][j])) {
        return false;
      }
      if (+board[i][j] > board.length) {
        return false;
      }
    }
  }

  // Check if elements repeat in the row
  for (let row in board) {
    const elements = getRowElements(board, row);
    if (new Set(elements).size !== elements.length) {
      return false;
    }
  }

  // Check if elements repeat in the column
  for (let col in board) {
    const elements = getColElements(board, col);
    if (new Set(elements).size !== elements.length) {
      return false;
    }
  }

  // Check if elements repeat in the each box
  for (let i = 0; i < board.length; i += m) {
    for (let j = 0; j < board.length; j += n) {
      const elements = getBoxElements(board, i, j, m, n);
      if (new Set(elements).size !== elements.length) {
        return false;
      }
    }
  }

  return true;  // if no rules are violated, returns true
};

/**
 * @description Check if the board can have a solution or not (even though the input passes the rules solution may not be present)
 * @param {*} board 
 * @param {*} m 
 * @param {*} n 
 * @returns 
 */
export const isValidConfig = (board, m, n) => {
  // For each box in the board
  for (let i = 0; i < board.length; i += m) {
    for (let j = 0; j < board.length; j += n) {
      const elements = getBoxElements(board, i, j, m, n);
      const toBeFilledElements = getInverseElements(board, elements);

      // Check if even one of the unfilled elements have no place to sit in the their respective box
      let isElementNotFit = toBeFilledElements.some((element) => {
        for (let a = i; a < i + m; a++) {
          for (let b = j; b < j + n; b++) {
            if (
              !board[a][b] &&
              isElementEligibleinRow(board, a, element) &&
              isElementEligibleinColumn(board, b, element)
            ) {
              return false;
            }
          }
        }
        return true;
      });

      // Element cannot sit anywhere in the box (that means there cannot exist a solution)
      if (isElementNotFit) {
        return false;
      }
    }
  }

  return true;
};

/**
 * @description Get the array of elements in the box which are not present in the box
 * @param {*} board 
 * @param {*} elements 
 * @returns 
 */
const getInverseElements = (board, elements) => {
  const set = new Set(elements);
  const inverseElements = [];
  for (let i = 1; i <= board.length; i++) {
    if (!set.has(i)) {
      inverseElements.push(i);
    }
  }
  return inverseElements;
};

// can a given element be placed in the row
const isElementEligibleinRow = (board, x, element) => !board[x].some((v) => v === element);

// can a given element be placed in the column
const isElementEligibleinColumn = (board, y, element) =>
  !board.map((row) => row[y]).some((v) => v === element);

export const getRowElements = (board, x) => board[x].filter((v) => v);
export const getColElements = (board, y) => board.map((row) => row[y]).filter((v) => v);
export const getBoxElements = (board, x, y, m, n) => {
  const row = Math.floor(x / m) * m;
  const col = Math.floor(y / n) * n;

  const elements = [];
  for (let i = row; i < row + m; i++) {
    for (let j = col; j < col + n; j++) {
      if (board[i][j]) {
        elements.push(board[i][j]);
      }
    }
  }
  return elements;
};
