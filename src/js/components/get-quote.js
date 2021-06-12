//==========================================
// Imports
//==========================================
import variables from "./variables";

//==========================================
// Variables
//==========================================
const { url } = variables;

//==========================================
// Code
//==========================================
const getQuote = async () => {
  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      const data = {
        quote: res.status,
        author: "server",
      };
      return data;
    }
    return res.json();
  } catch (err) {
    const data = {
      quote: err,
      author: "server",
    };
    return data;
  }
};

//==========================================
// Exports
//==========================================
export default getQuote;
