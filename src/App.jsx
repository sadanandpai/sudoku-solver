import { createEffect, createSignal, Show } from "solid-js";
import { wrap } from "comlink";
import SizeSelector from "./components/SizeSelector";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import SudokuWorker from "./core/worker.js?worker";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getNewBoard, getUserBoard, checkIfValidSudoku, isValidConfig } from "./core/helper";

const worker = new SudokuWorker();
const Sudoku = wrap(worker);

const App = () => {
  const [size, setSize] = createSignal(9); // the size of the sudoku board
  const [boxSize, setBoxSize] = createSignal([]); // width and height of each box in sudoku
  const [board, setBoard] = createSignal([]); // the board displayed in the UI
  const [userBoard, setUserBoard] = createSignal([]); // consists of user input only

  const [isValid, setIsValid] = createSignal(true);
  const [inProgress, setInProgress] = createSignal(false);
  const [hasSolution, setHasSolution] = createSignal(false);

  /**
   * @description find the solution and set the board if input is valid
   */
  const findSolution = async () => {
    const scanBoard = getUserBoard(size());
    const isValid =
      checkIfValidSudoku(scanBoard, boxSize()[0], boxSize()[1]) &&
      isValidConfig(scanBoard, boxSize()[0], boxSize()[1]);

    setIsValid(isValid);
    if (!isValid) return;

    setUserBoard(scanBoard);
    setInProgress(true);
    const sudoku = await new Sudoku(scanBoard);
    await sudoku.search();
    const solution = await sudoku.solution[0];

    if (!solution) {
      // This condition should never occur as we check if the board is valid or not before searching for solution
      setIsValid(false);
      setHasSolution(false);
    } else {
      setBoard(solution);
      setHasSolution(true);
    }

    setInProgress(false);
  };

  /**
   * @description This function is used to reset the board on change of size
   */
  createEffect(() => {
    setBoard(getNewBoard(size()));
    const m = Math.floor(Math.sqrt(size()));
    const n = size() / m;
    setBoxSize([m, n]);
    setUserBoard(getNewBoard(size()));
    setHasSolution(false);
  });

  /**
   * @description clears the board but retains the users entries
   */
  const clearBoard = () => {
    setBoard(userBoard().map((v) => [...v]));
    setHasSolution(false);
    setIsValid(true);
  };

  /**
   * @description completely resets the board
   */
  const resetBoard = () => {
    setUserBoard(getNewBoard(size()));
    setBoard(getNewBoard(size()));
    setHasSolution(false);
    setIsValid(true);
  };

  return (
    <>
      <Header />
      <main class={`text-center ${inProgress() || hasSolution() ? "board-disabled" : ""}`}>
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
      </main>
      <Footer />
    </>
  );
};

export default App;
