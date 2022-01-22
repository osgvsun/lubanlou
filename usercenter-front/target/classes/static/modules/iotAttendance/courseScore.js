layui.use(['laypage', 'layer', 'table', 'laydate', 'element', 'form'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        laydate = layui.laydate,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form

    //向世界问个好
    layer.msg('进入实验成绩');

    form.render(null, 'courseattendancebox');

    let year = new Date();
    year = year.getFullYear();
    //执行一个表单
    table.render({
        elem: '#courseattendance',
        //url: '../modules/iotAttendance/static/json/courseAttendance.json', //数据接口
        url: attendanceHost + "/getTimetableCourse",
        where: {'username': $.cookie('username'), 'cname': $.cookie('cname'), 'authorities': $.cookie('current')},
        method: 'post',
        //method: 'get',
        headers: {
            "x-datasource": getCookie('datasource.cookie'),
        },
        title: '列表',
        cellMinWidth: 100,
        page: true, //开启分页
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            curr: 1, //设定初始在第 1 页
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
                field: 'courseNo',
                title: '选课组编号',
                sort: true
            }, {
                field: 'courseName',
                title: '课程名称',
                sort: true
            }, {
                field: 'lpName',
                title: '实验项目',
                sort: true
            }, {
                field: 'termName',
                title: '学期',
                sort: true
            }, {
                field: 'academyName',
                title: '学院',
                sort: true
            }, {
                field: 'labName',
                title: '实验室',
                sort: true
            }, {
                field: 'teacher',
                title: '上课教师',
                sort: true
            }, {
                field: 'classDate',
                title: '上课日期',
                sort: true
            }, {
                field: 'weeks',
                title: '周次',
                sort: true
            }, {
                field: 'weekday',
                title: '星期',
                sort: true
            }, {
                field: 'startClass',
                title: '开始节次',
                sort: true
            }, {
                field: 'endClass',
                title: '结束节次',
                sort: true
            }, {
                fixed: 'right',
                title: '操作',
                toolbar: '#toolbar',
                width: 120
            }
            ]
        ],
        id: 'courseattendance',
        request: {
            pageName: "page",
            limitName: "limit"
        },
        data: table,
        skin: 'line', //表格风格
        even: true,
        limits: [5, 7, 10, 20, 50, 100],
        limit: 10, //每页默认显示的数量
        parseData: function (res) {
            var currentData = res.data;
            for (var i = 0; i < currentData.length; i++) {
                try {
                    var status = OAuth2.isUserEnabled(currentData[i].username);
                    currentData[i].status = status;
                } catch (e) {
                    currentData[i].status = false
                }
            }

            return {
                code: 0,
                data: currentData,
                curr: res.current,
                count: res.count
            }
        }
    });

    //监听行工具事件
    table.on('tool(courseattendance)', function (obj) {
        //打开打分页面
        if (obj.event === 'attendance') {
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '打分',
                area: ['500px', '441px'],
                shade: 0.5,
                maxmin: true,
                content: `courseScoreDetail?id=${obj.data.id}&classDate=${obj.data.classDate}&startTime=${obj.data.startTime}&endTime=${obj.data.endTime}&courseName=${obj.data.courseName}&hardwareIps=${obj.data.hardwareIps}&weeks=${obj.data.weeks}&weekday=${obj.data.weekday}&startClass=${obj.data.startClass}&endClass=${obj.data.endClass}`,
                zIndex: layer.zIndex //重点1
                ,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#courseattendancedetailbtn");
                    submit.click();
                }
            });
            layer.full(index);
        }
        ;
    });
    // //获取课程下拉框
    // $.ajax({
    // 	url: attendanceHost + "/getCourseList",
    // 	dataType:"JSON",
    // 	success:function(res){
    // 		//回调函数
    // 		let str = `<option value="">请选择课程</option>`
    // 		if (res.data.length === 0) {
    // 			str = `<option value="">暂无课程数据</option>`
    // 		} else {
    // 			for (let i = 0; i < res.data.length; i++) {
    // 				str += `<option value="${res.data[i]['course_name']}">${res.data[i]['course_name']}</option>`
    // 			}
    // 		}
    // 		$(`select[name=courseName]`).html("");
    // 		$(`select[name=courseName]`).append(str);
    // 		form.render('select', "courseattendancebox");
    // 	},
    // })
    // //获取教师下拉框
    // $.ajax({
    // 	url: attendanceHost + "/getTeacherList",
    // 	dataType:"JSON",
    // 	success:function(res){
    // 		//回调函数
    // 		let str = `<option value="">请选择教师</option>`
    // 		if (res.data.length === 0) {
    // 			str = `<option value="">暂无教师数据</option>`
    // 		} else {
    // 			for (let i = 0; i < res.data.length; i++) {
    // 				str += `<option value="${res.data[i]['teacher_name']}">${res.data[i]['teacher_name']}</option>`
    // 			}
    // 		}
    // 		$(`select[name=teacher]`).html("");
    // 		$(`select[name=teacher]`).append(str);
    // 		form.render('select', "courseattendancebox");
    // 	},
    // })

    //学期
    $.ajax({
        url: apiGateWayHost+ 'datashare/datashare/openapi/getSchoolTermList',
        dataType: 'json',
        type: 'get',
        success: function (data) {
            $.each(data.data, function (index, item) {
                $("select[name=termSelect]").append(new Option(item.termName, item.termNumber));// 下拉菜单里添加元素
            });
            form.render("select");
        }
    })
    var $ = layui.$,
        active = {
            reload: function () {
                // var searchbox = $('#searchbox');
                var search = $('input[name=searchbox]').val();
                var termNumber = $('select[name=termSelect]').val();
                var termName = $('select[name=termSelect]').find("option:selected").text();
                //执行重载
                table.reload('courseattendance', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        // key: {
                        // 	labname: searchbox.val()
                        // }
                        search: search,
                        termNumber: termNumber,
                        termName: termName
                    }
                }, 'data');
            }
        };

    $('.search_line .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});