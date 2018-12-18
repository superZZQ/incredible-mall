/*
* @Author: ZZQ
* @Date:   2018-10-18 09:59:42
* @Last Modified by:   ZZQ
* @Last Modified time: 2018-12-18 21:00:40
*/
'use strict';
require('./index.css');
console.log("hello?");

var _mm = require('util/mm.js');
console.log(_mm.getUrlParam('test'));           //test参数
/*_mm.request({
    url: '/product/list.do?keyword=1',
    success: function(res){
        console.log(res);
    },
    error: function(err){
        console.log(err);
    }
});*/
