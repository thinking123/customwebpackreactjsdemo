const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const loadr = require('wpt-px2rem-loader');
module.exports = {
  // context: path.resolve(__dirname, "../src"),
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    path: __dirname + "/dist",
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
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          {
            loader: "wpt-px2rem-loader",
            options: {
              exclude:['width'],
              rem:5
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  //   devServer: {
  //     contentBase: path.join(__dirname, 'dist'),
  //     compress: true,
  //     port: 9000
  //   },
  plugins: [
    new HtmlWebpackPlugin({
      title: "test html",
      template: "index.html"
    })
  ]
};
