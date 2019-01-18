/*
* @Author: ZZQ
* @Date:   2019-01-17 21:56:37
* @Last Modified by:   ZZQ
* @Last Modified time: 2019-01-18 21:09:10
*/
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _cart = require('service/cart-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var page = {
    data : {
    
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadCart();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('mouseenter','.p-img-item',function(){
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src',imageUrl);
        });
    },
    // 加载购物车信息
    loadCart : function(){
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap');
        //loading
        /*$pageWrap.html('<div class="loading"></div>');*/
        
    },
    //数据匹配
    filter: function(data){
        
    }
};
$(function(){
    page.init();
})