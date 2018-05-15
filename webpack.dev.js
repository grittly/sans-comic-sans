const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'public',
      to: '.',
    }]),
  ],
  devtool: 'inline-source-map',
  mode: 'development',
});
