/*
* @Author: ZZQ
* @Date:   2018-10-18 09:59:42
* @Last Modified by:   ZZQ
<<<<<<< HEAD
* @Last Modified time: 2018-12-30 17:55:01
=======
* @Last Modified time: 2018-12-31 00:25:24
>>>>>>> incredible_mall_v1.0
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
<<<<<<< HEAD
var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./banner.string');
/*navSide.init({
    name : 'user-center'
});*/
=======
var navSide         = require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
>>>>>>> incredible_mall_v1.0
var _mm = require('util/mm.js');
$(function(){
    //渲染banner的html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    //初始化banner
    var $slider = $('.banner').unslider({
        dots:true
    });
    //前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});
/*console.log(_mm.getUrlParam('test'));                   //test参数
var html = '<div><p>{{data}}</p></div>';               //hogan模板变量由两个大括号{{}}表示
var data = {
    data : 'hehe'
};
console.log(_mm.renderHtml(html,data));*/

$(function() {
    // 渲染banner的html
    var bannerHtml  = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider     = $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});
/*_mm.request({
    url: 'http://www.happymmall.com/product/list.do?keyword=1',
    success: function(res){
        console.log(res);
    },
    error: function(err){
        console.log("hah");
        console.log(err);
    }
});*/
