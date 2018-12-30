/*
* @Author: ZZQ
* @Date:   2018-12-18 17:00:53
* @Last Modified by:   ZZQ
* @Last Modified time: 2018-12-30 02:49:03
*/
'use strict';
var Hogan = require('hogan.js');                   //渲染时使用的hogan组件，初始化hogan
//这是一个工具类，放在通用工具文件夹中
var conf = {
    serverHost:''                               //
};
var _mm = {
    request : function(param){                  //请求后端数据，param可以是一个对象
        var _this = this;                       //为了在success里调用
        $.ajax({                                //ajax
            type     : param.method || 'get',   //请求方式是get
            url      : param.url    || '',      //后端提供的接口
            dataType : param.type   || 'json',  //数据类型是json型
            data     : param.data   || '',      //要传给后台的data值
            success  : function(res){           //请求成功，res是成功时的返回值
                //请求成功，且数据成功
                if(0 === res.status){           //接口里的定义
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                //没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                //请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },                                  //请求失败
            error    : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }

        });
    },
    //获取服务器地址
    getServerUrl: function(path){                //后端接口地址
        return conf.serverHost + path;           //返回值，以后方便地址改变，加统计参数也方便 
    },
    //获取url参数
    getUrlParam: function(name){                 //地址中问号后面的部分
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);  //search是问号后面的参数，去问号
        console.log(result);
        return result ? decodeURIComponent(result[2]): null;       //解码、第二个元素是值
    },
    //渲染html模板
    renderHtml: function(htmlTemplate,data){                       //传入模板和数据，方法中进行拼接
        var template = Hogan.compile(htmlTemplate),                //hogan的用法：先编译再渲染
            result = template.render(data);
        return result;
    },
    //成功提示
    successTips: function(msg){
        alert(msg||'操作成功！');
    },
    //错误提示
    errorTips: function(msg){
        alert(msg||'哪里不对了');
    },
    //字段的验证，支持非空判断、手机、邮箱的判断
    validate: function(value,type){                                 //传进去字符串及它的类型（空的/手机号/邮箱）
        var value = $.trim(value);                                  //去掉前后空格，及变成字符串
        //非空验证
        if('require' === type){                                     
            return !!value;                                         //强制转换成布尔值
        }
        //手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        //邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    doLogin: function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },//redirect:跳回界面
    goHome: function(){
        window.location.href = './index.html';
    }
}; 

module.exports = _mm;