const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.jsx'
  },
  resolve:{
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module:{
    rules:[
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use:[
          'babel-loader'
        ]
      },
      {
        test: /\.css?$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.scss?$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use:[
          'url-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Sans Comic Sans',
      template: 'template.ejs',
    }),
  ],
};
