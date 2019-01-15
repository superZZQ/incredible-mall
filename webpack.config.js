/*
* @Author: ZZQ
* @Date:   2018-10-18 10:37:15
* @Last Modified by:   ZZQ
* @Last Modified time: 2019-01-15 19:23:49
*/
const path = require('path');
const webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'win';
console.log(WEBPACK_ENV);
//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name,title){
    return {
        template: './src/view/'+name+'.html',
        filename: 'view/'+name+'.html',
        title: title,
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
    'list': ['./src/page/list/index.js'],
    'detail': ['./src/page/detail/index.js'],
    'user-login': ['./src/page/user-login/index.js'],
    'user-register': ['./src/page/user-register/index.js'],
    'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
    'user-center': ['./src/page/user-center/index.js'],
    'user-center-update': ['./src/page/user-center-update/index.js'],
    'user-pass-update': ['./src/page/user-pass-update/index.js'],
    'result': ['./src/page/result/index.js'],
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
    new ExtractTextPlugin('css/[name].css'),
    //html模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
    new HtmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
    new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情页')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
    new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
  ],
  resolve:{
    alias : {
        node_modules : __dirname + '/node_modules',
        util : __dirname + '/src/util',
        page : __dirname + '/src/page',
        service : __dirname + '/src/service',
        image : __dirname + '/src/image',
        fonts : __dirname + '/src/fonts'
    }
  },
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
        test:/\.string$/, 
        use: [{
            loader:'html-loader'
        }]
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
  devServer: {
    disableHostCheck: true
  },
  optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "common",
                    //filename: "js/base.js", 运行失败
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