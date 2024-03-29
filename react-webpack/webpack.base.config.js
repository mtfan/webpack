const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const base = {
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: {
      '@': resolve('src'),
      '@scss': resolve('src/static/sass'),
      reduxs: resolve('src/redux'),
      components: resolve('src/components'),
      views: resolve('src/views'),
      api: resolve('src/api'),
      static: resolve('src/static'),
      utils: resolve('src/utils')
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
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:8].[ext]'
            }
          },
          'img-loader'
        ]
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}
if (process.env.NODE_ENV === 'development') {
  base.module.rules.push({
    test: /\.scss|.css$/,
    use: [
      'style-loader',
      { loader: 'css-loader', options: { importLoaders: 3 } }, // 导入的sass加上前缀兼容
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [resolve('src/static/sass/common/_base.scss')]
        }
      },
      'postcss-loader'
    ]
  })
} else {
  base.module.rules.push(
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader'
        }
      ]
    },
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { importLoaders: 3 } },
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: [resolve('src/static/sass/common/_base.scss')]
          }
        },
        'postcss-loader'
      ]
    }
  )
}
module.exports = base
