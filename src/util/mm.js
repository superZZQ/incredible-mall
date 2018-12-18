/*
* @Author: ZZQ
* @Date:   2018-12-18 17:00:53
* @Last Modified by:   ZZQ
* @Last Modified time: 2018-12-18 21:00:00
*/
'use strict';

//这是一个工具类，放在通用工具文件夹中
var conf = {
    serverHost:''                               //
};
var _mm = {
    request : function(param){                  //请求后端数据，param可以是一个对象
        var _this = this;                       //为了在success里调用
        $.ajax({                                //ajax
            type     : param.method || 'get',
            url      : param.url    || '',
            dataType : param.type   || 'json',  //数据接口一般是json
            data     : param.data   || '',
            success  : function(res){           //请求成功
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
        return result ? decodeURIComponent(result[2]): null;       //解码、第二个元素是值
    },
    doLogin: function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    }
}; //redirect:跳回界面

module.exports = _mm;