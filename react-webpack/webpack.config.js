const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

const config = {
  entry: {
    main: resolve('src/main.js')
  },
  output: {
    filename: "bundle.js"
  },
  devtool: 'cheap-module-eval-source-map', 
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    },
    historyApiFallback: true,
    inline: true,
    hot: true,
    port: 8080,
    overlay: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: {
      '@': resolve('src'),
      'reduxs': resolve('src/redux'),
      'components': resolve('src/components'),
      'containers': resolve('src/containers'),
      'static': resolve('src/static'),
      'util': resolve('src/util'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    }),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
    }),
    // 模块热更新
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = config;