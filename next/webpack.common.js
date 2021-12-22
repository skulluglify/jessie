const PATH = require("path");
const TOML = require.resolve("toml");
const YAML = require.resolve("yaml");

module.exports = {

  entry: [
  
    PATH.resolve(__dirname, "./src/index.ts"),

  ],

  output: {

    filename: "[name].preview.js",
    path: PATH.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true

  },

  resolve: {

    extensions: [

      ".tsx", 
      ".ts", 
      ".js"

    ]

  },

  module: {

    rules: [

      {
        test: /\.(csv|tsv)$/i,
        use: [
          "csv-loader"
        ]
      },
      {
        test: /\.xml$/i,
        use: [
          "xml-loader"
        ]
      },
      {
        test: /\.toml$/i,
        type: "javascript/auto",
        use: [
          require.resolve("./opl/toml.js")
        ]
      },
      {
        test: /\.yaml$/i,
        type: "javascript/auto",
        use: [
          require.resolve("./opl/yaml.js")
        ]
      },
      {
        test: /\.json$/i,
        type: "javascript/auto",
        use: [
          require.resolve("./opl/json.js")
        ]
      }
    ]
  }
};
