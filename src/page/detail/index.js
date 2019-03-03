/*
* @Author: ZZQ
* @Date:   2019-01-15 19:24:14
* @Last Modified by:   ZZQ
* @Last Modified time: 2019-01-18 20:56:15
*/
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        productId: _mm.getUrlParam('productId') || '',
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        //如果没有传productId，自动跳回首页
        if(!this.data.productId){
            /*_mm.goHome();*/
        }
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        //图片预览
        $(document).on('mouseenter','.p-img-item',function(){
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src',imageUrl);
        });
    },
    // 加载商品数据详情数据
    loadDetail : function(){
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap');
        //loading
        $pageWrap.html('<div class="loading"></div>');
        _product.getProductDetail(this.data.productId,function(res){
            _this.filter(res);
            html = _mm.renderHtml(templateIndex,res);
            $('.page-wrap').html(html);
        },function(errMsg){
            $('.page-wrap').html('<p class="err-tip">此商品找不到了</p>');
        });
    },
    //数据匹配
    filter: function(data){
        data.subImages = data.subImages.split(',');
    }
};
$(function(){
    page.init();
})