import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:80',
            // 'webpack-dev-server/client?http://' + require("os").hostname() + ':3000/',
            'babel-polyfill',
            path.resolve(__dirname, 'src/index.js'),
        ],
    },
    output: {
        path: path.resolve(__dirname, 'generated'),
        filename: '[name].js',
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
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new CopyWebpackPlugin([
            {
                from: 'node_modules/monaco-editor/min/vs',
                to: 'vs',
            },
        ]),
    ],
};
