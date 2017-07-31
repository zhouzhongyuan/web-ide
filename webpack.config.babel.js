import path from 'path';
import webpack from 'webpack';
const config = {
    entry: [
        'react-hot-loader/patch',
        // 开启React代码的模块热替换（HMR）
        'webpack-dev-server/client?http://localhost:8080',
        // 为webnpack-dev-server的环境打包代码，然后连接到制定服务器域名与端口
        'webpack/hot/only-dev-server',
        //为热替换（HRM）打包好代码，only- 意味着只有成功更新运行代码才会执行HMR
        'babel-polyfill',
        path.resolve(__dirname, 'src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: "/",
    },
    devtool: 'cheap-eval-source-map',
    devServer: {
        compress: true,
        contentBase: path.resolve(__dirname, 'public'),
        port: 8080,
        hot: true,
        publicPath: '/',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,

            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                exclude: /node_modules/,

            },
            {
                test: /\.svg$/,
                loader: 'url-loader',
                query: {
                    limit: 1000,
                    name: '[name]-[sha512:hash:base64:7].[ext]'
                },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 开启全局的HMR
        new webpack.NamedModulesPlugin(),
    ]
};
module.exports = config;
