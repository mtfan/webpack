const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

function resolve(dir) {
	return path.join(__dirname, dir);
}

const config = merge(base, {
	mode: 'development',
	entry: {
		main: resolve('src/main.js'),
	},
	output: {
		filename: 'bundle.js',
	},
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		proxy: {
			'/api': 'http://localhost:7878',
		},
		historyApiFallback: true,
		inline: true,
		host: '0.0.0.0',
		hot: true,
		port: 19000,
		overlay: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve('index.html'),
			favicon: resolve('favicon.ico'),
		}),
		new StyleLintPlugin({
			context: 'src',
			configFile: resolve('stylelint.config.js'),
			files: '**/*.scss',
			failOnError: false,
			quiet: true,
			fix: true,
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
});
module.exports = config;
