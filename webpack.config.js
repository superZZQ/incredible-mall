/*
* @Author: ZZQ
* @Date:   2018-10-18 10:37:15
* @Last Modified by:   ZZQ
* @Last Modified time: 2018-12-15 19:22:55
*/
const path = require('path');
const webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
//获取heml-webpack-plugin参数的方法
var getHtmlConfig = function(name){
    return {
        template: './src/view/'+name+'.html',
        filename: 'view/'+name+'.html',
        inject: true,
        hash: true,
        chunks: ['common',name]
    }
};
//webpack config
var config = {
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),//存放文件的路径
    publicPath: '/dist/',//访问文件的路径*/
    filename: 'js/[name].js'
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  plugins: [
    //css单独打包到文件
    new ExtractTextPlugin('css/index.css'),
    //html模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login')),
  ],
  module: {
    //css独立通用模块
    rules: [
    {
        test:/\.css$/, 
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
    },
    {
        test:/\.(jpg|png|gif|svg)$/,    
        use:[{
            loader:'file-loader',
            options:{
                name:'[name].[ext]?[hash]',//可以重写css中引入图片部分
                publicPath: '../image/',//可以重新生成图片到新的目录
                outputPath: 'image/'
            }
        }]
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
            loader:'file-loader',
            options: {
                name: '[name].[ext]',//path为相对于context的路径
                context:'src',
                publicPath: '../fonts/',
                outputPath: 'fonts/'
            }
        }]
    }

    ]
  },
  mode: 'development',
  optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "common",
                    filename: "js/base.js", //运行失败
                    chunks: "initial",
                    minChunks: 2                    
                }
            }
        }
    },
};
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8082/');
}
module.exports = config;
