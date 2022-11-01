var path = require('path');
var commonConfigs = require('./webpack.common.config');

var prodConfigs = {
	mode: 'development',
	devtool: 'source-map',
};

module.exports = Object.assign(prodConfigs, commonConfigs);
