const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
	return path.join(__dirname, dir);
}
const base = {
	resolve: {
		extensions: ['.js', '.vue', '.css', '.scss'],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'@': resolve('src'),
			'@scss': resolve('src/static/sass'),
			components: resolve('src/components'),
			views: resolve('src/views'),
			api: resolve('src/api'),
			static: resolve('src/static'),
			utils: resolve('src/utils'),
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						scss: 'vue-style-loader!css-loader!sass-loader',
						sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
					},
				},
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'img/[name].[hash:8].[ext]',
						},
					},
					'img-loader',
				],
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'media/[name].[hash:8].[ext]',
				},
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'fonts/[name].[hash:8].[ext]',
				},
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[chunkhash:8].css',
		}),
	],
};
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
					resources: [resolve('src/static/sass/common/_base.scss')],
				},
			},
			'postcss-loader',
		],
	});
} else {
	base.module.rules.push(
		{
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				{
					loader: 'postcss-loader',
				},
			],
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
						resources: [resolve('src/static/sass/common/_base.scss')],
					},
				},
				'postcss-loader',
			],
		},
	);
}
module.exports = base;
