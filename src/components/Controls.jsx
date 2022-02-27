const Controls = ({ resetBoard, findSolution, clearBoard, inProgress }) => {
  return (
    <div class="flex justify-center">
      <button class="px-4 py-1 rounded-md m-3 border-2 border-blue-700" onClick={resetBoard}>
        Reset
      </button>
      <button
        class="flex justify-center px-4 py-1 rounded-md m-3 bg-blue-800 border-2 border-blue-700 text-white w-20 disabled"
        onClick={findSolution}
      >
        <Show when={!inProgress()}>Search</Show>

        <Show when={inProgress()}>
          <div
            style="border-top-color:transparent"
            class="w-6 h-6 border-4 border-blue-400 border-solid rounded-full animate-spin"
          ></div>
        </Show>
      </button>

      <button class="px-4 py-1 rounded-md m-3 border-2 border-blue-700" onClick={clearBoard}>
        Clear
      </button>
    </div>
  );
};

export default Controls;
