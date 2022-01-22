$(document).ready(function () {
    $("#currYear").text(localStorage.getItem("currYear"));
    tableRender();
    insertOpen();
});

//列表查询方法
function tableRender() {
    let search = $('#search').val();
    let auth = $.cookie('currentAuthBydatashare');
    coll = [];
    //教师权限只能编辑排课要求
    if (auth==='TEACHER'){
        coll.push({type: 'checkbox', fixed: 'left'},
            {
                title: '序号',
                type: 'numbers'
            }, {
                field: 'courseNo',
                title: '教学班编号'
            },{
                field: 'courseNumber',
                title: '课程编号'
            }, {
                field: 'teacher',
                title: '主讲教师工号'
            }, {
                field: 'courseName',
                title: '课程名称'
            }, {
                field: 'termNumber',
                title: '学期代码'
            }, {
                field: 'academyNumber',
                title: '开课学院编号'
            }, {
                field: 'planStudentNumber',
                title: '计划人数'
            },{
                field: 'courseSource',
                title: '教学班来源（为空或者DATA_PUSH:共享推送教学班；SELF:自主排课教学班）'
            },{
                field: 'classNumbers',
                title: '上课班级编号'
            }, {
                field: 'courseApp',
                title: '课程类别(1：坐班答疑；2：自习)'
            },{
                field: 'courseRequirements',
                title: '排课要求',
                edit: 'text'
            },{
                title: '课程计划',
                align: 'center',
                toolbar: '#course-option1'
            }, {
                title: '课程学生',
                align: 'center',
                toolbar: '#course-option2'
            }
        );
    }else {
        coll.push({type: 'checkbox', fixed: 'left'},
            {
                title: '序号',
                type: 'numbers'
            }, {
                field: 'courseNo',
                title: '教学班编号'
            },{
                field: 'courseNumber',
                title: '课程编号',
                edit: 'text'
            }, {
                field: 'teacher',
                title: '主讲教师工号',
                edit: 'text'
            }, {
                field: 'courseName',
                title: '课程名称'
            }, {
                field: 'termNumber',
                title: '学期代码',
                edit: 'text'
            }, {
                field: 'academyNumber',
                title: '开课学院编号',
                edit: 'text'
            }, {
                field: 'planStudentNumber',
                title: '计划人数',
                edit: 'text'
            },{
                field: 'courseSource',
                title: '教学班来源（为空或者DATA_PUSH:共享推送教学班；SELF:自主排课教学班）',
                edit: 'text'
            },{
                field: 'classNumbers',
                title: '上课班级编号',
                edit: 'text'
            }, {
                field: 'courseApp',
                title: '课程类别(1：坐班答疑；2：自习)',
                edit: 'text'
            },{
                field: 'courseRequirements',
                title: '排课要求',
                edit: 'text'
            },{
                title: '课程计划',
                align: 'center',
                toolbar: '#course-option1'
            }, {
                title: '课程学生',
                align: 'center',
                toolbar: '#course-option2'
            }
        );
    }

    layui.use(['table'], function () {
        let table = layui.table;
        table.render({
            elem: '#lay_table_school_course',
            method: 'get',
            url: datashareHost + "getSchoolCourseList",
            where: {
                search: search,
                limsAuth: auth
            },
            page: true,
            size: 'sm',
            even: true,
            toolbar: '#schoolCourse_toolbar', //开启工具栏
            cols: [coll]
        });

        //监听头工具栏事件
        table.on('toolbar(lay_table_school_course)', function (obj) {
            var checkStatus = table.checkStatus(obj.config.id)
                , data = checkStatus.data; //获取选中的数据
            switch (obj.event) {
                case 'update':
                    if (data.length === 0) {
                        layer.msg('请选择一行');
                    } else if (data.length > 1) {
                        layer.msg('只能同时编辑一个');
                    } else {
                        var updateData = data[0];
                        let schoolCourseExpand = new Object();
                        schoolCourseExpand['courseApp'] = data[0].courseApp;
                        updateData['schoolCourseExpandDTO'] = schoolCourseExpand;
                        layer.confirm('真的要修改吗', function (index) {
                            $.ajax({
                                url: datashareHost + "shared/updateSchoolCourse",
                                type: "post",
                                contentType: "application/json",
                                dataType: "json",
                                data: JSON.stringify(updateData),
                                success: function (res) {
                                    layui.layer.alert(res.msg);
                                    table.reload("lay_table_school_course");
                                },
                                error: function () {
                                    layui.layer.alert("请求超时");
                                }
                            })
                        })
                    }
                    break;
                case 'delete':
                    if (data.length === 0) {
                        layui.layer.alert('请选择一行');
                    } else {
                        layer.confirm('真的要删除吗', function (index) {
                            $.ajax({
                                url: datashareHost + "shared/deleteSchoolCourse",
                                type: "post",
                                contentType: "application/json",
                                dataType: "json",
                                data: JSON.stringify(data),
                                success: function (res) {
                                    layui.layer.alert(res.msg);
                                    table.reload("lay_table_school_course");
                                },
                                error: function () {
                                    layui.layer.alert("请求超时");
                                }
                            })
                        })
                    }
                    break;
                case 'insert':
                    layer.open({
                        type: 2,
                        title: "新增教学班",
                        area: ['100%', '100%'],
                        content: 'newSchoolCourse'
                    });
                    break;
            }
            ;
        });


        table.on('tool(lay_table_school_course)', function (obj) {
            let data = obj.data;
            switch (obj.event) {
                case 'viewDetail':
                    layer.open({
                        type: 2,
                        title: "课程计划",
                        area: ['100%', '100%'],
                        content: 'viewDetail?courseNo='+data.courseNo
                    });
                    break;
                case 'viewCourseStudent':
                    layer.open({
                        type: 2,
                        title: "课程学生",
                        area: ['100%', '100%'],
                        content: 'viewCourseStudent?courseNo='+data.courseNo
                    });
                    break;
            }
            ;
        });
    });
}

//取消查询
function cancelSearch() {
    $('#search').val("");
    tableRender();
}

//判断新增是否开启
function insertOpen() {
    $.ajax({
        url: datashareHost + "report/configData",
        success: function (data) {
            let num = 0;
            if (data.insertByWebIsOpen!=null&&data.insertByWebIsOpen!=undefined&&data.insertByWebIsOpen){
                num++;
                $("#dataInsert").show();
            }else {
                $("#dataInsert").hide();
            }
        }
    });
}

layui.use('upload', function () {
    let upload = layui.upload;
    var layer = layui.layer;
    function loading(msg){
        msgindex = layer.msg(msg, {
            icon:16,
            shade:[0.1, '#fff'],
            time:false,  //不自动关闭
            offsetqiuchuy:"100px"
        })
    }
    upload.render({
        elem: '#importSchoolCourse',
        url: datashareHost + 'shared/uploadSchoolCourseByExcel',
        accept: 'file',
        exts: 'xlsx',
        before: function (res) {
            loading("数据导入中,请耐心等待......");
        },
        done: function (res) {
            if (res.code === 0){
                layer.confirm(res.msg, {
                    btn : [ '确定']//按钮
                }, function() {
                    location.reload();
                })
            }else {
                layui.layer.alert(res.msg);
            }
        },
        error: function () {
            layui.layer.msg("访问超时");
        }
    });
});
