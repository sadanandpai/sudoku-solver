export const getNewBoard = (size) => {
  return Array.from(new Array(size), () => Array.from(new Array(size), () => ""));
};

export const getUserBoard = (size) => {
    const board = getNewBoard(size);
    const boardElement = document.getElementById("userBoard");
    for (let input of boardElement.children) {
        board[+input.dataset.i][+input.dataset.j] = +input.value;
    }
    return board;
}
