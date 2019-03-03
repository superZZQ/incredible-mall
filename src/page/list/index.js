
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
<<<<<<< HEAD
var _user = require('service/product-service.js');
=======
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');
>>>>>>> incredible_mall_v1.0
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var page = {
<<<<<<< HEAD
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
=======
    data : {
        listParam : {
            keyword         : _mm.getUrlParam('keyword')    || '',
            categoryId      : _mm.getUrlParam('categoryId') || '',
            orderBy         : _mm.getUrlParam('orderBy')    || 'default',
            pageNum         : _mm.getUrlParam('pageNum')    || 1,
            pageSize        : _mm.getUrlParam('pageSize')   || 20
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        // 排序的点击事件
        $('.sort-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if($this.data('type') === 'default'){
                // 已经是active样式
                if($this.hasClass('active')) {
                    return;
                }
                // 其他
                else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if($this.data('type') === 'price'){
                // active class 的处理
                $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                // 升序、降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表
            _this.loadList();
        });
    },
    // 加载list数据
    loadList : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam,
            $pListCon   = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId 
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _product.getProductList(listParam, function(res){
            listHtml = _mm.renderHtml(templateIndex, {
                list :  res.list
            });
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function(errMsg){
           /* _mm.errorTips(errMsg);*/
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
>>>>>>> incredible_mall_v1.0
    }
};
$(function(){
    page.init();
<<<<<<< HEAD
});
=======
})
>>>>>>> incredible_mall_v1.0
