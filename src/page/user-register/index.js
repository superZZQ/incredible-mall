/*
* @Author: ZZQ
* @Date:   2018-12-22 12:57:31
* @Last Modified by:   ZZQ
* @Last Modified time: 2018-12-22 16:56:33
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
//表单里的错误提示
var formError = {
    show: function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};
//login逻辑部分
var page = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
        //验证username
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            //如果用户名为空，我们不做验证
            if(!username){
                return;
            }
            //异步验证用户名是否存在
            _user.checkUsername(username,function(res){
                formError.hide();
            },function(errMsg){
                formError.show(errMsg);
            });
        });
        //验证password
        $('#password').blur(function(){
            var password = $.trim($(this).val());
            //验证密码是否为空
            if (!_mm.validate(password,'require')) {
                formError.show('密码不能为空');
            }else{
                formError.hide();
                //验证密码长度是否少于六位
                if (password.length < 6) {
                    formError.show('密码长度不能少于6位');
                }else{
                    formError.hide();
                }
            }
        });
        //验证passwordConfirm
        $('#passwordConfirm').blur(function(){
            var password = $.trim($('#password').val());
            var passwordConfirm = $.trim($(this).val());
            //验证密码是否为空
            if (!_mm.validate(passwordConfirm,'require')) {
                formError.show('再次输入密码不能为空');
            }else{
                formError.hide();
                //两次密码是否一致
                if (password !== passwordConfirm) {
                    formError.show('两次输入密码不一致');
                }else{
                    formError.hide();
                }
            }
        });
        //验证phone
        $('#phone').blur(function(){
            var phone = $.trim($(this).val());
            //验证手机号是否为空
            if (!_mm.validate(phone,'require')) {
                formError.show('手机号不能为空');
            }else{
                formError.hide();
                //验证手机号格式是否正确
                if (!_mm.validate(phone,'phone')){
                    formError.show('手机号格式不正确');
                }else{
                    formError.hide();
                }
            }
        });
        //验证email
        $('#email').blur(function(){
            var email = $.trim($(this).val());
            //验证邮箱是否为空
            if (!_mm.validate(email,'require')) {
                formError.show('邮箱不能为空');
            }else{
                formError.hide();
                //验证邮箱格式是否正确
                if (!_mm.validate(email,'email')){
                    formError.show('邮箱格式不正确');
                }else{
                    formError.hide();
                }
            }
        });
        //验证question
        $('#question').blur(function(){
            var question = $.trim($(this).val());
            //验证密码提示问题是否为空
            if (!_mm.validate(question,'require')) {
                formError.show('密码提示问题不能为空');
            }else{
                formError.hide();
            }
        });
        //验证answer
        $('#answer').blur(function(){
            var answer = $.trim($(this).val());
            //验证密码提示问题答案是否为空
            if (!_mm.validate(answer,'require')) {
                formError.show('密码提示问题答案不能为空');
            }else{
                formError.hide();
            }
        });
        //注册按钮的点击
        $('#submit').click(function(){
            _this.submit();
        });
        //如果按下回车，也进行提交
        $('.user-content').keyup(function(e){
            //keyCode=13表示回车键
            if (e.keyCode === 13) {
                _this.submit();
            }
        })
    },
    //提交表单
    submit: function(){
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#passwordConfirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val()),
        },
        //表单验证结果
        validateResult = this.formValidate(formData);
        //验证成功
        if (validateResult.status) {
            _user.register(formData,function(res){
                window.location.href = './result.html?type=register';
            },function(errMsg){
                formError.show(errMsg);
            });
            
        }//验证失败
        else{
            //错误提示
            formError.show(validateResult.msg);
        }
    },
    //表单字段的验证
    formValidate: function(formData){
        var result = {
            status: false,
            msg: ''
        };
        //验证用户名是否为空
        if (!_mm.validate(formData.username,'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        //验证密码是否为空
        if (!_mm.validate(formData.password,'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        //验证密码长度是否少于6位
        if (formData.password.length < 6) {
            result.msg = '密码长度不能少于6位';
            return result;
        }
        //验证两次输入密码是否一致
        if (formData.password !== formData.passwordConfirm) {
            console.log("一："+formData.password);
            console.log("二："+formData.passwordConfirm);
            result.msg = '两次输入密码不一致';
            return result;
        }
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