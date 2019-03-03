/*
* @Author: ZZQ
* @Date:   2018-12-30 23:20:07
* @Last Modified by:   ZZQ
<<<<<<< HEAD
* @Last Modified time: 2018-12-30 23:39:37
=======
* @Last Modified time: 2019-01-15 21:48:31
>>>>>>> incredible_mall_v1.0
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
<<<<<<< HEAD
=======
    },
    // 获取商品详细信息
    getProductDetail : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : {
                productId: productId
            },
            success : resolve,
            error   : reject
        });
>>>>>>> incredible_mall_v1.0
    }
}
module.exports = _product;