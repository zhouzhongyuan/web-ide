
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');



module.exports = {
    entry: {
        app: [
            // 'webpack-dev-server/client?http://localhost:80',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            'babel-polyfill',
            path.resolve(__dirname, 'src/index.js'),
        ],
    },
    output: {
        path: path.resolve(__dirname, 'generated'),
        filename: '[name].js',
        publicPath: '/',
    },
    devServer: {
         hot: true,
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [
            // Load ES6/JSX
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    babelrc: false,
                    presets: ['es2015', 'react', 'stage-1'],
                },
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                ],
            },
            // Load images
            { test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
            { test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
            { test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png' },
            { test: /\.svg/, loader: 'url-loader?limit=10000&mimetype=image/svg' },
            {
                test: /\.tpl/,
                loader: 'html-loader',
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new CopyWebpackPlugin([
            {
                from: 'node_modules/monaco-editor/min/vs',
                to: 'vs',
            },
        ]),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // Use NoErrorsPlugin for webpack 1.x
        new webpack.NoEmitOnErrorsPlugin()
    ],
};
