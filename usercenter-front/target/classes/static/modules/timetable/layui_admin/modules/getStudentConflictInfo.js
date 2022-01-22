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

    var courseNO = $('#courseNo').val();
    var term = $('#term').val();
    var timetableStyle = $('#timetableStyle').val();
    var batchId = $('#batchId').val();
    var groupId = $('#groupId').val();
    var tag = $('#tags').val();
    var tags = tag.split(",");
    // if(batchId == '' && groupId==''){
        //执行一个表单
        table.render({
            elem: '#test',
            url: zuulUrl + "api/memory/apiGetStudentCourseConflictDetails",
            title: '学生列表',
            method: 'post',
            headers: {Authorization: getJWTAuthority()},
            contentType: "application/json;charset=UTF-8",
            where: {timetableStyle: timetableStyle,groupId: groupId,courseNo: courseNO,termId: term,tag: tags,createdBy: username},
            cellMinWidth: 100,
            page: false, //开启分页
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
                    align: 'center',
                    title: '姓名',
                    sort: true
                }, {
                    field: 'username',
                    title: '学号',
                    align: 'center',
                    sort: true
                }, {
                    field: 'className',
                    title: '所在班级',
                    align: 'center',
                    sort: true
                }, {
                    field: 'academyName',
                    title: '所在学院',
                    align: 'center',
                    sort: true
                }, {
                    field: 'selected',
                    title: '冲突情况',
                    align: 'center',
                    templet: function(d){
                        if(d.selected == 0){
                            // return '<span class="layui-badge-dot"></span>'
                            return '<i class="layui-icon layui-icon-ok"></i>'
                        }else{
                            // return '<span class="layui-badge-dot layui-bg-green"></span>'
                            return '<i class="layui-icon layui-icon-close"></i>'
                        }
                    },
                    sort: true
                }, {
                    fixed: 'right',
                    title: '操作',
                    toolbar: '#line_toolbar',
                    width: 80
                }
                //    ,{
                //     field: 'courseName',
                //     title: '冲突课程名称',
                //     align: 'center',
                //     sort: true
                // },{
                //     field: 'teacher',
                //     title: '上课老师',
                //     align: 'center',
                //     sort: true
                // },{
                //     field: 'telephone',
                //     title: '老师联系方式',
                //     align: 'center',
                //     sort: true
                // }
                ]
            ],
            id: 'test',
            // data: [],
            skin: 'line', //表格风格
            even: false,
            // limits: [5, 7, 10, 20],
            // limit: 5 //每页默认显示的数量
        });
    // }else if(batchId!=''){
    //     var barchid = Number(batchId);
    //     table.render({
    //         elem: '#test',
    //         url: zuulUrl + "api/timetable/manage/apiListOfBatchScheduledStudents",
    //         headers: {Authorization: getJWTAuthority()},
    //         title: '学生列表',
    //         method: 'post',
    //         contentType: "application/json;charset=UTF-8",
    //         where: {courseNo: courseNO,batchId: barchid},
    //         cellMinWidth: 100,
    //         // page: true, //开启分页
    //         // page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
    //         //     layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
    //         //     //curr: 5, //设定初始在第 5 页
    //         //     groups: 1, //只显示 1 个连续页码
    //         //     first: false, //不显示首页
    //         //     last: false //不显示尾页
    //         // },
    //         cols: [
    //             [ //表头
    //                 {
    //                     fixed: 'left',
    //                     title: '序号',
    //                     type: 'numbers',
    //                     width: 50
    //                 }, {
    //                 field: 'cname',
    //                 title: '姓名',
    //                 sort: true
    //             }, {
    //                 field: 'username',
    //                 title: '学号',
    //                 sort: true
    //             }
    //             ]
    //         ],
    //         id: 'test',
    //         // data: [],
    //         skin: 'line', //表格风格
    //         even: false,
    //         // limits: [5, 7, 10, 20],
    //         // limit: 5 //每页默认显示的数量
    //     });
    // }else if(groupId!=''){
    //     var groupid = Number(groupId);
    //     table.render({
    //         elem: '#test',
    //         url: zuulUrl + "api/timetable/manage/apiListOfGroupScheduledStudents",
    //         headers: {Authorization: getJWTAuthority()},
    //         title: '学生列表',
    //         method: 'post',
    //         contentType: "application/json;charset=UTF-8",
    //         where: {courseNo: courseNO,groupId: groupid},
    //         cellMinWidth: 100,
    //         // page: true, //开启分页
    //         // page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
    //         //     layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
    //         //     //curr: 5, //设定初始在第 5 页
    //         //     groups: 1, //只显示 1 个连续页码
    //         //     first: false, //不显示首页
    //         //     last: false //不显示尾页
    //         // },
    //         cols: [
    //             [ //表头
    //                 {
    //                     fixed: 'left',
    //                     title: '序号',
    //                     type: 'numbers',
    //                     width: 50
    //                 }, {
    //                 field: 'cname',
    //                 title: '姓名',
    //                 sort: true
    //             }, {
    //                 field: 'username',
    //                 title: '学号',
    //                 sort: true
    //             }
    //             ]
    //         ],
    //         id: 'test',
    //         // data: [],
    //         skin: 'line', //表格风格
    //         even: false,
    //         // limits: [5, 7, 10, 20],
    //         // limit: 5 //每页默认显示的数量
    //     });
    // }
//监听行工具事件
    table.on('tool(test)', function(obj) {
        var data = obj.data;
        if(obj.event === 'detail') {
            var str = '<table class="layui-hide" id="conflictDetails" lay-filter="conflictDetails"></table>'
            layer.open({
                type: 1,
                skin: 'layui-layer-lan' //样式类名
                ,title: '学生姓名：'+ data.cname
                ,closeBtn: 0
                ,shadeClose: true
                ,area: ['800px', '600px']
                ,offset: 'auto'
                ,content: str
            });
            table.render({
                elem: '#conflictDetails'
                ,url: zuulUrl + "api/timetable/manage/apiGetTimeTableConflictDetailsOfStudent"
                ,where: {
                    studentUsername: data.username,
                    term: $('#term').val(),
                    tag: $('#tags').val(),
                }
                ,contentType: "application/json;charset=UTF-8"
                ,method: 'post'
                ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                ,parseData: function(res){
                    var pdata = {
                        "code": 0, //解析接口状态
                        "msg": "", //解析提示文本
                        "count": res.total, //解析数据长度
                        "data": [] //解析数据列表
                    };
                    pdata.data = res.data;
                    return pdata;
                }
                ,cols: [[
                    {fixed: 'left',title: '序号',type: 'numbers',width: 50}
                    ,{field:'courseName', align: 'center', title: '冲突课程'}
                    ,{field:'user', align: 'center', title: '上课教师'}
                    ,{field:'userPhone', align: 'center', title: '联系方式'}
                    ,{field:'tag', align: 'center', title: '冲突时间段'}
                ]]
            });
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