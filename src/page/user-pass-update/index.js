/*
* @Author: ZZQ
* @Date:   2018-12-26 16:49:02
* @Last Modified by:   ZZQ
* @Last Modified time: 2018-12-26 17:10:54
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

var page = {
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        //初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    bindEvent: function(){
        var _this = this;
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                //更改用户密码
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                },function(res,msg){
                    _mm.successTips(msg);
                },function(errMsg){
                    /*_mm.errorTips(errMsg);*/
                });
            }
            else{
                /*_mm.errorTips(validateResult.msg);*/
            }
        })
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
    },
    //验证字段信息
    formValidate: function(formData){
        var result = {
            status: false,
            msg: ''
        };
        //验证原密码是否为空
        if (!_mm.validate(formData.password,'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        //验证新密码长度是否少于6位
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '请输入不少于6位的新密码';
            return result;
        }
        //验证两次输入密码是否一致
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入密码不一致';
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