/*
* @Author: ZZQ
* @Date:   2019-03-06 11:14:09
* @Last Modified by:   ZZQ
* @Last Modified time: 2019-03-06 11:33:18
*/
'use strict';

var _mm = require('util/mm.js');

var _payment = {
    // 获取支付信息
    getPaymentInfo: function(orderNubmer, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNubmer
            },
            success: resolve,
            error: reject
        });
    },
    //获取订单状态
    getPaymentStatus: function(orderNubmer, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNubmer
            },
            success: resolve,
            error: reject
        });
    }

}
module.exports = _payment;