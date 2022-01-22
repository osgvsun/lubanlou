const evaluationHost =apiGateWayHost+"/configcenter/";
var taskList = [];//并行阶段集合
layui.config({
    base:'../../'
}).extend({
    index:'lib/index'
}).use(['index','laypage', 'layer', 'table', 'element'], function() {
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

    var courseNO = $('#courseNo').val();
    var term = $('#term').val();
    var batchId = $('#batchId').val();
    var groupId = $('#groupId').val();
    //执行一个表单
    table.render({
        elem: '#test',
        url: `${evaluationHost}api/timetableProcess/users?timetableId=${timetableId}&type=${type}`,
        title: '成员列表',
        method: 'GET',
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
                    fixed: 'left',
                    title: '序号',
                    type: 'numbers',
                    width: 50
                }, {
                field: 'cname',
                title: '姓名',
                align: 'center',
                sort: true
            }, {
                field: 'username',
                title: type == 'TARGET' ? '学号' : '工号',
                align: 'center',
                sort: true
            }, {
                field: 'userInfo',
                title: '个人信息',
                align: 'center',
                sort: true
            }
            ]
        ],
        parseData: function(res){ //res 即为原始返回的数据
            var pdata = {
                "code": 0, //解析接口状态
                "msg": "", //解析提示文本
                "count": res.count, //解析数据长度
                "data": [] //解析数据列表
            };
            let userList;
            if(type == 'TARGET'){
                userList = res.data.timetableProcessTargetDTOS;
            }else {
                userList = res.data.timetableProcessInitiatorDTOS;
            }
            $.each(userList,function (key,value) {
                let user = new Object();
                user['cname'] = type == 'TARGET' ? value.targetCname : value.initiatorCname;
                user['username'] = type == 'TARGET' ? value.targetUsername: value.initiatorUsername;
                let u= JSON.parse(value.userInfo);
                let us = '';
                $.each(u,function (m,n) {
                    us+=`【${m}】${n} &nbsp&nbsp`
                })
                user['userInfo'] = us;
                pdata.data.push(user);
            })
            // pdata.data = parmaData(res);
            return pdata;
        },
        id: 'test',
        // data: [],
        skin: 'line', //表格风格
        even: false,
        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
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