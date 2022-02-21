var path = require("path");

var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "production",
	target: "web",
	devtool: "nosources-source-map",
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			inject: false,
		}),
	],
	entry: {
		index: path.resolve(__dirname, "./src/index.tsx"),
		style: path.resolve(__dirname, "./src/style.ts"),
	},
	output: {
		path: path.resolve(__dirname, "./build"),
		filename: "[name].js",
		publicPath: "/",
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx"],
		fallback: {
			path: require.resolve("./node_modules/path-browserify"),
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: "url-loader",
				options: {
					limit: 8192,
				},
			},
			{
				test: /\.woff2$/i,
				loader: "url-loader",
				options: {
					limit: 8192,
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: "style-loader",
						options: {},
					},
					{
						loader: "css-loader",
						options: {},
					},
					{
						loader: "resolve-url-loader",
						options: {},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
							implementation: require("sass"),
						},
					},
				],
			},
			{
				test: /\.md$/,
				use: [
					{
						loader: "html-loader",
					},
				],
			},
		],
	},
};
