layui.config({
    base:'../../../'
}).extend({
    index:'lib/index'
}).use(['index','laypage', 'layer', 'table', 'element', 'transfer', 'util'], function() {
    var admin = layui.admin,
        laypage = layui.laypage //分页
        ,
        layer = layui.layer //弹层
        ,
        table = layui.table //表格
        ,
        $ = layui.jquery,
        transfer = layui.transfer,
        util = layui.util,
        element = layui.element //元素操作

    //模拟数据
    var data1 = [
        {"value": "1", "title": "李白"}
        ,{"value": "2", "title": "杜甫"}
        ,{"value": "3", "title": "苏轼"}
        ,{"value": "4", "title": "李清照"}
        ,{"value": "5", "title": "鲁迅", "disabled": true}
        ,{"value": "6", "title": "巴金"}
        ,{"value": "7", "title": "冰心"}
        ,{"value": "8", "title": "矛盾"}
        ,{"value": "9", "title": "贤心"}
    ]

        ,data2 = [
        {"value": "1", "title": "瓦罐汤"}
        ,{"value": "2", "title": "油酥饼"}
        ,{"value": "3", "title": "炸酱面"}
        ,{"value": "4", "title": "串串香", "disabled": true}
        ,{"value": "5", "title": "豆腐脑"}
        ,{"value": "6", "title": "驴打滚"}
        ,{"value": "7", "title": "北京烤鸭"}
        ,{"value": "8", "title": "烤冷面"}
        ,{"value": "9", "title": "毛血旺", "disabled": true}
        ,{"value": "10", "title": "肉夹馍"}
        ,{"value": "11", "title": "臊子面"}
        ,{"value": "12", "title": "凉皮"}
        ,{"value": "13", "title": "羊肉泡馍"}
        ,{"value": "14", "title": "冰糖葫芦", "disabled": true}
        ,{"value": "15", "title": "狼牙土豆"}
    ]

//实例调用
    transfer.render({
        elem: '#teachers'
        ,data: data1
        ,id: 'teachers' //定义唯一索引
        ,title: ['所有教师', '已选教师']
        ,showSearch: true
    })
    transfer.render({
        elem: '#tutors'
        ,data: data2
        ,id: 'tutors' //定义唯一索引
        ,title: ['所有辅导', '已选辅导']
        ,showSearch: true
    })
});