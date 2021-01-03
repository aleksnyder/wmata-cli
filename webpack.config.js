const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'source-map',
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  entry: {
    index: path.join(__dirname, 'src', 'index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        options: {
          presets: ["@babel/preset-env"]
        }
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'src'),
        to: path.join(__dirname, 'dist'),
      },
    ]),
  ],
};
