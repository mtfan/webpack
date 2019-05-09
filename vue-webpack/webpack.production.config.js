const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const pkg = require('./package.json');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');

function resolve(dir) {
	return path.join(__dirname, dir);
}

const config = merge(base, {
	mode: 'production',
	entry: {
		main: resolve('src/main.js'),
		vendor: Object.keys(pkg.dependencies),
	},
	output: {
		path: resolve('build'),
		filename: 'js/[name].[chunkhash:8].js',
	},
	// devtool: 'cheap-module-source-map',
	optimization: {
		minimizer: [
			new TerserPlugin({
				minify: (file, sourceMap) => {
					// https://github.com/mishoo/UglifyJS2#minify-options
					const uglifyJsOptions = {
						/* your `uglify-js` package options */
						compress: {
							drop_console: true,
						},
					};

					if (sourceMap) {
						uglifyJsOptions.sourceMap = {
							content: sourceMap,
						};
					}

					return require('uglify-js').minify(file, uglifyJsOptions);
				},
			}),
		],
	},
	plugins: [
		new CleanWebpackPlugin(['build']),
		new webpack.BannerPlugin('huleimail@qq.com'),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.SplitChunksPlugin({
			cacheGroups: {
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
				commons: {
					chunks: 'initial',
					minChunks: 2,
					maxInitialRequests: 5,
					minSize: 0,
					name: 'commons',
				},
				//打包第三方类库
				vendor: {
					chunks: 'initial',
					name: 'vendor',
					minChunks: Infinity,
				},
			},
		}),
		new webpack.optimize.RuntimeChunkPlugin({
			name: 'manifest',
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true,
				},
			},
			canPrint: true,
		}),
		new HtmlWebpackPlugin({
			template: resolve('index.html'),
			favicon: resolve('favicon.ico'),
			hash: true,
			minify: {
				caseSensitive: false,
				removeComments: true,
				removeEmptyAttributes: true,
				collapseWhitespace: true,
			},
		}),
	],
});
if (process.env.ANALY) {
	config.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = config;
