import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), solid()],
  build: {
    target: "es2017",
  },
  base: "/sudoku-solver/dist/",
});
