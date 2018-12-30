
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _user = require('service/product-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        listParam: {
            keyword: _mm.getUrlParam('keyword') || '',
            categoryId: _mm.getUrlParam('categoryId') || '',
            orderBy: _mm.getUrlParam('orderBy') || 'default',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 20
        }
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadList();
    },
    bindEvent: function(){
        
    },
    //加载list数据
    loadList: function(){
        var listParam = this.data.listParam,
            listHtml = '',
            _this = this;
        _product.getProductList(listParam,function(){
            listHtml = _mm.renderHtml(templateIndex,{
                list: res.list
            });
            $('.p-list-con').html(listHtml);
            _this.loadPagination(res.pageNum,res.pages);
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    //加载分页信息
    formValidate: function(formData){
        var result = {
            status: false,
            msg: ''
        };
        //验证手机号是否为空
        if (!_mm.validate(formData.phone,'require')) {
            result.msg = '手机号不能为空';
            return result;
        }
        //验证手机号
        if (!_mm.validate(formData.phone,'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        //验证邮箱是否为空
        if (!_mm.validate(formData.email,'require')) {
            result.msg = '邮箱不能为空';
            return result;
        }
        //验证邮箱
        if (!_mm.validate(formData.email,'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        //验证密码提示问题是否为空
        if (!_mm.validate(formData.question,'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        //验证密码提示问题答案是否为空
        if (!_mm.validate(formData.answer,'require')) {
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        //通过验证返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});