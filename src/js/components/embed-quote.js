//==========================================
// Imports
//==========================================
import variables from "./variables";
import getQuote from "./get-quote";
import setColors from "./set-colors";

//==========================================
// Variables
//==========================================
const { quoteText, author } = variables;

//==========================================
// Code
//==========================================
const embedQuote = async () => {
  const data = await getQuote();
  quoteText.textContent = data.quote;
  author.textContent = data.author;
  setColors();
};

//==========================================
// Exports
//==========================================
export default embedQuote;
