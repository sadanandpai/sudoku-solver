import { createEffect, createSignal, Show } from "solid-js";
import SizeSelector from "./components/SizeSelector";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import SudokuWorker from "./core/worker.js?worker";
import { wrap } from "comlink";
import { getNewBoard, getUserBoard, checkIfValidSudoku } from "./core/helper";

const worker = new SudokuWorker();
const Sudoku = wrap(worker);

const App = () => {
  const [size, setSize] = createSignal(9);
  const [boxSize, setBoxSize] = createSignal([]);
  const [board, setBoard] = createSignal([]);
  const [userBoard, setUserBoard] = createSignal([]);
  const [isValid, setIsValid] = createSignal(true);
  const [inProgress, setInProgress] = createSignal(false);
  const [hasSolution, setHasSolution] = createSignal(false);

  const findSolution = async () => {
    const scanBoard = getUserBoard(size());
    const isValid = checkIfValidSudoku(scanBoard, boxSize()[0], boxSize()[1]);

    setIsValid(isValid);
    if (!isValid) return;

    setUserBoard(scanBoard);
    setInProgress(true);
    const sudoku = await new Sudoku(scanBoard);
    await sudoku.search();
    setBoard(await sudoku.solution[0]);
    setInProgress(false);
    setHasSolution(true);
  };

  createEffect(() => {
    setBoard(getNewBoard(size()));
    const m = Math.floor(Math.sqrt(size()));
    const n = size() / m;
    setBoxSize([m, n]);
    setUserBoard(getNewBoard(size()));
    setHasSolution(false);
  });

  const clearBoard = () => {
    setBoard(userBoard().map((v) => [...v]));
    setHasSolution(false);
    setIsValid(true);
  };

  const resetBoard = () => {
    setUserBoard(getNewBoard(size()));
    setBoard(getNewBoard(size()));
    setHasSolution(false);
    setIsValid(true);
  };

  return (
    <>
      <div class={`text-center ${inProgress() || hasSolution() ? "board-disabled" : ""}`}>
        <h1 class="text-3xl m-5">
          Sudoku Solver
          <a
            href="https://github.com/sadanandpai/sudoku-solver"
            target="blank"
            class="absolute right-6"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="github"
              class="w-8 h-8"
            />
          </a>
        </h1>
        <SizeSelector setSize={setSize} size={size} inProgress={inProgress} />

        <Grid
          board={board}
          userBoard={userBoard}
          size={size}
          boxSize={boxSize}
          inProgress={inProgress}
          hasSolution={hasSolution}
        />
        <Controls
          resetBoard={resetBoard}
          findSolution={findSolution}
          clearBoard={clearBoard}
          inProgress={inProgress}
          hasSolution={hasSolution}
        />

        <Show when={!isValid()}>
          <div class="text-red-600 font-bold">Invalid Board Input</div>
        </Show>
      </div>
      <div class="w-full absolute bottom-1 text-center">
        <span>
          Made with ♥ by{" "}
          <a href="https://github.com/sadanandpai" class="text-blue-700">
            Sadanand Akshay Pai
          </a>
        </span>
      </div>
    </>
  );
};

export default App;
