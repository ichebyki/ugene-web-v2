var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        devFlagPlugin,
        new ExtractTextPlugin('app.css')
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        host: '0.0.0.0',
        port: 4000 /* <--- Add this line and choose your own port number */
    }
};
