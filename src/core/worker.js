import { expose } from "comlink";
import { getRowElements, getColElements, getBoxElements  } from "./helper";

class Sudoku {
  constructor(board) {
    this.board = board;
    this.m = Math.floor(Math.sqrt(board.length));
    this.n = board.length / this.m;
    this.length = board.length;
    this.isFinished = false;
    this.solution = [];
  }

  search(x = 0, y = 0) {
    if (y === this.length) {
      y = 0;
      x += 1;

      if (x === this.length) {
        this.solution.push(this.board.map((v) => [...v]));
        this.isFinished = true;
        return;
      }
    }

    if (this.board[x][y]) {
      y += 1;
      this.search(x, y);
      return;
    }

    const candidates = this.constructCandidates(this.board, x, y, this.m, this.n);
    for (let i = 0; i < candidates.length; i++) {
      this.board[x][y] = candidates[i];
      this.search(x, y + 1);
      this.board[x][y] = 0;

      if (this.isFinished) return;
    }
  }

  constructCandidates(board, x, y, m, n) {
    const set = new Set([
      ...getRowElements(board, x),
      ...getColElements(board, y),
      ...getBoxElements(board, x, y, m, n),
    ]);

    const elements = [];
    for (let i = 1; i <= board.length; i++) {
      if (!set.has(i)) {
        elements.push(i);
      }
    }
    return elements;
  }
}

expose(Sudoku);