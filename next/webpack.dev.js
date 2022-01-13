const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: "ts-loader",
        exclude: /(node_modules|bower_components)/i,
        type: "javascript/auto"
      },
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/i,
        type: "javascript/auto"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|gif)$/i,
        // type: "asset/resource"
        use: [
          "file-loader"
        ]
      },
      {
        test: /\.(jpg|jpeg)$/i,
        // type: "asset/resource"
        use: [
          "file-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        // type: "asset/resource"
        use: [
          "file-loader"
        ]
      },
      {
        test: /\.(txt|jessie)$/i,
        // type: "asset/resource" // inline
        use: [
          "file-loader"
        ]
      }
    ]
  }
});
