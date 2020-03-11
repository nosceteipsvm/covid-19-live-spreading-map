const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: __dirname,
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				exclude: /node_modules/,
				use: ['style-loader','postcss-loader']
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
				  publicPath: 'public',
				},
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			}
		})
	],
	devServer: {
		port: process.env.PORT || 3342,
		host: 'localhost',
		historyApiFallback: true,
		open: true,
	}
}