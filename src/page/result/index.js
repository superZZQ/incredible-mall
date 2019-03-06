/*
* @Author: ZZQ
* @Date:   2018-12-21 14:15:53
* @Last Modified by:   ZZQ
* @Last Modified time: 2019-03-06 11:28:13
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
var navSide = require('page/common/nav/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type'),
        $element = $('.' + type + '-success');
    if(type === 'payment'){
        var $orderNumber = _mm.getUrlParam('.order-number'),
                $orderNUMBER = $element.find('.order-number');
            $orderNumber.attr('href',$orderNumber.attr('href') + orderNumber);
    }
    //显示对应的提示元素
    $element.show();
})

