import Square from "./Square";

const Grid = ({ board, userBoard, size, boxSize }) => {
  return (
    <div class="relative">
      <div
        class={`inline-grid absolute pointer-events-none grid-rows-${boxSize()[1]} grid-cols-${
          boxSize()[0]
        }`}
      >
        <For each={board()}>
          {() => (
            <div class={`h-${boxSize()[0] * 8} w-${boxSize()[1] * 8} border border-black`}></div>
          )}
        </For>
      </div>

      {/* <div class="grid grid-rows-2 grid-cols-2 grid-rows-9 grid-cols-9 grid-rows-8 grid-cols-8 grid-rows-6 grid-cols-6 grid-rows-4 grid-cols-4 grid-rows-3 grid-cols-3 h-32 h-24 h-16 h-8 w-32 w-24 w-16 w-8"></div> */}

      <div id="userBoard" class={`inline-grid grid-rows-${size()} grid-cols-${size()}`}>
        <For each={board()}>
          {(row, i) => (
            <For each={row}>
              {(value, j) => (
                <Square value={value} i={i()} j={j()} highlight={!!userBoard()[i()]?.[j()]} />
              )}
            </For>
          )}
        </For>
      </div>
    </div>
  );
};

export default Grid;
