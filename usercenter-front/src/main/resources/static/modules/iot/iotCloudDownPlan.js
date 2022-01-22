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
    layer.msg('进入云地通信-计划任务');

    form.render(null, 'iotclouddownplan');

    //执行表单
    table.render({
        elem: '#iotclouddownplantab',
        url: layui.setter.base + "json/iotCloudDownPlan.json", //数据接口
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
                    field: 'id',
                    title: '序号',
                    sort: true,
                }, {
                field: 'title',
                title: '计划任务名称',
                sort: true,
                }, {
                field: 'planName',
                title: '计划任务名称',
                sort: true,
                }, {
                fixed: 'right',
                title: '云地通信',
                width: 120,
                align: 'center',
                toolbar: '#operation'
            }
            ]
        ],
        data: table,
        skin: 'line', //表格风格
        even: true,
        id: 'iotclouddownplantab',
        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
    });

    //监听行工具事件
    table.on('tool(iotclouddownplantab)', function(obj) {
        var data = obj.data.planName;
        /**
         * Description 云地通信：查看接口日志
         *
         * @author chenjiali
         * @date 2021/1/12
         */
        if (obj.event === 'regcard') {
            $.ajax({
                url:iotHost+'/api/agent/regalldevice',
                type:'post',
                data:{
                    planName : data
                },
                success:function (s) {
                        parent.layer.alert(s);
                        table.reload('iotclouddownplantab');
                },
                error:function () {
                    alert("接口请求失败")
                }
            })
        }
    });
});
