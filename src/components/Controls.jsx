const Controls = ({ resetBoard, findSolution, clearBoard, inProgress, hasSolution }) => {
  return (
    <div class="flex justify-center">
      <button
        class="px-4 py-1 rounded-md m-3 border-2 border-blue-700"
        disabled={inProgress()}
        onClick={resetBoard}
      >
        Reset
      </button>
      <button
        class="flex justify-center px-4 py-1 rounded-md m-3 bg-blue-800 border-2 border-blue-700 text-white w-20 disabled:bg-blue-200 disabled:border-blue-300"
        onClick={findSolution}
        disabled={inProgress() || hasSolution()}
      >
        <Show when={!inProgress()}>Solve</Show>

        <Show when={inProgress()}>
          <div
            style="border-top-color:transparent"
            class="w-6 h-6 border-4 border-blue-400 border-solid rounded-full animate-spin"
          ></div>
        </Show>
      </button>

      <button
        class="px-4 py-1 rounded-md m-3 border-2 border-blue-700"
        disabled={inProgress()}
        onClick={clearBoard}
      >
        Clear
      </button>
    </div>
  );
};

export default Controls;
