/*
* @Author: ZZQ
* @Date:   2019-03-04 23:19:28
* @Last Modified by:   ZZQ
* @Last Modified time: 2019-03-06 11:35:57
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _payment = require('service/payment-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var page = {
    data:{
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function() {
        this.onLoad();
    },
    onLoad: function(){
        //初始化左侧菜单
        navSide.init({
            name: 'order-detail'
        });
        //加载detail数据
        this.loadPaymentInfo();
    },
    //加载订单列表
    loadPaymentInfo: function(){
        var _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber,function(res){
            //渲染html
            paymentHtml = _mm.renderHtml(templateIndex,res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    //监听订单状态
    listenOrderStatus:function(){
        var _this = this;
        this.paymentTimer = window.setInterval(function(){
            +payment.getPaymentStatus(_this.data.orderNumber,function(res){
                if(res == true){
                    window.location.href = './result.html?type = payment&orderNumber=' + _this.data.orderNumber;
                }
            });
        });
    }
};
$(function(){
    page.init();
});