const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

const isPro = process.env.NODE_ENV == "production";

const plugins = [
  new HtmlWebpackPlugin({
    title: "test html",
    template: "index.html"
  }),
  isPro &&
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  isPro && new CleanWebpackPlugin()
].filter(f => f);

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "index_bundle.js"
  },
  resolve: {
    extensions: [".js", ".json", ".less"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.less$/i,
        use: [
          isPro
            ? {
                loader: MiniCssExtractPlugin.loader
              }
            : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          {
            loader: "wpt-px2rem-loader",
            options: {
              exclude: ["width"],
              rem: 5,
              sourceMap: !isPro
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  plugins
};
