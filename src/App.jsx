import { createEffect, createSignal } from "solid-js";
import { wrap } from "comlink";
import SudokuWorker from "./core/worker.js?worker";
import Grid from "./components/Grid";
import SizeSelector from "./components/SizeSelector";
import { getNewBoard, getUserBoard } from "./core/helper";

const worker = new SudokuWorker();
const Sudoku = wrap(worker);

const App = () => {
  const [size, setSize] = createSignal(9);
  const [boxSize, setBoxSize] = createSignal([]);
  const [board, setBoard] = createSignal([]);
  const [userBoard, setUserBoard] = createSignal([]);

  const generateBoard = async () => {
    const scanBoard = getUserBoard(size());
    setUserBoard(scanBoard);

    const x = await new Sudoku(scanBoard);
    await x.search();
    setBoard(await x.solution[0]);
  };

  createEffect(() => {
    setBoard(getNewBoard(size()));
    const m = Math.floor(Math.sqrt(size()));
    const n = size() / m;
    setBoxSize([m, n]);
    setUserBoard(getNewBoard(size()));
  });

  const clearBoard = () => {
    setBoard(userBoard());
  }

  const resetBoard = () => {
    setBoard(getNewBoard(size()));
    setUserBoard(getNewBoard(size()));
  }

  return (
    <div class="text-center">
      <h1 class="text-3xl m-5">Sudoku Solver</h1>
      <SizeSelector setSize={setSize} size={size} />

      <Grid board={board} userBoard={userBoard} size={size} boxSize={boxSize} />
      <button class="px-4 py-1 rounded-md m-3 border-2 border-blue-700" onClick={clearBoard}>Clear</button>
      <button class="px-4 py-1 rounded-md m-3 border-2 bg-blue-800 text-white" onClick={generateBoard}>Search</button>
      <button class="px-4 py-1 rounded-md m-3 border-2 border-blue-700" onClick={resetBoard}>Reset</button>
    </div>
  );
};

export default App;
