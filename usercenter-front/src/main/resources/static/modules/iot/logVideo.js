layui.use(['index', 'form', 'laypage', 'laydate', 'layer', 'table', 'element'], function() {
    var $ = layui.$,
        admin = layui.admin,
        element = layui.element,
        layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate,
        laypage = layui.laypage,
        table = layui.table;

    //向世界问个好
    layer.msg('进入日志管理-视频');

    form.render(null, 'logvideo');

    //执行表单
    table.render({
        elem: '#logVideotab',
        url: iotHost + "/api/commonlog/logVideo", //数据接口
        title: '表单',
        cellMinWidth: 130,
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            curr: 1, //设定初始在第 5 页
            groups: 1, //只显示 1 个连续页码
            first: false, //不显示首页
            last: false //不显示尾页
        },
        cols: [
            [ //表头
                {
                    fixed: 'left',
                    title: '序号',
                    type: 'numbers',
                    width: 50,
                    align: 'center'
                }, {
                field: 'cardname',
                title: '姓名',
                sort: true
            }, {
                field: 'username',
                title: '学号',
                sort: true
            }, {
                field: 'hardwareIp',
                title: 'Ip地址',
                sort: true
            }, {
                field: 'status',
                title: '状态',
                sort: true
            }, {
                field: 'dateTime',
                title: '时间',
                sort: true
            }
            ]
        ],
        request:{
            pageName:"current",
            limitName:"pageSize"
        },
        data: table,
        skin: 'line', //表格风格
        even: true,
        page:true,
        id: 'logVideotab',
        limits: [5, 7, 10, 20],
        limit: 10 ,//每页默认显示的数量
        parseData:function(res) {
            var currentData = res.data.records;
            for (var i = 0; i < currentData.length; i++) {
                try {
                    var status1 = OAuth2.isUserEnabled(currentData[i].username);
                    currentData[i].status1 = status1;
                }
                catch (e) {
                    currentData[i].status1 = false
                }
            }

            return {
                code: res.code,
                count: res.data.total,
                data: currentData
            }
        }
    });
    laydate.render({
        elem: '#logVideotab'
        ,range: true
    });

    //搜索
    var $ = layui.$,
        active = {
            reload: function() {
                var search = $('input[name=search]').val();
                var start_time = $('input[id=start_time]').val();
                var end_time = $('input[id=end_time]').val();

                //执行重载
                table.reload('logVideotab', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        search,
                        start_time,
                        end_time
                    }
                }, 'data');
            }
        };

    $('.searchbtn').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});