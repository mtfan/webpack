const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const config = merge(base, {
  mode: 'development',
  entry: {
    main: resolve('src/main.js')
  },
  output: {
    filename: 'bundle.js'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    proxy: {
      '/api': 'http://localhost:7878'
    },
    historyApiFallback: true,
    inline: true,
    hot: true,
    port: 9999,
    overlay: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      favicon: resolve('favicon.ico')
    }),
    // 模块热更新
    new webpack.HotModuleReplacementPlugin()
  ]
});
module.exports = config;