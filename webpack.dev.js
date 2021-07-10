//==========================================
// Imports
//==========================================
const concat = require("concat"),
  fs = require("fs"),
  path = require("path");

//==========================================
// Environment setup
//==========================================
const projectDir = "./src"; // Project directory
const files = [
  {
    htmlFileName: "index.html",
    jsFiles: ["main.js", "index.js"],
  },
  {
    htmlFileName: "starter.html",
    jsFiles: ["main.js"],
  },
];

// const files = autoConfig();
const buildDir = "./dist";

//==========================================
// Variables
//==========================================
const appPath = {
  mode: process.env.NODE_ENV,
  src: `${projectDir}`,
  jsDir: `${projectDir}/js`,
  mainJsFile: `${projectDir}/js/main.js`,
  mainJsKey: "main",
  scssDir: `${projectDir}/scss`,
  scssFile: "style.scss",
  libDir: `${projectDir}/jslib`,
  libFile: "vendor.js",
  imgDir: `${projectDir}/img`,
  favicon: `favicon.ico`,
  finalDir: `${buildDir}`,
  finalCssDir: "./css",
  finalCssIconDir: "./css/webfonts",
  publicIconsPath: "./webfonts", // no need for ./css/icons
  finalJsDir: "./js",
  finalLibDir: "./js/lib",
  finalImgDir: "./img",
};

//Initial Js File Text
let jsFileText = `//==========================================
// Imports
//==========================================

//==========================================
// Variables
//==========================================

//==========================================
// Code
//==========================================

//==========================================
// Exports
//==========================================`;
// Initial Html File Text
const htmlFileText = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="img/favicon.ico" />
    <title>Projects with Webpack 5</title>
  </head>
  <body>
    <!-- Starter HTML File  -->
  </body>
</html>`;

//==========================================
// Code
//==========================================
// Reset Funcitons
function resetStarter() {
  //deleting git directory
  function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(function (file, index) {
        let curPath = path + "/" + file;
        if (fs.lstatSync(curPath).isDirectory()) {
          // recurse
          deleteFolderRecursive(curPath);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }
  try {
    deleteFolderRecursive("./.git");
    deleteFolderRecursive("./.idea");
    deleteFolderRecursive("./src/js/components");
    // file cleanup
    fs.writeFileSync("./src/index.html", htmlFileText);
    fs.writeFileSync("./src/js/index.js", jsFileText);
    if (fs.existsSync("./LICENSE")) {
      fs.unlinkSync("./LICENSE");
    }
    fs.unlinkSync("./src/img/logo.png");
    fs.unlinkSync("./src/img/webpack.svg");
    if (!fs.existsSync("./src/js/components/")) {
      fs.mkdirSync("./src/js/components/");
    }
    fs.writeFileSync("./src/js/components/variables.js", jsFileText);
    fs.writeFileSync("./src/scss/pages/_home.scss", "");
    fs.writeFileSync("./src/scss/layout/_navigation.scss", "");
    fs.writeFileSync("./src/scss/layout/_footer.scss", "");
  } catch (err) {
    console.log(err);
  }
}

function findFiles(
  startPath = projectDir,
  filter = ".html",
  type = "filepath"
) {
  let arr = [];
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }
  let files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      findFiles(filePath, filter); //recurse
    } else if (filePath.indexOf(filter) >= 0) {
      let arrItem =
        type === "filepath" ? `./${filePath.replace(/\\/gi, "/")}` : files[i];
      arr.push(arrItem);
    }
  }
  return arr;
}
// Merges all JavaScript Library
function libFileGen() {
  const jsLibArr = findFiles(appPath.libDir, ".js").filter(
    (jsLib) => !jsLib.includes(appPath.libFile)
  );
  concat(jsLibArr, `${appPath.libDir}/${appPath.libFile}`);
}
// Auto Configure Project
function autoConfig() {
  const htmlFileNames = findFiles(projectDir, ".html", "file"); // Finds all html
  const ejsFileNames = findFiles(projectDir, ".ejs", "file"); // Finds all ejs
  const fileNames = [...htmlFileNames, ...ejsFileNames];
  return fileNames.map((htmlFileName) => ({
    htmlFileName,
    jsFiles: [htmlFileName.replace(/\.(html|ejs)+$/i, ".js")],
  }));
}
// Entry key & "jsFiles" path added
files.forEach((file) => {
  file["entryKey"] = file.htmlFileName.replace(/\.(html|ejs)+$/i, ""); // adds "entryKey" property
  file.jsFiles = file.jsFiles.map((jsFile) => `${appPath.jsDir}/${jsFile}`); // changes filename to path
});
// Creates JS file if does not exist
files.forEach((file) => {
  file.jsFiles.forEach((jsFile) => {
    if (!fs.existsSync(jsFile)) {
      fs.writeFileSync(jsFile, jsFileText);
    }
  });
});

//==========================================
// Exports
//==========================================
module.exports = { appPath, files, libFileGen, resetStarter };
