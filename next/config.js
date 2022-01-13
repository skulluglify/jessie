module.exports = {
  minify: [
    "minify",
    {
      // unsafe: {
        // typeConstructors: false
      // },
      keepFnName: true
    }
  ],
  babel: [
    "@babel/preset-env",
    {
      // useBuiltIns: "usage",
      useBuiltIns: false,
      shippedProposals: false,
      // corejs: {
      //   version: "^3.20", 
      //   proposals: true
      // },
      loose: true,
      // targets: "> 0.25%, not dead",
      bugfixes: true,
      targets: {
        esmodules: true,
        node: "current",
        browsers: "last 2 Chrome versions"
      },
      forceAllTransforms: true,
      modules: false
    }
  ]
};
