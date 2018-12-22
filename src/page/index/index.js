/*
* @Author: ZZQ
* @Date:   2018-10-18 09:59:42
* @Last Modified by:   ZZQ
* @Last Modified time: 2018-12-21 17:12:02
*/
'use strict';
require('./index.css');
console.log("hello?");
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
navSide.init({
    name : 'user-center'
});
var _mm = require('util/mm.js');
/*console.log(_mm.getUrlParam('test'));                   //test参数
var html = '<div><p>{{data}}</p></div>';               //hogan模板变量由两个大括号{{}}表示
var data = {
    data : 'hehe'
};
console.log(_mm.renderHtml(html,data));*/
/*_mm.request({
    url: '/product/list.do?keyword=1',
    success: function(res){
        console.log(res);
    },
    error: function(err){
        console.log(err);
    }
});*/
