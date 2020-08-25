const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	module: {
		rules: [
			{ test: /\.(js)$/, use: "babel-loader" },
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					process.env.NODE_ENV !== "production"
						? "style-loader"
						: MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
							sassOptions: {
								outputStyle: "compressed",
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
	],
	output: {
		path: path.resolve(__dirname, "./public"),
		filename: "bundle.js",
	},
};
