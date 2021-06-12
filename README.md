# Webpack 5 Boilerplate

This Package is for Developing, Compiling & Building frontend technology such as Website templates, vanilla JavaScript Web Applications etc. It is easier to use and also have full production level code support. It can work with multiple projects in one place with minimum configuration

## Features

1. SASS compilation, CSS compression and auto vendor prefixed.
2. JavaScript compression, babel processed JavaScript.
3. Image compression for production.
4. Better folder architecture for maintainable and scalable code.
5. EJS template compilation.
6. Font-awesome, Bootstrap, Bulma, TailwindCSS, d3.JS, Axios is installed and ready to use when needed.
7. Supports development of React, Redux applications.

## Installation

**Node.JS** is required. Install it then run following code one by one in terminal from project directory,

```bash
npm i -D autoprefixer babel-loader clean-webpack-plugin concat css-loader ejs-easy-loader html-loader html-webpack-plugin image-minimizer-webpack-plugin imagemin-jpegtran imagemin-optipng imagemin-svgo imagemin-gifsicle mini-css-extract-plugin node-sass css-minimizer-webpack-plugin postcss postcss-loader prettier sass-loader style-loader webpack webpack-cli webpack-dev-server webpack-merge @babel/preset-env @babel/preset-react @babel/core @babel/plugin-transform-runtime @babel/runtime-corejs3 @babel/plugin-proposal-class-properties @fortawesome/fontawesome-free
npm i -S bootstrap jquery popper.js bulma tailwindcss d3 axios
npm run reset
```
Or, In any bash terminal (Git bash too), run following to install all in one go,

```bash
npm i -D autoprefixer babel-loader clean-webpack-plugin concat css-loader ejs-easy-loader html-loader html-webpack-plugin image-minimizer-webpack-plugin imagemin-jpegtran imagemin-optipng imagemin-svgo imagemin-gifsicle mini-css-extract-plugin node-sass css-minimizer-webpack-plugin postcss postcss-loader prettier sass-loader style-loader webpack webpack-cli webpack-dev-server webpack-merge @babel/preset-env @babel/preset-react @babel/core @babel/plugin-transform-runtime @babel/runtime-corejs3 @babel/plugin-proposal-class-properties @fortawesome/fontawesome-free && npm i -S bootstrap jquery popper.js bulma tailwindcss d3 axios && npm run reset
```



## Launch

Windows Operating system by default does not support Environment variables. To run this package please install following package,

```bash
npm i -g win-node-env
```

Run development mode,

```bash
npm start
```

Build for production,

```bash
npm run build
```



## Usage

1. **webpack.dev.js**: This file sets up the project environment. First setup the project directory by setting the value of "projectDir" variable.
2. **auto config**: By default the value of "files" is set to "autoConfig()". This will automatically generate and include a JavaScript file based on the HTML/EJS files in the "projectDir". The JavaScript file will have the same name as your HTML/EJS file. This method is recommended.
3. **manual config**:  Alternatively, manually define which HTML/EJS files to compile in the array called "files". This array contains multiple objects each containing 2 properties: "htmlFileName", "jsFiles". Simply, define the name of the HTML/EJS file with proper extension in "htmlFileName" and the names of the JavaScript files in the "jsFiles" array. Follow the example given in the "webpack.dev.js" file.
4. Stylesheets such as CSS/SCSS/SASS should be imported via a JavaScript file that is linked by above method.
5. **Precompiled JavaScript Files**: JavaScript files (such as minified JavaScript files that does not "export") can be included in HTML using the \<script\> tag if they are in "jslib" folder. Alternatively, All library files will merge and generate a "vendor.js" file within the projects "jslib/" directory.  Then add following code to the HTML/EJS page,

```javascript
<script type="text/javascript" src="./jslib/vendor.js"></script>
```

 If libraries have dependencies, be sure to name them accordingly. Example: "bootstrap.min.js" requires "jquery.min.js" and "popper.min.js", so rename them like "01.jquery.min.js", 02.popper.min.js" and "03.bootstrap.min.js".

Since "vendor.js" is just a merged file, sometimes it may not work. So if neither works, then install them using Node.JS and import/require them.

### Multiple Projects Configuration

Project directory path can be set by defining the variable "projectDir" within the "webpack.dev.js". By default it is set to "./src". Change the value of this variable to switch to another project. Example, If the project directory is "example-project" then,

```javascript
//==========================================
// Environment setup
//==========================================
const projectDir = "./example-project"; // Project directory
```

### Common Libraries Installation

**Installation:**

```bash
npm i bootstrap jquery popper.js
npm i -D @fortawesome/fontawesome-free
```

**Usage:**

```javascript
// main.js
import 'bootstrap'; // Import bootstrap.js
```

CSS and SCSS files should be imported in "\_vendor.scss" following way,

```scss
$fa-font-path: "~@fortawesome/fontawesome-free/webfonts"; // set $fa-font-path value
@import "~@fortawesome/fontawesome-free/scss/fontawesome";
@import "~@fortawesome/fontawesome-free/scss/solid";
@import "~@fortawesome/fontawesome-free/scss/regular";
@import "~@fortawesome/fontawesome-free/scss/brands";
@import "~bootstrap/scss/bootstrap";
```

**Install React Packages:**

```bash
npm i react react-dom react-router-dom react-redux react-icons react-moment jwt-decode redux redux-thunk moment uuid
```

"uuid" package is optional. It is for generating unique id which is required in every element in the array. Use this package if data provided in the array does not contain such unique identifier.  Usage Example,

```javascript
import { v4 as uuid } from 'uuid';
uuid(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```



### SCSS 7-1 Folder Architecture

**themes** - Predefined themes or for theming CSS library.
**vendor** - Importing icons/fonts, CSS libraries and other predefined CSS.
**abstracts** - Codes that does not output css (variables, mixins, functions)
**base** - Basic project definitions (base (css Reset), animation, typography, utilities)
**layout** - Elements that should work everywhere and on all pages. (global grid, navigation, header, footer, sidebar)
**pages** - Very specific styles for a specific page like for example, a homepage. Basically, styles for the sections of a page is written here.
**components** - One file for each component. Components are reusable building blocks and independent of each other. Components are held together by the layout of the page. Example: buttons, card etc.

## Dependencies

Since Webpack and all it's modules are very dynamic, many issues may come up. So, some issues occur, use these versions of the packages.

```bash
npm i -D autoprefixer@10.2.4 babel-loader@8.2.2 clean-webpack-plugin@3.0.0 concat@1.0.3 css-loader@5.0.2 css-minimizer-webpack-plugin@1.2.0 ejs-easy-loader@0.1.4 html-loader@2.1.0 html-webpack-plugin@5.2.0 image-minimizer-webpack-plugin@2.2.0 imagemin-gifsicle@7.0.0 imagemin-jpegtran@7.0.0 imagemin-optipng@8.0.0 imagemin-svgo@8.0.0 mini-css-extract-plugin@1.3.8 node-sass@5.0.0 postcss@8.2.6 postcss-loader@5.0.0 prettier@2.2.1 sass-loader@11.0.1 style-loader@2.0.0 webpack@5.23.0 webpack-cli@4.5.0 webpack-dev-server@3.11.2 webpack-merge@5.7.3 @babel/preset-env@7.12.17 @babel/preset-react@7.12.13 @babel/core@7.12.17 @babel/plugin-transform-runtime@7.12.17 @babel/runtime-corejs3@7.12.18 @babel/plugin-proposal-class-properties@7.12.13
```



## FAQ

No Frequently Asked Questions.