const Header = () => {
  return (
    <header>
      <h1 class="text-3xl m-5 text-center">
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
    </header>
  );
};

export default Header;