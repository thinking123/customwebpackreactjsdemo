const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "../src"),
  entry: "index.js",
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
      template: "../index.html"
    })
  ]
};
