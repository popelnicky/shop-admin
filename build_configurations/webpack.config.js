/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, args) => {
  return {
    entry: "./src/js/main.js",
    output: {
      filename: "app.min.js",
      // eslint-disable-next-line no-undef
      path: path.resolve(__dirname, "../dist")
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["babel-loader"]
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: "src/assets",
          to: "assets"
        },
        {
          from: "src/css",
          to: "css"
        },
        {
          from: "src/index.html",
          to: "index.html"
        }
      ])
    ],
    resolve: {
      extensions: [".js"],
      modules: ["src", "node_modules", "src/js", "build_configurations"]
    }
  };
};