const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge')
const base = require('./webpack.base.config')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const config = merge(base, {
  mode: 'production',
  entry: {
    main: resolve('src/main.js'),
  },
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[chunkhash:8].js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        minify: (file, sourceMap) => {
          // https://github.com/mishoo/UglifyJS2#minify-options
          const uglifyJsOptions = {
            /* your `uglify-js` package options */
            compress: {
              drop_console: true
            }
          }

          if (sourceMap) {
            uglifyJsOptions.sourceMap = {
              content: sourceMap
            }
          }

          return require('uglify-js').minify(file, uglifyJsOptions)
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.NamedChunksPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.BannerPlugin('huleimail@qq.com'),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.SplitChunksPlugin({
      chunks: 'all',
      minSize: 30000, // 30kb
      minChunks: 1, // 在分割之前模块的被引用次数
      maxAsyncRequests: 5, // 按需加载最大并行请求数量
      maxInitialRequests: 3, // 一个入口的最大并行请求数量
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 权重
          name: 'vendors',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true, // 防止重复模块打包
          name: 'commons',
        },
      },
    }),
    new webpack.optimize.RuntimeChunkPlugin({
      name: 'manifest'
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      favicon: resolve('favicon.ico'),
      hash: true,
      minify: {
        caseSensitive: false,
        removeComments: true,
        removeEmptyAttributes: true,
        collapseWhitespace: true
      }
    })
  ]
})
if (process.env.ANALY) {
  config.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = config
