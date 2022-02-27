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
