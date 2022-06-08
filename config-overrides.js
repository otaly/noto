// 参考：https://github.com/facebook/create-react-app/issues/12072#issuecomment-1074566504

const webpack = require('webpack');
const path = require('path');
const {
  override,
  addWebpackResolve,
  addWebpackPlugin,
  addWebpackAlias,
  addBabelPresets,
  addBabelPlugins,
} = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    ['@']: path.resolve(__dirname, 'src'),
  }),
  addWebpackResolve({
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify'),
      url: require.resolve('url'),
    },
  }),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    })
  ),
  ...addBabelPresets([
    '@babel/preset-react',
    { runtime: 'automatic', importSource: '@emotion/react' },
  ]),
  ...addBabelPlugins('@emotion/babel-plugin')
);
