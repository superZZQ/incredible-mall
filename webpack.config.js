/*
* @Author: ZZQ
* @Date:   2018-10-18 10:37:15
* @Last Modified by:   ZZQ
* @Last Modified time: 2018-10-24 13:37:11
*/
const path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = {
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  plugins: [
    new ExtractTextPlugin('css/index.css')
  ],
  module: {
    rules: [{
        test:/\.css$/, 
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
    }]
  },
  mode: 'development',
  optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "common",
                    filename: "js/base.js",
                    chunks: "initial",
                    minChunks: 2                    
                }
            }
        }
    },
};
module.exports = config;
