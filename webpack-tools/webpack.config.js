const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyRightWebpackPlugin = require('./plugins/copyright-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const config = {
  mode: 'development',
  entry: {
    main: resolve('src/main.js')
  },
  resolveLoader: {
    modules: ['node_modules', resolve('loaders')]
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'replaceLoader',
            options: {
              name: 'huleic'
            }
          },
          {
            loader: 'replaceLoaderAsync',
            options: {
              name: 'huleib'
            }
          }
        ]
      }
    ]
  },
  output: {
    path: resolve('dist'),
    filename: '[name].[chunkhash:8].js'
  },

  plugins: [new CleanWebpackPlugin(), new CopyRightWebpackPlugin({ copyright: 'copyright by hulei' })]
}

module.exports = config
