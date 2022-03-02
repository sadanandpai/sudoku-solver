const keyDownandler = (e) => {
  if (e.key === "e" || e.key === "E" || e.key === "0") {
    e.preventDefault();
  }
};

const inputHandler = (e) => {
  if (Number.isNaN(+e.target.value)) {
    e.target.value = "";
  } else if (+e.target.value > 9) {
    e.target.value = +e.target.value.slice(-1);
  }
  e.target.nextElementSibling?.focus();
};

const Square = ({ value = "", i, j, highlight }) => {  
  return (
    <input
      class={"h-8 w-8 p-2.5 text-base outline-1 outline outline-gray-400" + (highlight ? " bg-blue-200" : "")}
      type="number"
      min="1"
      max="9"
      data-i={i}
      data-j={j}
      onKeyDown={keyDownandler}
      onInput={inputHandler}
      value={value}
    />
  );
};

export default Square;
