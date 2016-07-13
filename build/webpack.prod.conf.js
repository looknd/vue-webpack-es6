var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");
var webpack = require('webpack');

var config = require('./webpack.config');

/**
 * css 文件单独输出
 * @type {{loaders: {css}}}
 */
config.vue = {
    loaders: {
        css: ExtractTextPlugin.extract("css")
    }
};

config.entry.vendors = ['Vue'];

config.plugins = [
    new ExtractTextPlugin("[name].[contenthash].css"),
    // 压缩代码
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: 'vendors.js'
    }),
    new HtmlWebpackPlugin({
        filename: '../index.html',
        template: path.resolve(__dirname, '../app/index/index.html'),
        inject: true
    })
];

module.exports = config;
