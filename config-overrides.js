// const webpack = require("webpack");

module.exports = function override(webpackConfig) {
  webpackConfig.module.rules.push({
    test: /.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
    // resolve: {
    //   fullySpecified: false
    // }
  });

  // const fallback = webpackConfig.resolve.fallback || {};
  // Object.assign(fallback, {
  //   assert: require.resolve("assert"),
  //   buffer: require.resolve("buffer"),
  //   crypto: require.resolve("crypto-browserify"),
  //   fs: false,
  //   path: require.resolve("path-browserify"),
  //   zlib: require.resolve("browserify-zlib"),
  // });
  // webpackConfig.resolve.fallback = fallback;

  // webpackConfig.plugins = [
  //   ...webpackConfig.plugins,
  //   // new webpack.ProvidePlugin({
  //   //   Buffer: ["buffer", "Buffer"],
  //   // }),
  // ];

  return webpackConfig;
};
