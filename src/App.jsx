import { createEffect, createSignal } from "solid-js";
import { wrap } from "comlink";
import SudokuWorker from "./core/worker.js?worker";
import Grid from "./components/Grid";
import SizeSelector from "./components/SizeSelector";
import { getNewBoard, getUserBoard, checkIfValidSudoku, getMediumBoard } from "./core/helper";
import { Show } from "solid-js";
import Controls from "./components/Controls";

const worker = new SudokuWorker();
const Sudoku = wrap(worker);

const App = () => {
  const [size, setSize] = createSignal(9);
  const [boxSize, setBoxSize] = createSignal([]);
  const [board, setBoard] = createSignal([]);
  const [userBoard, setUserBoard] = createSignal([]);
  const [isValid, setIsValid] = createSignal(true);
  const [inProgress, setInProgress] = createSignal(false);

  const findSolution = async () => {
    const scanBoard = getUserBoard(size());
    setUserBoard(scanBoard);

    const isValid = checkIfValidSudoku(scanBoard, boxSize()[0], boxSize()[1]);
    setIsValid(isValid);

    if (!isValid) return;

    setInProgress(true);
    const sudoku = await new Sudoku(scanBoard);
    await sudoku.search();
    setBoard(await sudoku.solution[0]);
    setInProgress(false);
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
  };

  const resetBoard = () => {
    setUserBoard(getNewBoard(size()));
    setBoard(getNewBoard(size()));
  };

  return (
    <div class="text-center">
      <h1 class="text-3xl m-5">Sudoku Solver</h1>
      <SizeSelector setSize={setSize} size={size} />
      <Grid board={board} userBoard={userBoard} size={size} boxSize={boxSize} />
      <Controls
        resetBoard={resetBoard}
        findSolution={findSolution}
        clearBoard={clearBoard}
        inProgress={inProgress}
      />

      <Show when={!isValid()}>
        <div class="text-red-500">Invalid Board Input</div>
      </Show>
    </div>
  );
};

export default App;
