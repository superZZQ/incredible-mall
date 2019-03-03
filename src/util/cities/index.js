'use strict';

var _cities = {
    cityInfo: {

    },
    //获取所有省份
    getProvinces: function(){
        var provinces = [];
        for(var item in this.cityInfo){
            provinces.push(item);
        }
        return provinces;
    },
    //获取某省份所有城市
    getCities: function(provinceName){
        return this.cityInfo[provinceName] || [];
    }
}

module.exports = _cities;