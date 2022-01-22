/**
 * Created by 77947 on 2019/8/12.
 */
layui.config({
    base: $("meta[name='contextPath']").attr("content")+'/layui_admin/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    index: 'lib/index', //主入口模块
    // deviceBatchGlobal: 'modules/deviceBatchGlobal', //如果 mymod.js 是在根目录，也可以不用设定别名
    // formSelects: 'modules/formSelects', //如果 mymod.js 是在根目录，也可以不用设定别名
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

    var courseNO = $('#courseNo').val();
    var term = $('#term').val();
    var batchId = $('#batchId').val();
    var groupId = $('#groupId').val();
    if(batchId == '' && groupId==''){
        //执行一个表单
        table.render({
            elem: '#test',
            url: zuulUrl + "api/school/apiListOfScheduledStudents",
            title: '学生列表',
            method: 'post',
            contentType: "application/json;charset=UTF-8",
            where: {order: 'asc',sort: 'cname',courseNo: courseNO,termId: term},
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
                    title: '学号',
                    align: 'center',
                    sort: true
                }, {
                    field: 'className',
                    title: '行政班名称',
                    align: 'center',
                    sort: true
                }
                ]
            ],
            id: 'test',
            // data: [],
            skin: 'line', //表格风格
            even: false,
            limits: [5, 7, 10, 20],
            limit: 5 //每页默认显示的数量
        });
    }else if(batchId!=''){
        var barchid = Number(batchId);
        table.render({
            elem: '#test',
            url: zuulUrl + "api/timetable/manage/apiListOfBatchScheduledStudents",
            headers: {Authorization: getJWTAuthority()},
            title: '学生列表',
            method: 'post',
            contentType: "application/json;charset=UTF-8",
            where: {courseNo: courseNO,batchId: barchid},
            cellMinWidth: 100,
            // page: true, //开启分页
            // page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            //     layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            //     //curr: 5, //设定初始在第 5 页
            //     groups: 1, //只显示 1 个连续页码
            //     first: false, //不显示首页
            //     last: false //不显示尾页
            // },
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
                    title: '学号',
                    align: 'center',
                    sort: true
                }, {
                    field: 'className',
                    title: '行政班名称',
                    align: 'center',
                    sort: true
                }
                ]
            ],
            id: 'test',
            // data: [],
            skin: 'line', //表格风格
            even: false,
            // limits: [5, 7, 10, 20],
            // limit: 5 //每页默认显示的数量
        });
    }else if(groupId!=''){
        var groupid = Number(groupId);
        table.render({
            elem: '#test',
            url: zuulUrl + "api/timetable/manage/apiListOfGroupScheduledStudents",
            headers: {Authorization: getJWTAuthority()},
            title: '学生列表',
            method: 'post',
            contentType: "application/json;charset=UTF-8",
            where: {courseNo: courseNO,groupId: groupid},
            cellMinWidth: 100,
            // page: true, //开启分页
            // page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            //     layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            //     //curr: 5, //设定初始在第 5 页
            //     groups: 1, //只显示 1 个连续页码
            //     first: false, //不显示首页
            //     last: false //不显示尾页
            // },
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
                    title: '学号',
                    align: 'center',
                    sort: true
                }, {
                    field: 'className',
                    title: '行政班名称',
                    align: 'center',
                    sort: true
                }
                ]
            ],
            id: 'test',
            // data: [],
            skin: 'line', //表格风格
            even: false,
            // limits: [5, 7, 10, 20],
            // limit: 5 //每页默认显示的数量
        });
    }


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