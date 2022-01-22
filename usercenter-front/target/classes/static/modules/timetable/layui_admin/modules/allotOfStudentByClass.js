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

    var courseNo = $('#courseNo').val();
    // var term = $('#term').val();
    var batchId = $('#batchId').val();
    // var groupId = $('#groupId').val();
    var barchid = Number(batchId);
    var options= ''
    var overflows= []
    window.getClassList = function () {
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/timetable/manage/apiGetAdministrativeClassesList",
            headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify({courseNo: courseNo,groupId: 0,batchId: barchid}),
            async: false,
            type: "post",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                // console.log(res);
                options= ''
                $.each(res.data, function (index, item) {
                    options = options + '<option value="' + item.id + '">' + item.text + '</option>';
                });

            },
            error: function (res) {
                alert('error!')
            }
        });
    }
    getClassList();
    table.render({
        elem: '#test',
        url: zuulUrl + "api/timetable/manage/apiGetTimetableGroupByBatchId",
        headers: {Authorization: getJWTAuthority()},
        title: '小组列表',
        method: 'post',
        contentType: "application/json;charset=UTF-8",
        where: {batchId: barchid},
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
                field: 'groupName',
                title: '小组名称',
                sort: true
            }, {
                field: 'groupNumber',
                title: '最大人数',
                sort: true
            }, {
                field: 'groupStudentNumbers',
                title: '当前人数',
                sort: true
            }, {
                field: 'classesChoose',
                templet: function (d) {
                    var result = "";
                    if(!d.flag){
                        overflows.push(d.LAY_INDEX);
                    }
                    // var flag = false;
                    if(d.flag){
                        result+=d.classSelectedString;
                    }else{
                        result+='<select class="layui-form" name="classeschoose_'+ d.groupId +'" id="classeschoose_'+ d.groupId +'" xm-select="classeschoose_'+ d.groupId +'" xm-select-skin="normal" xm-select-search="" lay-filter="classeschoose">' +
                            '<option value="">请选择班级</option>';
                        result+=options;
                        result+=   '</select>';
                    }
                    return result;
                },
                title: '选择行政班',
                sort: true
            }, {
                fixed: 'right',
                title: '操作',
                toolbar: '#line_toolbar',
                // width: 80
            }
            ]
        ],
        id: 'test',
        // data: [],
        skin: 'line', //表格风格
        even: false,
        // limits: [5, 7, 10, 20],
        // limit: 5 //每页默认显示的数量
        done: function (res, curr, count) {
            //数据渲染完的回调。
            //由于layui 设置了超出隐藏，所以这里改变下，以兼容操作按钮的下拉菜单
            $.each(overflows,function (index,item) {
                $('.layui-table tr').eq(item).find('td').eq(4).children().css('overflow','visible');
            });
            $(".layui-table-body, .layui-table-box").css('overflow','visible');

            layui.formSelects.render();
            layui.formSelects.btns(['remove']);
            $.each(res.data,function (index,item) {
                layui.formSelects.value('classeschoose_'+item.groupId, item.classSelected);
            })
        }
    });

//监听行工具事件
    table.on('tool(test)', function(obj) {
        var data = obj.data;
        if(obj.event === 'addClass') {
            layer.confirm('是否确定添加', function(index) {
                var dtos = [];
                var chooseclass = 'classeschoose_'+obj.data.groupId;
                var classNumber = layui.formSelects.value(chooseclass, 'valStr');
                var dto = {groupId: obj.data.groupId,classNumber: classNumber,courseNo:courseNo};
                dtos.push(dto);
                $.ajax({
                    url: zuulUrl + "api/timetable/manage/apiSaveTimetableGroupStudentByAdministrativeClass",
                    headers: {Authorization: getJWTAuthority()},
                    data: JSON.stringify(dtos),
                    async: false,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    success: function (res) {
                        if(res){
                            layer.msg("<span style='color:white'>添加成功</span>");
                            var batchId = $('#batchId').val();
                            var barchid = Number(batchId);
                            getClassList();
                            overflows = [];
                            table.reload('test',{
                                headers: {Authorization: getJWTAuthority()},
                                where:{batchId: barchid}
                            });
                        }
                    }
                });
                layer.close(index);
            });
        }else if(obj.event === 'editClass'){
            var result = '';
            $.ajax({
                // url: weekUrl + "?term=16&weekday=-1",
                url: zuulUrl + "api/timetable/manage/apiGetAdministrativeClassesList",
                headers: {Authorization: getJWTAuthority()},
                data: JSON.stringify({courseNo: courseNo,groupId: obj.data.groupId}),
                async: false,
                type: "post",
                contentType: "application/json;charset=UTF-8",
                success: function (res) {
                    console.log(res);
                    result+='<select class="layui-form" name="classeschoose_'+ obj.data.groupId +'" id="classeschoose_'+ obj.data.groupId +'" xm-select="classeschoose_'+ obj.data.groupId +'" xm-select-skin="normal" xm-select-search="" lay-filter="classeschoose">' +
                        '<option value="">请选择班级</option>';
                    $.each(res.data, function (index, item) {
                        result = result + '<option value="' + item.id + '">' + item.text + '</option>';
                    });
                    result+=   '</select>';
                    $(obj.tr[0].children[4].children[0]).html(result);
                    $(obj.tr[0].children[4].children[0]).css('overflow','visible');
                    $(obj.tr[0].children[5].children[0].children[1]).addClass('layui-hide');
                    $(obj.tr[0].children[5].children[0].children[0]).removeClass('layui-hide');
                    layui.formSelects.render();
                    layui.formSelects.btns(['remove']);
                    layui.formSelects.value('classeschoose_'+obj.data.groupId, obj.data.classSelected);
                    $(obj).hide();
                },
                error: function (res) {
                    alert('error!');
                }
            });

        }
    });
    var $ = layui.$,
        active = {
            reload: function() {
                var searchbox = $('#searchbox');

                //执行重载
                table.reload('test', {
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