/*
* @Author: ZZQ
* @Date:   2018-12-26 13:40:28
* @Last Modified by:   ZZQ
* @Last Modified time: 2018-12-26 17:00:21
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
        this.bindEvent();
    },
    onLoad: function(){
        //初始化左侧菜单
        navSide.init({
            name: 'user-center-update'
        });
    },
    bindEvent: function(){
        var _this = this;
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val()),
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updateUserInfo(userInfo,function(res,msg){
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
                },function(errMsg){
                    /*_mm.errorTips(errMsg);*/
                });
            }
            else{
                /*_mm.errorTips(validateResult.msg);*/
            }
        })
    },
    //验证字段信息
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