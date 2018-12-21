/*
* @Author: ZZQ
* @Date:   2018-12-21 14:15:53
* @Last Modified by:   ZZQ
* @Last Modified time: 2018-12-21 15:08:43
*/
'use strict';
require('./index.css');
var navSide = require('page/common/nav/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type'),
        $element = $('.' + type + '-success').show();
    //显示对应的提示元素
    $element.show();
})

