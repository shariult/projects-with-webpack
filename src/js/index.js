//==========================================
// Imports
//==========================================
import variables from "./components/variables";
import embedQuote from "./components/embed-quote";
import setColors from "./components/set-colors";

//==========================================
// Variables
//==========================================

//==========================================
// Code
//==========================================
const { btn } = variables;
btn.addEventListener("click", () => {
  embedQuote();
  setColors();
});

//==========================================
// Exports
//==========================================
