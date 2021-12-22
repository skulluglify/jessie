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
      useBuiltIns: "usage",
      shippedProposals: true,
      corejs: {
        version: "^3.20", 
        proposals: true
      },
      targets: "> 0.25%, not dead",
      forceAllTransforms: true,
      modules: false
    }
  ]
};
