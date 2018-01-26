### webpack 配置解释
```
// 取文件目录
const path = require('path');
// webpack插件
const webpack = require('webpack');
// 输入html模版
const HtmlWebpackPlugin = require('html-webpack-plugin');
// css代码分割
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// css压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 删除文件
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 生产需要模块
const pkg = require('./package.json');

// 目录路径封装
function resolve(dir) {
  return path.join(__dirname, dir);
}

const config = {
  /**
   * entry 入口文件
   * 可以配置一个或者多个
   */
  entry: {
    main: resolve('src/main.js'),
    vendor: Object.keys(pkg.dependencies)
  },
  /**
   * output 输出文件
   * path 文件输出的目录
   * filename js/[name].[chunkhash:8].js 输出到js目录下，名字后面加上8位hash值，每次文件有更改hash都重新生成，防止缓存
   */
  output: {
    path: resolve('build'),
    filename: 'js/[name].[chunkhash:8].js'
  },
  /**
   * resolve 模块解析
   * extensions 导入文件不用加后缀
   * alias 别名配置
   */
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: {
      '@': resolve('src'),
      'reduxs': resolve('src/redux'),
      'components': resolve('src/components'),
      'containers': resolve('src/containers'),
      'static': resolve('src/static'),
      'util': resolve('src/util')
    }
  },
  module: {
    rules: [
      // js jsx 结尾的使用babel-loader转换成浏览器能是别的js
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      /**
       * ExtractTextPlugin 分割css
       * postcss-loader css 自动加兼容
       */
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
          }, {
            loader: 'postcss-loader'
          }]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: "css-loader",
          }, {
            loader: "sass-loader"
          }, {
            loader: 'postcss-loader'
          }
          ]
        })
      },
      /**
       * url-loader
       * 图片输出到img|media|fonts/名字后面加8位hash值,小于10kb,内部自动优化
       */
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
    // 打包前删除build目录
    new CleanWebpackPlugin(['build']),
    // 代码加版权
    new webpack.BannerPlugin('huleimail@qq.com'),
    // 启用作用域提升，作用是让代码文件更小、运行的更快
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 抽取公共的js 命名未common.xxxx.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/[name].[chunkhash:8].js'
    }),
    // js代码压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // 分离css
    new ExtractTextPlugin({
      filename: "css/[name].[chunkhash:8].css"
    }),
    // css 压缩
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {discardComments: {removeAll: true}},
      canPrint: true
    }),
    // 定义为生产环境，去除警告
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    // html 模板插件 minify 压缩
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      hash: true,
      minify: {
        caseSensitive: false,
        removeComments: true,
        removeEmptyAttributes: true,
        collapseWhitespace: true
      }
    }),
    // 全局变量一般用于判断开发环境和生成环境 如 if(__DEV__)
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    })
  ]
}

module.exports = config;

```