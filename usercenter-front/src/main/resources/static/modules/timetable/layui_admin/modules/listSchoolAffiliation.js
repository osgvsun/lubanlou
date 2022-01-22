var zuulUrl = $("#zuulServerUrl").val() + "/timetable/";
layui.use(['index', 'form', 'laypage', 'layer', 'table', 'element'], function () {
    var $ = layui.$,
        admin = layui.admin,
        element = layui.element,
        layer = layui.layer,
        form = layui.form,
        laypage = layui.laypage,
        table = layui.table,
        element = layui.element;

    //向世界问个好
    // layer.msg('进入院校管理');

    //执行设备保养列表表单
    table.render({
        elem: '#listSchoolAffiliation',
        url: zuulUrl + "api/school/listSchoolAffiliation",
        method: "post",
        title: '院校管理列表',
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            curr: 1, //设定初始在第 5 页
            groups: 1, //只显示 1 个连续页码
            first: false, //不显示首页
            last: false //不显示尾页
        },
        parseData: function (res) {
            return {
                "code": 0,
                "msg": "",
                "count": res.length,
                "data": res
            }
        },
        cols: [
            [ //表头
                {
                    field: 'affiliationNumber',
                    title: '主管单位的编号',
                    align: "center",
                    sort: true
                }, {
                field: 'name',
                title: '主管单位的名称',
                align: "center",
            }, {
                title: '下属学院',
                align: "center",
                templet: function (d) {
                    let arr = [];
                    let {affiliationAcademy} = d;
                    for (let i in affiliationAcademy) {
                        arr.push(affiliationAcademy[i]['academyName']);
                    }
                    return arr.toString();
                }
            }, {
                field: 'createdDate',
                title: '创建日期',
                align: "center",
                sort: true
            }, {
                field: 'updatedDate',
                title: '更新日期',
                align: "center",
                sort: true
            }, {
                field: 'createdBy',
                title: '创建者',
                align: "center",
            }, {
                fixed: 'right',
                title: '操作',
                width: 150,
                toolbar: '#operation',
                align: "center",
            }
            ]
        ],
        data: table,
        skin: 'line', //表格风格
        id: 'listSchoolAffiliation',
        page: false,
        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
    });

    //搜索
    var $ = layui.$,
        active = {
            reload: function () {
                var search_box = $('#search_box');
                //执行重载
                table.reload('listSchoolAffiliation', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        key: {
                            studentname: search_box.val()
                        }
                    }
                }, 'data');
            }
        };

    $('.tabsearch .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //监听行工具事件
    table.on('tool(listSchoolAffiliation)', function (obj) { //注：tool是工具条事件名，listSchoolAffiliation 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            ,
            layEvent = obj.event; //获得 lay-event 对应的值

        //打开查看提交内容
        if (obj.event === 'delete') {
            layer.confirm(
                "是否删除？",
                {
                    title: "提示",
                },
                function (index) {
                    $.ajax({
                        url: zuulUrl + "api/school/deleteSchoolAffiliation?affiliationNumber=" + obj['data']['affiliationNumber'],
                        type: "POST",
                        success: function (res) {
                            layer.alert(res.msg)
                            table.reload("listSchoolAffiliation");
                        }
                    })
                    layer.close(index);
                }
            );
        } else if (obj.event === 'update') {
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '编辑院校',
                area: ["1050px", "620px"],
                shade: 0.3,
                maxmin: true,
                content: 'newAffiliation?affiliationNumber=' + obj['data']['affiliationNumber'],
                zIndex: layer.zIndex //重点1
                ,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['提交', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#affiliationBtn");
                    submit.click();
                }
            });
            // layer.full(index);
        }
    });

    //新建设备快速保养页面
    var newAffiliation = {
        newAffiliation: function () {
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '新建院校',
                area: ["1050px", "620px"],
                shade: 0.3,
                maxmin: true,
                content: 'newAffiliation',
                zIndex: layer.zIndex //重点1
                ,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['提交', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#affiliationBtn");
                    submit.click();
                }
            });
            // layer.full(index);
        }
    };
    $('.newAffiliation').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        newAffiliation[method] ? newAffiliation[method].call(this, othis) : '';
    });
});