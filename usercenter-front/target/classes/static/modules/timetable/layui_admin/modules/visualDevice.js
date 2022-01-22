/**
 * Created by 77947 on 2019/8/12.
 */
layui.config({
    version: '1545041465480' //为了更新 js 缓存，可忽略
});
var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl = $("#zuulServerUrl").val() + "/timetable/";
layui.use(['laypage', 'layer', 'table', 'element'], function() {
    var admin = layui.admin,
        laypage = layui.laypage //分页
        ,
        layer = layui.layer //弹层
        ,
        table = layui.table //表格
        ,
        $ = layui.jquery,
        element = layui.element //元素操作

    //向世界问个好
    // layer.msg('进入页面名称');

        //执行一个表单
        table.render({
            elem: '#test',
            url: layui.setter.base + 'json/visualDevice.json',
            title: '设备列表',
            cellMinWidth: 100,
            page: true, //开启分页
            page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
                //curr: 5, //设定初始在第 5 页
                groups: 1, //只显示 1 个连续页码
                first: false, //不显示首页
                last: false //不显示尾页
            },
            cols: [
                [ //表头
                    {
                        title: '序号',
                        type: 'numbers',
                        width: 50
                    }, {
                    field: 'deviceName',
                    title: '设备名称',
                    sort: true
                }, {
                    field: 'deviceNumber',
                    title: '设备编号',
                    sort: true
                }, {
                    field: 'specifications',
                    title: '规格',
                    sort: true
                }, {
                    field: 'labroomName',
                    title: '所在实验室',
                    sort: true
                }, {
                    field: 'deviceAdmin',
                    title: '设备管理员',
                    sort: true
                }, {
                    field: 'deviceType',
                    title: '状态',
                    sort: true
                }, {
                    fixed: 'right',
                    title: '操作',
                    toolbar: '#toolbar',
                    width: 120
                }
                ]
            ],
            id: 'test',
            data: table,
            skin: 'line', //表格风格
            even: false,
            limits: [5, 7, 10, 20],
            limit: 5 //每页默认显示的数量
        });


//监听行工具事件
    table.on('tool(test)', function(obj) {
        var data = obj.data;
        if(obj.event === 'doDeviceReservation') {
            var index = parent.layer.getFrameIndex(window.name);
            parent.layer.full(index);
            var url = contextPath+"/device/doDeviceReservation/802/undefined/-1/undefined/1/" +obj.data.id+ "/1/undefined";
            //alert(url);
            window.location.href=url;
            // layer.confirm('真的删除行么', function(index) {
            //     obj.del();
            //     layer.close(index);
            // });
        }
    });
    var $ = layui.$,
        active = {
            reload: function() {
                var searchbox = $('#searchbox');

                //执行重载
                table.reload('test', {
                    headers: {Authorization: getJWTAuthority()},
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        // key: {
                            search: searchbox.val()
                        // }
                    },
                    contentType: "application/json;charset=UTF-8",
                }, 'data');
            }
        };

    $('.search_line .layui-btn').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

});
function getJWTAuthority() {
    var authorization ="";
    initDirectoryEngine({
        getHostsUrl:contextPath+"/shareApi/getHosts",
        getAuthorizationUrl:contextPath+"/shareApi/getAuthorization"
    });
    getAuthorization({
        async:false,
        success:function(data){
            authorization =data;
        }
    });
    return authorization;
}