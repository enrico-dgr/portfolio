var path = require('path');
var commonConfigs = require('./webpack.common.config');

var devConfigs = {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, './build'),
		},
		compress: true,
		hot: true,
		host: '0.0.0.0',
		port: 9000,
		historyApiFallback: true,
	},
	watchOptions: {
		poll: 1000,
	},
};

module.exports = Object.assign(commonConfigs, devConfigs);
