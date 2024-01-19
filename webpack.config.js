const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const ChromeExtensionReloader = require("webpack-chrome-extension-reloader");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  devServer: {
    contentBase: "./dist",
  },
  entry: {
    background: "./src/js/background.js",
    content: "./src/js/content.js",
    popup: "./src/js/popup.js",
  },
  optimization: {
    minimize: true
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }],
  },
  plugins: [
    // new ChromeExtensionReloader({
      // port: 9097,
      // reloadPage: false,
    // }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          to: "manifest.json",
        },
        {
          context: path.resolve(__dirname, "src", "icons"),
          from: "**/*",
          to: "icons/",
        },
        {
          context: path.resolve(__dirname, "src", "css"),
          from: "**/*",
          to: "css/",
        },
        {
          context: path.resolve(__dirname, "src", "fonts"),
          from: "**/*",
          to: "fonts/",
        },
        {
          from: "src/html/*.html",
          to: "html/[name].html",
        },
        {
          from: "node_modules/webextension-polyfill/dist/browser-polyfill.min.js",
          to: "js/",
        },
      ],
    }),
  ],
};
