const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const pkg = require('./package.json');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const config = merge(base, {
  mode: 'production',
  entry: {
    main: resolve('src/main.js'),
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: resolve('build'),
    filename: 'js/[name].[chunkhash:8].js'
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new webpack.NamedChunksPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.BannerPlugin('huleimail@qq.com'),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.SplitChunksPlugin({
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'commons'
        },
        //打包第三方类库
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          minChunks: Infinity
        }
      }
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
});
if (process.env.ANALY) {
  config.plugins.push(
    new BundleAnalyzerPlugin()
  )
}
module.exports = config;