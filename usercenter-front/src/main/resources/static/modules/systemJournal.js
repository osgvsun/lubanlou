/** layuiAdmin.std-v1.2.1 LPPL License By http://www.layui.com/admin/ */ ;
layui.define(function(e) {
    layui.use(["table",'element','laydate'], function () {
        var e = (layui.$, layui.table);
        var $ = layui.jquery,
        admin = layui.admin
            ,element = layui.element,
            layer = layui.layer,
            laydate=layui.laydate; //Tab的切换功能，切换事件监听等，需要依赖element模块

        e.render({
            elem: "#systemJournal",
            url:  userCenterHost + "/usercenter/log",
            title: '系统日志',
            method:'GET',
            cellMinWidth: 100,
            cols: [
                [
                    {title:'序号', width:100,  type:"numbers"},
                    {
                    field: 'operator', title: '操作用户',width:200},
                    {field: 'operand', title: '操作对象', width:100},
                    {field: 'log', title: '操作内容', width:250},
                    {field: 'action', title: '具体动作', width: 150},
                    {field: 'datetime', title: '操作时间', width: 180},
                    {field: 'ip', title: '登录地址（IP)', width: 180}
                ]
            ],
            page: true,
            limits:[10,20,30,40,50,60,70,80,90,200],
            skin: "line"
        });
        e.render({
            elem: '#editContent'
            /*url: layui.setter.base + "json/information/personInfo.js"*/
            ,cols: [[ //标题栏
                {field: 'id', title: 'ID', width:80, sort: true, fixed: 'left'},
                {field: 'profession', title: '职称',width:180,align: 'center'}
                ,{field: 'officialRank', title: '职别',width:100,align: 'center'}
                ,{field: 'promotionTime', title: '职级晋升年月',width:130,align: 'center'}
                ,{field: 'jobRank', title: '岗位等级',width:200,align: 'center'}
                ,{field: 'jobCategory', title: '岗位类别',align: 'center'}
            ]]
            ,data:[
                {
                    "id": 123,
                    "profession": "教授", //职称
                    "officialRank": "高级", //职别
                    "promotionTime": "2018-06-13", //职级晋升年月
                    "jobRank": "一级", //岗位等级
                    "jobCategory": "教学科研" //岗位类别
                }
            ]
            //,skin: 'line' //表格风格
            ,even: true
            //,page: true //是否显示分页
            //,limits: [5, 7, 10]
            //,limit: 5 //每页默认显示的数量
        });
        //操作时间插件
        laydate.render({
            elem: '#datetime'
            ,type: 'date'
        });

      /*  e.on('row(systemJournal)', function(obj){
            var data = obj.data;
            admin.req({
                url: layui.setter.base + 'json/user/login.js',//实际使用请改成服务端真实接口
                data: data.field,
                dataType:"json",
                method:"post"
                ,done: function(res){
                    if(!res.code){
                        layer.open({
                            type: 1
                            , title: '查看'
                            , area: ['60%', '50%']
                            , content: $('#edit_content')
                            , btn: '关闭'
                            , btnAlign: 'c' //按钮居中
                            , shade: 0 //不显示遮罩
                            , yes: function () {
                                layer.closeAll();
                            }
                        });

                    }
                }
            })
            //标注选中样式
            obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
        });*/
        var $ = layui.$,
            active = {
                reload: function() {
                    /*url: layui.setter.base + "json/management/educateInfo.js",*/
                    var operator= $("#operator").val();
                    var action= $("#action").val();
                    var datetime= $("#datetime").val();
                    //执行重载
                    e.reload('systemJournal', {
                        page: {
                            curr: 1 //重新从第 1 页开始
                        },
                        where: {
                            operator:operator,
                            action:action,
                            datetime:datetime
                        }
                    })
                }
            };

        $('.systemJournalInput .layui-btn').on('click', function() {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

    }), e("systemJournal", {})
});