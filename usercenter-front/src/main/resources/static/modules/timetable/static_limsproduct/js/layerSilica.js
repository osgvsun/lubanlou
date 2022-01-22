/**
 * Created by 77947 on 2019/7/31.
 */
(function(window, factory) {
    if (typeof exports === 'object') { // 支持 CommonJS
        module.exports = factory(require('jQuery'));
    } else if (typeof define === 'function' && define.amd) { // 支持 AMD
        define([ "jquery" ], factory);
    } else if (window.layui && layui.define) { //layui加载
        layui.define(['jquery'], function(exports) {
            var jquery = layui.jquery;

            exports('layerSilica', factory(jquery));
        });
    } else {
        window.layerSilica = factory(window.jquery);
    }
})(this, function($) {
    "use strict";

    return {
        TITLE_BTN_BEFORE: 'before',
        TITLE_BTN_AFTER: 'after',

        /**
         * 获取 iframe 的 window 对象
         * 根据 param 传入的类型判断通过哪种方式获取
         * 1.传入字符串：直接通过 iframe name 查找
         * 2.传入数字：通过 layer index 生成 iframe name 查找
         * 3.传入对象：一般是传入 layer 的 layero，通过 layero 查找 layer 官方文档也有提到
         *
         * @param  {Number|String|Object} layer index|iframe name| layer layero
         * @return {object} iframe window object
         */
        getFrameWinBy: function(param, windowObject) {
            var win = !!windowObject ? windowObject : window;
            var type = Object.prototype.toString.call(param);

            if (type === '[object String]') {
                // 通过 iframe name 查找
                return win[param];
            } else if (type === '[object Number]') {
                // 通过 iframe index 查找
                return win['layui-layer-iframe' + param]
            } else if (type === '[object Object]') {
                // 通过 layer iframe 层对象 查找
                return win[param.find('iframe')[0]['name']]
            }
        },

        /**
         * 获取标题栏按钮盒子
         *
         * @param  {Number} index layer index
         * @return {Object} 标题栏按钮盒子
         */
        getTitleBtnBox: function(index) {
            return $(window.document).find('#layui-layer' + index).find('.layui-layer-setwin');
        },

        /**
         * 添加标题栏按钮
         *
         * @param {Number} index layer index
         * @param {String|Object} 要添加的内容，html 字符串或者节点对象
         * @param {String} direction 添加的方向，在默认按钮组前方或者后方
         */
        addTitleBtn: function(index, content, direction) {
            var $btnBox = this.getTitleBtnBox(index);

            if (direction === this.TITLE_BTN_BEFORE) {
                $btnBox.prepend(content);
            } else if (direction === this.TITLE_BTN_AFTER) {
                $btnBox.append(content);
            } else {
                console.error('direction 参数错误！')
            }
        },

        /**
         * 获取当前弹层的 layer index
         *
         * @param  {Boolean} isInFrame 是否在于iframe中
         * @param  {Object} node 页面中的节点，仅用于页面层
         * @param  {Object} windowObject window 对象，此函数被其他页面调用时会用到
         * @return {Number} layer 层的 index
         */
        getSelfIndex: function(isInFrame, node, windowObject) {
            var win = !!windowObject ? windowObject : window;

            if (isInFrame) {
                // in iframe
                return win.parent.layer.getFrameIndex(win.name);
            } else {
                // in page
                return win.$(node).closest('.layui-layer').attr('times');
            }
        },
    }
});