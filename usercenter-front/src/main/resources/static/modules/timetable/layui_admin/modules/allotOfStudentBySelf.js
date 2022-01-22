/**
 * Created by 77947 on 2019/10/15.
 */
/**
 * Created by 77947 on 2019/8/12.
 */
var contextPath = $("meta[name='contextPath']").attr("content");
layui.config({
    base: contextPath+'/layui_admin/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    index: 'lib/index', //主入口模块
});
var zuulUrl = $("#zuulServerUrl").val() + "/timetable/";
var checked=new Array();
layui.use(['laypage', 'layer', 'table', 'element','form'], function() {
    var admin = layui.admin,
        laypage = layui.laypage //分页
        ,
        layer = layui.layer //弹层
        ,
        table = layui.table //表格
        ,
        form = layui.form  //表单
        ,
        $ = layui.jquery,
        element = layui.element //元素操作

    //向世界问个好
    // layer.msg('进入页面名称');
    getAllGroupsByBatchId();
    getClass();
    var courseNO = $('#courseNo').val();
    var term = $('#term').val();
    var batchId = $('#batchId').val();
    // var groupId = $('#groupId').val();
    // var str='';
    function getAllGroupsByBatchId() {
        var batchId = $('#batchId').val();
        var barchid = Number(batchId);
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/timetable/manage/apiGetTimetableGroupByBatchId",
            headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify({batchId: barchid}),
            async: false,
            type: "post",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                console.log(res);
                // $('#groupsRadio').html('');
                var str='';
                str+='<script type="text/html" id="toolbarDemo">'+
                    '<div class="layui-btn-container" id="groupsRadio">';
                $.each(res.data, function (index, item) {
                    str = str + '<input type="radio" name="group" value="'+ item.groupId +'" title="'+ item.groupName +'" lay-filter="groupradio" lay-tips="最大人数:'+ item.groupNumber +',当前人数:'+ item.groupStudentNumbers +'">';
                });
                str+='</div>' +
                    '<button class="layui-btn saveStudent" lay-event="save">确定</button>' +
                    '</script>';
                $('.student_table').append(str);
            },
            error: function (res) {
                // layer.msg(res);
            }
        });
    }
    function getClass() {
        var academyNumber = $('#academyNumber').val();
        var courseNo = $('#courseNo').val();
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiGetAdministrativeClassesList",
            headers: {Authorization: getJWTAuthority()},
            async: false,
            data: JSON.stringify({courseNo: courseNo}),
            type: "post",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                // console.log(res);
                $.each(res.data, function (index, item) {
                    $("#class_choose").append('<option value="' + item.id + '">' + item.text + '</option>');
                });
                form.render();
            }
        });
    }
    //执行一个表单
    table.render({
        elem: '#test',
        toolbar: '#toolbarDemo', //开启头部工具栏，并为其绑定左侧模板
        defaultToolbar: [],
        url: zuulUrl + "api/timetable/manage/apiGetChoiceStudentList",
        title: '学生列表',
        method: 'post',
        contentType: "application/json;charset=UTF-8",
        headers: {Authorization: getJWTAuthority()},
        where: {courseNo: courseNO,termId: term,batchId: batchId},
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
                    type: 'checkbox',
                    fixed: 'left'
                },
                // {
                //     fixed: 'left',
                //     title: '序号',
                //     type: 'numbers',
                //     width: 50
                // },
                {
                    field: 'cname',
                    title: '姓名',
                    sort: true
                }, {
                field: 'username',
                title: '学号',
                sort: true
            }, {
                field: 'className',
                title: '所在班级',
                sort: true
            }, {
                field: 'academyName',
                title: '所在学院',
                sort: true
            }
            ]
        ],
        id: 'test',
        // data: [],
        skin: 'line', //表格风格
        even: false,
        limits: [10, 15, 20, 40],
        limit: 15, //每页默认显示的数量
        done: function (res) {
            var groupId = $('#groupId').val();
            if(groupId!=''&&groupId!=null){
                $(":radio[name='group'][value="+ groupId +"]").prop("checked","checked");
                form.render('radio');
            }
            // enableShiftCheck($('.layui-table-fixed :checkbox'));
            // form.render('checkbox');
            // 设置换页勾选之前的
            // console.log(checked);
            //在缓存中找到PM_CODE ,然后设置data表格中的选中状态
            //循环所有数据，找出对应关系，设置checkbox选中状态
            for(var i=0;i<res.data.length;i++){
                for(var j=0;j<checked.length;j++){
                    if(res.data[i].username==checked[j]){
                        //这里才是真正的有效勾选
                        res.data[i]["LAY_CHECKED"]='true';
                        //找到对应数据改变勾选样式，呈现出选中效果
                        var index= res.data[i]['LAY_TABLE_INDEX'];
                        $('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', true);
                        $('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').next().addClass('layui-form-checked');
                    }
                }
            }
        }
    });


    var $ = layui.$,
        active = {
            reload: function() {
                var startUser = $('#startUser').val();
                var endUser = $('#endUser').val();
                var class_choose = $('#class_choose').val();

                //执行重载
                table.reload('test', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        // key: {
                        startStudentNumber: startUser,
                        endStudentNumber: endUser,
                        classNumber: class_choose,
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
    table.on('checkbox(test)', function(obj){
        var _this = obj.tr[1];
        handleCheck1(event,_this);
        form.render('checkbox');
        // var flag = $(_this).find('.layui-form-checkbox').hasClass('layui-form-checked')
        console.log(obj.checked); //当前是否选中状态
        console.log(obj.data); //选中行的相关数据
        console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
        // if(obj.checked){
        if(obj.type == 'all'){
            if(obj.checked) {
                var cache = table.cache['test'];
                for (var j = 0; j < cache.length; j++) {
                    for(var i=checked.length-1;i>-1;i--){
                        if(checked[i] == cache[j].username){
                            checked.splice(i,1);
                        }
                    }
                }
                for (var i = 0; i < cache.length; i++) {
                    checked.push(cache[i].username);
                }
                // $.cookie("checkedCourse",checked);
            }else {
                var cache = table.cache['test'];
                for (var j = 0; j < cache.length; j++) {
                    for(var i=checked.length-1;i>-1;i--){
                        if(checked[i] == cache[j].username){
                            checked.splice(i,1);
                        }
                    }
                }
            }
        }else if(obj.type == 'one'){
            if(event.shiftKey) {
                const boxs = document.querySelectorAll('.layui-table-fixed .layui-table-body .layui-form-checkbox');
                const boxArr = Array.from(boxs);
                boxArr.forEach(function(value,index,arr) {
                    // console.log('123')
                    var u = $('.layui-table-main table tr').eq(index).find('td').eq(2).find('div').text();
                    if($(value).hasClass('layui-form-checked')){
                        if(checked.indexOf(u)==-1){
                            checked.push(u);
                        }
                    }else{
                        if(checked.indexOf(u)!=-1){
                            checked.splice(checked.indexOf(u), 1);
                        }
                    }
                });
            }else{
                // if(obj.checked) {
                if($(_this).find('.layui-form-checkbox').hasClass('layui-form-checked')) {
                    for(var i=checked.length-1;i>-1;i--){
                        if(checked[i] == obj.data.username){
                            checked.splice(i,1);

                        }
                    }
                    checked.push(obj.data.username);
                }else {
                    for(var i=checked.length-1;i>-1;i--){
                        if(checked[i] == obj.data.username){
                            checked.splice(i,1);
                        }
                    }
                }
            }

        }
        // }
        console.log(checked);

    });
    //头工具栏事件
    table.on('toolbar(test)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'save':
                var groupId = $("input[name='group']:checked").val();
                if(groupId == undefined){
                    layer.msg('请先选择一个小组!');
                    break;
                }
                $.ajax({
                    // url: weekUrl + "?term=16&weekday=-1",
                    url: zuulUrl + "api/timetable/manage/apiSaveGroupStudentBySelfArrange",
                    headers: {Authorization: getJWTAuthority()},
                    data: JSON.stringify({students: checked,groupId: 0,inGroupId: groupId}),
                    async: false,
                    type: "post",
                    contentType: "application/json;charset=UTF-8",
                    success: function (res) {
                        // console.log(res);
                        if(res){
                            layer.msg('添加成功');
                            table.reload('test',{
                                page: 1,
                                headers: {Authorization: getJWTAuthority()},
                            });
                            checked = [];
                        }

                    },
                    error: function (res) {
                        // layer.msg(res);
                    }
                });
                break;
        };
    });
    form.on('radio(groupradio)', function (data) {
        // alert(data.elem);
        var tip = $(data.elem).attr('lay-tips');
        var groupId = $(data.elem).attr('value');
        $('#groupId').val(groupId);
        layer.tips(tip, data.othis, {
            tips: [1, '#409eff'],
            time: 4000
        });
        // var startUser = $('#startUser').val();
        // var endUser = $('#endUser').val();
        // var class_choose = $('#class_choose').val();
        //
        // //执行重载
        // table.reload('test', {
        //     page: {
        //         curr: 1 //重新从第 1 页开始
        //     },
        //     where: {
        //         // key: {
        //         startStudentNumber: startUser,
        //         endStudentNumber: endUser,
        //         classNumber: class_choose,
        //         groupId: groupId,
        //         // }
        //     },
        //     contentType: "application/json;charset=UTF-8",
        // }, 'data');
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