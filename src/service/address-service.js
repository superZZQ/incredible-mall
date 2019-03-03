/*
* @Author: ZZQ
* @Date:   2019-03-03 15:53:31
* @Last Modified by:   ZZQ
* @Last Modified time: 2019-03-03 18:17:32
*/
'use strict';

var _mm = require('util/mm.js');

var _address = {
    // 获取商品列表
    getAddressList: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50
            },
            success: resolve,
            error: reject
        });
    },
    save: function(addressInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/list.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    //更新收件人
    update: function(addressInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    //删除收件人
    deleteAddress: function(shippingId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
    //获取单条收件人信息
    getAddress: function(shippingId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/select.do'),
            data: {
                id: shippingId
            },
            success: resolve,
            error: reject
        });
    }
}
module.exports = _address;