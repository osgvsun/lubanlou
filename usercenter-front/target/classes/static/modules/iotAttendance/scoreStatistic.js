layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form

    //向世界问个好
    layer.msg('进入实验课程成绩统计');
    var isCreat

    form.render(null, 'coursestatisticbox');

    //获取课程下拉框
    $.ajax({
        url: attendanceHost + "/getCourseList",
        headers: {
            "x-datasource": getCookie('datasource.cookie'),
        },
        dataType:"JSON",
        success:function(res){
            //回调函数
            let  str = `<option value="${res.data[0]['course_name']}">${res.data[0]['course_name']}</option>`
            if (res.data.length === 0) {
                str = `<option value="">暂无课程数据</option>`
            } else {
                for (let i = 0; i < res.data.length; i++) {
                    str += `<option value="${res.data[i]['course_name']}">${res.data[i]['course_name']}</option>`
                }
            }
            $(`select[name=courseName]`).html("");
            $(`select[name=courseName]`).append(str);
            form.render('select', "coursestatisticbox");
        },
    })
    //获取教师下拉框
    $.ajax({
        url: attendanceHost + "/getTeacherList",
        dataType:"JSON",
        success:function(res){
            //回调函数
            let str = `<option value="">请选择教师</option>`
            if (res.data.length === 0) {
                str = `<option value="">暂无教师数据</option>`
            } else {
                for (let i = 0; i < res.data.length; i++) {
                    str += `<option value="${res.data[i]['teachers']}">${res.data[i]['teachers']}</option>`
                }
            }
            $(`select[name=teacher]`).html("");
            $(`select[name=teacher]`).append(str);
            form.render('select', "coursestatisticbox");
        },
    })

    //执行一个表单
    table.render({
        elem: '#coursestatistic',
       // url: '../modules/iotAttendance/static/json/courseAttendanceDetail.json', //数据接口
         url: attendanceHost + '/courseStatistics',
        where:{'username': $.cookie('username'), 'cname': $.cookie('cname'), 'authorities': $.cookie('current')},
        // method: 'get',
        // contentType :"application/json",
        title: '列表',
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
                {fixed: 'left', title: '序号', type: 'numbers', width: 50},
                {field: 'cname', title: '姓名', sort: true, width: 80},
                {field: 'username', title: '学号', sort: true, width: 120},
                {field: 'datetime1', title: '上课时间', sort: true, width: 120},
                {title: '打分', width: 200,
                    templet: function (d) {
                        var str= '<input type="number" id="mark" name="mark" value="'+ d.mark +'" >';

                        return str;
                    }},
                {title: '评语', width: 200,
                    templet: function (d) {
                        if(d.comment!=undefined){
                            var str= '<input type="text" id="comment" name="comment" value="'+ d.comment +'" >';

                            return str;
                        }else {
                            var str= '<input type="text" id="comment" name="comment" value="" >';

                            return str;
                        }
                    }},
                {fixed: 'right', title: '操作', toolbar: '#toolbar', width: 120}
            ]
        ],
        id: 'coursestatistic',
        request:{
            pageName:"page",
            limitName:"limit"
        },
        data: table,
        skin: 'line', //表格风格
        even: false,
        limits: [5, 7, 10, 20, 50, 100],
        limit: 10, //每页默认显示的数量
        parseData:function(res) {
            var currentData = res.records;
            return {
                code: 0,
                data: currentData,
                curr: res.count,
                count: res.total,
            }
        },
        done: function (res) {
            $.ajax({
                url: transcriptHost+`/openApi/createGradeBook`,
                type:'post',
                data:{
                    siteId:id,
                    siteName:courseName,
                    assignmentId:res.data.id,
                    assignmentTitle:res.data.courseName,
                    type:"attendence",
                    weight:1.0,
                    module:"experience"
                },
                success:function(res){
                    //                layer.msg res.msg)
                    isCreat=res.code
                }
            });
        }
    });


    //监听行工具事件
    table.on('tool(coursestatistic)', function(obj) {
        var mark =$("#mark").val()  //获取打分
        var  comment =$("#comment").val()
        //提交打分
        if(obj.event === 'submit') {
            if(isCreat==0){
                $.ajax({
                    url: transcriptHost+`/saveRecord`,
                    type:'post',
                    data:{
                        siteId:id,
                        points:mark,
                        username:obj.username,
                        cname : obj.studentName,
                        assignmentId:obj.id,
                    },
                    success:function(res){

                    }
                });
            }else {
                layer.msg("保存失败，请重新保存")
                table.reload("courseattendancedetail",{
                    where: {
                        id:id,
                        startTime: $('input[name=startattendance]').val(),
                        endTime : $('input[name=endattendance]').val(),
                        username : $('input[name=searchbox]').val(),
                        hardwareIps :hardwareIps
                    }

                },'data')
            }

        };

    });


    var $ = layui.$,
        active = {
            reload: function() {
                var courseName = $('select[name=courseName]').val();
                var username = $('input[name=searchbox]').val();

                //执行重载
                table.reload('coursestatistic', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        courseName,
                        username
                    }
                }, 'data');
            }
        };

    $('.search_line .layui-btn').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});