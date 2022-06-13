const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[fullhash].js',
        publicPath: '/',
        clean: true,
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@pages': path.join(__dirname, 'src', 'pages'),
            '@containers': path.join(__dirname, 'src', 'containers'),
            '@contexts': path.join(__dirname, 'src', 'contexts'),
            '@hooks': path.join(__dirname, 'src', 'hooks'),
            '@components': path.join(__dirname, 'src', 'components'),
            '@routes': path.join(__dirname, 'src', 'routes'),
            '@styles': path.join(__dirname, 'src', 'styles'),
            '@utils': path.join(__dirname, 'src', 'utils'),
            '@validations': path.join(__dirname, 'src', 'validations'),
            '@schemas': path.join(__dirname, 'src', 'schemas'),
        },
    },
    devtool: 'source-map',
    devServer: { port: 3000, historyApiFallback: true, open: false, allowedHosts: ['localhost', 'wsl'] },
    module: {
        rules: [
            { test: /\jsx?$/, exclude: /node_modules/, use: ['babel-loader'] },
            { test: /\.s?css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
            { test: /\.(jpg|jpeg|png|gif|mp3|svg)$/, use: ['file-loader'] },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.join(__dirname, 'public', 'index.html') }),
        new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css' }),
    ],
};
