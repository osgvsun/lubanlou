/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));
//表单单元格锁定列
$(".dm_right_tab tbody tr td:nth-child(2)").hover(
    function(){
        $(this).parent().siblings("tr").find("td:nth-child(2)").toggleClass("td_line");
        $(this).parent().parent().siblings("thead").find("th:nth-child(2)").toggleClass("td_line");
    }
);
$(".dm_right_tab tbody tr td:nth-child(3)").hover(
    function(){
        $(this).parent().siblings("tr").find("td:nth-child(3)").toggleClass("td_line");
        $(this).parent().parent().siblings("thead").find("th:nth-child(3)").toggleClass("td_line");
    }
);
$(".dm_right_tab tbody tr td:nth-child(4)").hover(
    function(){
        $(this).parent().siblings("tr").find("td:nth-child(4)").toggleClass("td_line");
        $(this).parent().parent().siblings("thead").find("th:nth-child(4)").toggleClass("td_line");
    }
);
$(".dm_right_tab tbody tr td:nth-child(5)").hover(
    function(){
        $(this).parent().siblings("tr").find("td:nth-child(5)").toggleClass("td_line");
        $(this).parent().parent().siblings("thead").find("th:nth-child(5)").toggleClass("td_line");
    }
);
$(".dm_right_tab tbody tr td:nth-child(6)").hover(
    function(){
        $(this).parent().siblings("tr").find("td:nth-child(6)").toggleClass("td_line");
        $(this).parent().parent().siblings("thead").find("th:nth-child(6)").toggleClass("td_line");
    }
);
$(".dm_right_tab tbody tr td:nth-child(7)").hover(
    function(){
        $(this).parent().siblings("tr").find("td:nth-child(7)").toggleClass("td_line");
        $(this).parent().parent().siblings("thead").find("th:nth-child(7)").toggleClass("td_line");
    }
);
$(".dm_right_tab tbody tr td:nth-child(8)").hover(
    function(){
        $(this).parent().siblings("tr").find("td:nth-child(8)").toggleClass("td_line");
        $(this).parent().parent().siblings("thead").find("th:nth-child(8)").toggleClass("td_line");
    }
);
//表格头部锁定列
$(".dm_right_tab thead th:nth-child(2)").hover(
    function(){
        $(this).toggleClass("td_line");
        $(this).parent().parent().parent(".tab_border").find("tbody tr td:nth-child(2)").toggleClass("td_line");
    }
);
$(".dm_right_tab thead th:nth-child(3)").hover(
    function(){
        $(this).toggleClass("td_line");
        $(this).parent().parent().parent(".tab_border").find("tbody tr td:nth-child(3)").toggleClass("td_line");
    }
);
$(".dm_right_tab thead th:nth-child(4)").hover(
    function(){
        $(this).toggleClass("td_line");
        $(this).parent().parent().parent(".tab_border").find("tbody tr td:nth-child(4)").toggleClass("td_line");
    }
);
$(".dm_right_tab thead th:nth-child(5)").hover(
    function(){
        $(this).toggleClass("td_line");
        $(this).parent().parent().parent(".tab_border").find("tbody tr td:nth-child(5)").toggleClass("td_line");
    }
);
$(".dm_right_tab thead th:nth-child(6)").hover(
    function(){
        $(this).toggleClass("td_line");
        $(this).parent().parent().parent(".tab_border").find("tbody tr td:nth-child(6)").toggleClass("td_line");
    }
);
$(".dm_right_tab thead th:nth-child(7)").hover(
    function(){
        $(this).toggleClass("td_line");
        $(this).parent().parent().parent(".tab_border").find("tbody tr td:nth-child(7)").toggleClass("td_line");
    }
);
$(".dm_right_tab thead th:nth-child(8)").hover(
    function(){
        $(this).toggleClass("td_line");
        $(this).parent().parent().parent(".tab_border").find("tbody tr td:nth-child(8)").toggleClass("td_line");
    }
);
function  surelab1(){
    layer.closeAll();
    $("#viewRadio").hide();
    $("#viewImagesBox").hide();
}