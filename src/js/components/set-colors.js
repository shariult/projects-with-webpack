//==========================================
// Imports
//==========================================
import variables from "./variables";

//==========================================
// Variables
//==========================================
const { quoteText, author, colors, textColors } = variables;

//==========================================
// Code
//==========================================
const setColors = () => {
  const colorNum = Math.floor(Math.random() * colors.length);
  const textColor = textColors[colorNum];
  const bgColor =
    colors[colorNum][Math.floor(Math.random() * colors[colorNum].length)];
  quoteText.style.color = textColor;
  quoteText.style.backgroundColor = bgColor;
  author.style.color = textColor;
};

//==========================================
// Exports
//==========================================
export default setColors;
