const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./config.js');
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const SASS = require.resolve("sass");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    moduleIds: "size",
    chunkIds: "total-size",
    // runtimeChunk: "single",
    // runtimeChunk: {
    //   name: "runtime",
    // },
    // usedExports: "global",
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/i,
    //       name: "vendors",
    //       chunks: "all"
    //     }
    //   }
    // }
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  devtool: "hidden-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: /(node_modules|bower_components)/i,
        type: "javascript/auto",
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                config.minify,
                config.babel
              ]
            }
          },
          "ts-loader"
        ]
      },
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/i,
        type: "javascript/auto",
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              config.minify,
              config.babel
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: SASS,
              sassOptions: {
                fiber: false,
                outputStyle: "compressed",
                sourceMap: true,
                warnRuleAsWarning: true,
                webpackImporter: false
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|gif)$/i,
        // type: "asset/inline"
        use: [
          "inline-loader"
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
        // type: "asset/inline"
        use: [
          "inline-loader"
        ]
      },
      {
        test: /\.(txt|jessie)$/i,
        // type: "asset/source" // inline
        use: [
          "raw-loader"
        ]
      }
    ]
  }
});
