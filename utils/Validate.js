var _ = require("underscore")._;

/**
 * Created by zhaomi on 16/10/25.
 * 验证
 */

var getFloatLength = function(val) {
    var val_arr = val.toString().split(".");
    if (val_arr.length === 1) {
        return 0;
    } else {
        return val_arr[1].length;
    }
}

module.exports = {
    isMobile: function(str) {
        return /^1\d{10}$/.test(str) && typeof(str) !== "undefined";
    },

    //密码6-16位
    isPassword: function(password) {
        return (typeof password !== 'undefined') && /^[\x00-\x7F]{6,16}$/.test(password);
    },

    isInteger: function(str) {
        return /^\d+$/.test(str);
    },

    isCode: function(code) {
        return /^[a-zA-Z0-9]{6}$/.test(code);
    },

    isBoolean: function(str) {
        return /^[0,1]{1}$/.test(str);
    },

    isUndefined: function(obj) {
        return (typeof obj === 'undefined');
    },

    isNumeric: function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },

    isBookShelfGroupName: function(name) {
        return typeof name === 'string' && name.length > 0 && name.length <= 15;
    },

    isLatitude: function(value) {
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
            var float_value = parseFloat(value);
            return float_value >= -90 && float_value <= 90 && getFloatLength(float_value) <= 6;
        } else {
            return false;
        }
    },

    isLongitude: function(value) {
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
            var float_value = parseFloat(value);
            return float_value >= -180 && float_value <= 180 && getFloatLength(float_value) <= 6;
        } else {
            return false;
        }
    },

    isObject: function(value) {
        return typeof value === 'object' && (value !== null);
    },

    isFloat: function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    },

    isEmpty: function (value) {
      return _.isEmpty(value);
    },

    "uploadUrlRegex": /^http:\/\/book500\.oss-cn-shanghai\.aliyuncs\.com(.*)$/
}