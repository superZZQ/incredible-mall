/*
* @Author: ZZQ
* @Date:   2018-12-30 23:20:07
* @Last Modified by:   ZZQ
* @Last Modified time: 2018-12-30 23:39:37
*/
/*
* @Author: ZZQ
*/

'use strict';

var _mm = require('util/mm.js');

var _product = {
    // 获取商品列表
    getProductList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;