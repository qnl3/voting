const webpack = require('webpack');
const path = require('path');

const config = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: "/public/",
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ['@ava/stage-4', 'react', 'es2015']
          }
      }
    ]

  },
  resolve: {
    extensions: ['.js','.jsx']
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};


module.exports = config;