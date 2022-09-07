const webpack = require('webpack');

module.exports = function override(webpackConfig) {
  webpackConfig.module.rules.push({
    test: /.mjs$/,
    include: /node_modules/,
    resolve: {
      fullySpecified: false,
    },
  });

  webpackConfig.ignoreWarnings = [/Failed to parse source map/];

  // Polyfill Buffer.
  webpackConfig.plugins.push(
    new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] })
  );

  const fallback = webpackConfig.resolve.fallback || {};
  Object.assign(fallback, {
    assert: require.resolve('assert'),
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    util: require.resolve('util'),
    fs: false,
    path: false,
    zlib: false,
  });
  webpackConfig.resolve.fallback = fallback;

  return webpackConfig;
};
