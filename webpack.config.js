const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: './public/src/app.js',
	output: {
		path: path.resolve(__dirname, 'public/dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
  mode: 'none'
};
