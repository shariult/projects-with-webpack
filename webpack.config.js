//==========================================
// Imports
//==========================================
const path = require("path"),
  webpack = require("webpack"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  { merge } = require("webpack-merge"),
  terserWebpackPlugin = require("terser-webpack-plugin"),
  htmlWebpackPlugin = require("html-webpack-plugin"),
  miniCssExtractPlugin = require("mini-css-extract-plugin"),
  cssMinimizerPlugin = require("css-minimizer-webpack-plugin"),
  imageMinimizerPlugin = require("image-minimizer-webpack-plugin"),
  autoprefixer = require("autoprefixer");

//==========================================
// Variables
//==========================================
const { appPath, files, libFileGen, resetStarter } = require("./webpack.dev");
const target = process.env.NODE_ENV === "development" ? "web" : "browserslist";

//==========================================
// Code
//==========================================
// Creates entry key from "files" array
const entry = files.reduce((acc, file) => {
  acc[file["entryKey"]] = file["jsFiles"];
  return acc;
}, {});
// Created Object for "html-webpack-plugin"
const plugins = files.map((file) => {
  let htmlFilePath = `${appPath.src}/${file.htmlFileName}`;
  const obj = {
    template: htmlFilePath,
    filename: file.htmlFileName.replace(/\.ejs+$/, ".html"),
    chunks: [file.entryKey],
  };
  if (appPath.mode === "production") {
    obj["minify"] = {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      removeComments: true,
    };
  }
  return new htmlWebpackPlugin(obj);
});
const commonConfig = {
  entry,
  output: {
    publicPath: "",
    filename: `${appPath.finalJsDir}/[name].[contenthash].js`,
    path: path.join(__dirname, `${appPath.finalDir}`),
    assetModuleFilename: `${appPath.finalDir}/[name].[hash][ext][query]`,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "html-loader",
      },
      { test: /\.ejs$/i, loader: "ejs-easy-loader" },
      {
        test: /\.m?js$/,
        exclude: [
          /(node_modules|bower_components)/,
          path.resolve(__dirname, `${appPath.libDir}`),
        ],
        loader: "babel-loader",
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: [path.resolve(__dirname, `${appPath.libDir}`)],
        type: "asset/resource",
        generator: {
          filename: `${appPath.finalLibDir}/[name].[hash][ext][query]`,
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: [
          path.join(__dirname, `${appPath.scssDir}`),
          path.join(__dirname, "node_modules"),
        ],
        type: "asset/resource",
        generator: {
          filename: `${appPath.finalCssIconDir}/[name][ext][query]`,
        },
      },
      {
        test: /\.(gif|jpe?g|tiff|a?png|webp|bmp|svg|tiff?)$/,
        exclude: [
          /(node_modules|bower_components)/,
          path.resolve(__dirname, `${appPath.scssDir}`),
        ],
        type: "asset/resource",
        generator: {
          filename: `${appPath.finalImgDir}/[name].[hash][ext][query]`,
        },
      },
    ],
  },
  target,
};
const developmentConfig = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(s?css|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), ...plugins],
  devServer: {
    contentBase: appPath.src,
    watchContentBase: true,
    compress: true,
    open: true,
    port: 1234,
  },
};
const productionConfig = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(s?css|sass)$/,
        use: [
          miniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [autoprefixer()],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new cssMinimizerPlugin(),
      new terserWebpackPlugin(),
      ...plugins,
    ],
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: `${appPath.finalCssDir}/style.[contenthash].css`,
    }),
    new CleanWebpackPlugin(),
    new imageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 5 }],
          ["gifsicle", { interlaced: true, optimizationLevel: 3 }],
          [
            "svgo",
            {
              plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
            },
          ],
        ],
      },
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

//==========================================
// Exports
//==========================================
module.exports = () => {
  switch (appPath.mode) {
    case "development":
      libFileGen();
      return merge(commonConfig, developmentConfig);
    case "production":
      libFileGen();
      return merge(commonConfig, productionConfig);
    case "reset":
      libFileGen();
      resetStarter();
      return merge(commonConfig, developmentConfig);
    default:
      throw new Error("No matching configuration was found!");
  }
};
