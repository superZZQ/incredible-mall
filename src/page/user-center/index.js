/*
* @Author: ZZQ
* @Date:   2018-12-26 13:31:29
* @Last Modified by:   ZZQ
* @Last Modified time: 2018-12-26 14:29:55
*/
'use strict';
require('./index.css');
console.log("hello?");
require('page/common/nav-simple/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');

'use strict';
require('./index.css');
require('page/common/header/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var page = {
    init: function() {
        this.onLoad();
    },
    onLoad: function(){
        //初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo: function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            /*_mm.errorTips(errMsg);*/
        });
    }
};
$(function(){
    page.init();
});