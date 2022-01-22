layui.config({
    base: $("meta[name='contextPath']").attr("content")+'/layui_admin/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    index: 'lib/index', //主入口模块
    // deviceBatchGlobal: 'modules/deviceBatchGlobal', //如果 mymod.js 是在根目录，也可以不用设定别名
    // formSelects: 'modules/formSelects', //如果 mymod.js 是在根目录，也可以不用设定别名
});
var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl = $("#zuulServerUrl").val() + "/timetable/";

layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage //分页
		,
		layer = layui.layer //弹层
		,
		table = layui.table //表格
		,
		form = layui.form,
		laydate = layui.laydate,
		$ = layui.jquery,
		element = layui.element //元素操作

	//向世界问个好
	// layer.msg('进入分批、分组');
    getCourseInfo();
    getTimetableBatchList();
    function getCourseInfo() {
        var courseNo = $('#courseNo').val();
        var term = $('#termid').val();
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/school/getEducationalSchedulingCourseInfo",
            headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify({courseNo: courseNo,termId: term}),
            // async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                console.log(res);
                // for(var i =0;i<res.length;i++){
                var coursePlan = "<span>"+ res.coursePlan +"</span>";
                var username_cname = res.teacher;
                if(res.credits!=null){
                    var lab_credits = "实验学分"+res.credits+"分";
                    $('.lab_credits').append(lab_credits);
                }else{
                    $('.lab_credits').hide();
                }
                // }
                $('.course_plan').append(coursePlan);
                $('.lab_requirements').append('实验要求:'+res.courseSchedulingRequirements);
                $('.username_cname').append(username_cname);
                $('.studentlist').append('学生名单('+res.studentNumber+')');
            }
        });
    }

    function getTimetableBatchList() {
        var courseNo = $('#courseNo').val();
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/timetable/manage/apiJudgeTimetableBatchList",
            headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify({courseNo: courseNo,sort: 'courseName',order: 'asc',createdBy:username}),
            // async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                console.log(res);
                $('#batch_list').html('');
                var str = '';
                $.each(res.rows, function (index, item) {
                    if(item.timetableGroupDTOs.length === 0){
                        var rowspan = 1
                    }else {
                        var rowspan = item.timetableGroupDTOs.length
                    }
                    str+='<tr>' +
                        '<th rowspan="'+ rowspan +'" class="schedule_day_th layui-row layui-col-space10">' +
                        '<div class="batch_name">'+ item.batchName +'</div>' +
                        '<div class="batch_name_edit" style="display: none"><input id="batchName'+ index +'" class="layui-input" type="text"/></div>' +
                        '<input type="button" class="layui-btn layui-btn-xs add_batch" onclick="addBatch('+ item.id +')" value="新增组" />' +
                        '<input type="button" class="layui-btn layui-btn-xs edit_batch" onclick="editBatch(this,'+ index +')" value="编辑" />' +
                        '<input type="button" style="display: none" class="layui-btn layui-btn-xs save_batch" onclick="saveBatch('+ item.id +',this,'+ index +')" value="确定" />' +
                        '<input type="button" style="display: none" class="layui-btn layui-btn-xs cancel_batch" onclick="cancelBatch(this,'+ index +')" value="取消" />' +
                        '<input type="button" class="layui-btn layui-btn-xs layui-btn-danger delete_batch" onclick="deleteBatch('+ item.id +')" value="删除" />' +
                        '</th>' +
                        '<th id="elective_date" rowspan="'+ rowspan +'" class="layui-row elective_date">' +
                        '<div class="start_time">'+ item.startTime +'</div>' +
                        '<div class="start_time_edit" style="display: none"><input id="startTime'+ index +'" class="layui-input" type="text"/></div>' +
                        '<div>~</div>' +
                        '<div class="end_time">'+ item.endTime +'</div>' +
                        '<div class="end_time_edit" style="display: none"><input id="endTime'+ index +'" class="layui-input" type="text"/></div>' +
                        '</th>' +
                        '<th rowspan="'+ rowspan +'">';
                        if(item.ifselect == 0){
                            if(item.distributionMode == 1){
                                str+='';
                            }else{
                                str+='<div><input type="button" class="layui-btn layui-btn-info layui-btn-xs" onclick="allotStudent('+ item.id +','+ item.distributionMode +')" value="分配学生" /></div>'
                            }

                        }
                        str+='<div style="margin-top: 5px;"><input type="button" class="layui-btn layui-btn-info layui-btn-xs" onclick="batchStudentList('+ item.id +')" value="学生名单" /></div>'+
                        '</th>' ;
                            if(item.timetableGroupDTOs.length!=0){
                                str+='<td>'+ item.timetableGroupDTOs[0].groupName +'('+ item.timetableGroupDTOs[0].groupNumber +')</td>' +
                                '<td>' +
                                '<input type="button" class="layui-btn layui-btn-info layui-btn-xs" onclick="groupStudentList('+ item.timetableGroupDTOs[0].id +')" value="'+ item.timetableGroupDTOs[0].groupStudentNumbers +'/'+ item.timetableGroupDTOs[0].groupNumber +'" />' +
                                '</td>' +
                                '<td>';
                                if(item.timetableGroupDTOs[0].isArrange==1){
                                    str+=
                                    '<input type="button" class="layui-btn layui-btn-info layui-btn-xs" onclick="getScheduleByGroupId('+ item.timetableGroupDTOs[0].id +')" value="排课" />' +
                                    '<input type="button" class="layui-btn layui-btn-info layui-btn-xs" onclick="getScheduleRecordByGroupId('+ item.timetableGroupDTOs[0].id +')" value="排课记录" />' ;
                                }else if(item.timetableGroupDTOs[0].isArrange==0){
                                    str+='<span>您还未分配学生</span>'
                                }

                                str+='<input type="button" class="layui-btn layui-btn-info layui-btn-xs delete_btn" onclick="deleteGroup('+ item.timetableGroupDTOs[0].id +')" value="删除" />' +
                                '</td>' ;
                            }else{
                                str+='<td></td><td></td><td></td>'
                            }

                    str+= '</tr>'
                    if(item.timetableGroupDTOs.length>1){
                        for(var i=1;i<item.timetableGroupDTOs.length;i++){
                            str +='<tr>' +
                                '<td>'+ item.timetableGroupDTOs[i].groupName +'('+ item.timetableGroupDTOs[i].groupNumber +')</td>' +
                                '<td>' +
                                '<input type="button" class="layui-btn layui-btn-info layui-btn-xs" onclick="groupStudentList('+ item.timetableGroupDTOs[i].id +')" value="'+ item.timetableGroupDTOs[i].groupStudentNumbers +'/'+ item.timetableGroupDTOs[i].groupNumber +'" />' +
                                '</td>' +
                                '<td>';
                                if(item.timetableGroupDTOs[i].isArrange==1){
                                    str+=
                                        '<input type="button" class="layui-btn layui-btn-info layui-btn-xs" onclick="getScheduleByGroupId('+ item.timetableGroupDTOs[i].id +')" value="排课" />' +
                                        '<input type="button" class="layui-btn layui-btn-info layui-btn-xs" onclick="getScheduleRecordByGroupId('+ item.timetableGroupDTOs[i].id +')" value="排课记录" />' ;
                                }else if(item.timetableGroupDTOs[i].isArrange==0){
                                    str+='<span>您还未分配学生</span>';
                                }
                                // '<input type="button" class="layui-btn layui-btn-info layui-btn-xs" onclick="getScheduleByGroupId('+ item.timetableGroupDTOs[i].id +')" value="排课" />' +
                                // '<input type="button" class="layui-btn layui-btn-info layui-btn-xs" onclick="getScheduleRecordByGroupId('+ item.timetableGroupDTOs[i].id +')" value="排课记录" />' +
                            str+='<input type="button" class="layui-btn layui-btn-info layui-btn-xs delete_btn" onclick="deleteGroup('+ item.timetableGroupDTOs[i].id +')" value="删除" />' +
                                '</td>' +
                                '</tr>';
                        }
                    }
                });
                $('#batch_list').append(str);

                if (res.rows.length!=0 && res.rows[0].ifselect === 0){
                    $(".elective_date").css('display', 'none');
                    $('#thead-head th:eq(1)').css('display', 'none');
                } else {
                    $(".elective_date").removeAttr('style');
                    $('#thead-head th:eq(1)').removeAttr('style');
                }
            }
        });
    }
    window.deleteBatch = function (id) {
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/timetable/manage/apiDeleteTimetableBatch?batchId="+id+"&createdBy="+username,
            headers: {Authorization: getJWTAuthority()},
            async: false,
            type: "post",
            // contentType: "application/json;charset=UTF-8",
            success: function (res) {
                if(res){
                    layer.msg('删除成功');
                    getTimetableBatchList();
                }else{
                    // alert('删除失败');
                    layer.msg('删除失败');
                }
            },
            error: function (res) {
                // alert('请求错误');
                layer.msg('请求错误');
            }
        });
    };
    window.addBatch = function (id) {
        $.ajax({
            url: zuulUrl + "/api/timetable/manage/insertTimetableGroupByBatch?batchId="+id,
            headers: {Authorization: getJWTAuthority()},
            async: false,
            type: "POST",
            success: function (res) {
                if(res.code === 200){
                    layer.msg('添加成功');
                    getTimetableBatchList();
                }else{
                    // alert('修改失败');
                    layer.msg('添加失败');
                }
            },
            error: function (res) {
                // alert('请求错误');
                layer.msg('请求错误');
            }
        })
    };
    window.editBatch = function (obj,index) {
        $(obj).prev().prev().show();
        // $(obj).prev().prev().prev().hide();
        $(obj).prev().hide().prev().prev().hide();
        // var batchinput = '<input id="batchName" class="layui-input" type="text"/>';
        // var startinput = '<input id="startTime" class="layui-input" type="text"/>';
        // var endinput = '<input id="endTime" class="layui-input" type="text"/>';
        // $(obj).prev().append(batchinput);
        $(obj).parent().next().children('.start_time').hide();
        $(obj).parent().next().children('.end_time').hide();
        $(obj).parent().next().children('.start_time_edit').show();
        $(obj).parent().next().children('.end_time_edit').show();
        // var start_time = $(obj).parent().next().children('.start_time');
        // var end_time = $(obj).parent().next().children('.end_time');
        // start_time.html(startinput);
        // end_time.html(endinput);
        laydate.render({
            elem: '#startTime'+index
            ,trigger: 'click'
        });
        laydate.render({
            elem: '#endTime'+index
            ,trigger: 'click'
        });
        $(obj).hide();
        $(obj).next().show();
        $(obj).next().next().show();
        $(obj).next().next().next().hide();
    };
    window.cancelBatch = function (obj,index) {
        $(obj).prev().prev().prev().prev().hide();
        $(obj).prev().prev().prev().prev().prev().show();
        $(obj).parent().next().children('.start_time').show();
        $(obj).parent().next().children('.end_time').show();
        $(obj).parent().next().children('.start_time_edit').hide();
        $(obj).parent().next().children('.end_time_edit').hide();
        $(obj).hide();
        $(obj).prev().hide();
        $(obj).prev().prev().show();
        $(obj).next().show();
        $('#batchName'+index).val('');
        $('#startTime'+index).val('');
        $('#endTime'+index).val('');
    };
    window.saveBatch = function (id,obj,index) {
        var batchName = $('#batchName'+index).val();
        var startDate = $('#startTime'+index).val();
        var endDate = $('#endTime'+index).val();
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/timetable/manage/apiUpdateTimetableBatch",
            headers: {Authorization: getJWTAuthority()},
            data:JSON.stringify({batchId: id,batchName: batchName,startDate: startDate,endDate: endDate}),
            async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                if(res){
                    layer.msg('修改成功');
                    getTimetableBatchList();
                }else{
                    // alert('修改失败');
                    layer.msg('修改失败');
                }
            },
            error: function (res) {
                // alert('请求错误');
                layer.msg('请求错误');
            }
        });
    };
    window.deleteGroup = function (id) {
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/timetable/manage/apiDeleteTimetableGroup?groupId="+id+"&createdBy="+username,
            headers: {Authorization: getJWTAuthority()},
            async: false,
            type: "post",
            // contentType: "application/json;charset=UTF-8",
            success: function (res) {
                if(res){
                    layer.msg('删除成功');
                    getTimetableBatchList();
                }else{
                    // alert('删除失败');
                    layer.msg('删除失败');
                }
            },
            error: function (res) {
                // alert('请求错误');
                layer.msg('请求错误');
            }
        });
    };
    window.addGroup = function (id) {
        // $.ajax({
        //     // url: weekUrl + "?term=16&weekday=-1",
        //     url: zuulUrl + "api/timetable/manage/apiDeleteTimetableGroup?groupId="+id+"&createdBy="+username,
        //     headers: {Authorization: getJWTAuthority(),"x-datasource": "limsproduct"},
        //     async: false,
        //     type: "post",
        //     // contentType: "application/json;charset=UTF-8",
        //     success: function (res) {
        //         if(res){
        //             layer.msg('删除成功');
        //             getTimetableBatchList();
        //         }else{
        //             // alert('删除失败');
        //             layer.msg('删除失败');
        //         }
        //     },
        //     error: function (res) {
        //         // alert('请求错误');
        //         layer.msg('请求错误');
        //     }
        // });
    };
    //查看当前批次下所有学生
    window.batchStudentList = function (id) {
        var courseNo=$('#courseNo').val();
        var term=$('#termid').val();
        var that = this;
        //多窗口模式，层叠置顶
        var index = layer.open({
            type: 2, //此处以iframe举例
            // url: ,
            title: '学生名单',
            area: ['500px', '490px'],
            shade: 0.5,
            maxmin: true,
            content: location.origin + '/teacherInformationCenter/lims/timetable/course/listofScheduledStudents?courseNo='+courseNo+'&term='+term+'&batchId='+id
        });
        layer.full(index);
    };
    //分配学生
    window.allotStudent = function (id,type) {
        var courseNo=$('#courseNo').val();
        var term=$('#termid').val();
        if(type == 0){
            layer.msg('请选择学生分配方式<br>↓↓↓', {
                time: 20000, //20s后自动关闭
                // skin : "my-skin",
                shade:0.1,
                shadeClose:true,
                btn: ['随机安排', '行政班安排', '自行安排']
                ,btn1: function(index, layero){
                    //按钮【按钮1】的回调
                    $.ajax({
                        // url: weekUrl + "?term=16&weekday=-1",
                        url: zuulUrl + "api/timetable/manage/apiSaveTimetableGroupStudent?batchId="+id,
                        headers: {Authorization: getJWTAuthority()},
                        data: {batchId: id},
                        async: false,
                        type: "POST",
                        contentType: "application/json;charset=UTF-8",
                        success: function (res) {
                            if(res){
                                layer.msg('安排成功');
                                getTimetableBatchList();
                            }
                            console.log(res);
                        },
                        error: function (res) {
                            layer.msg(res);
                            // return false;
                        }
                    });
                    layer.close(index);
                }
                ,btn2: function(index, layero){
                    var index = layer.open({
                        type: 2, //此处以iframe举例
                        // url: ,
                        title: '行政班安排',
                        area: ['500px', '490px'],
                        shade: 0.5,
                        maxmin: true,
                        content: location.origin + '/teacherInformationCenter/lims/timetable/course/allotOfStudentByClass?batchId='+id+'&courseNo='+courseNo,
                        end: function () {
                            getTimetableBatchList();
                        }
                    });
                    layer.full(index);
                    // layer.close(index);
                }
                ,btn3: function(index, layero){
                    // window.open('http://baidu.com', '_self')
                    var index = layer.open({
                        type: 2, //此处以iframe举例
                        // url: ,
                        title: '自行安排',
                        area: ['500px', '490px'],
                        shade: 0.5,
                        maxmin: true,
                        content: location.origin + '/teacherInformationCenter/lims/timetable/course/allotOfStudentBySelf?batchId='+id+'&courseNo='+courseNo+'&term='+term,
                        end: function () {
                            getTimetableBatchList();
                        }
                    });
                    layer.full(index);
                    // layer.close(index);
                }
            });
        }else if(type == 2){
            var index = layer.open({
                type: 2, //此处以iframe举例
                // url: ,
                title: '行政班安排',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: location.origin + '/teacherInformationCenter/lims/timetable/course/allotOfStudentByClass?batchId='+id+'&courseNo='+courseNo,
                end: function () {
                    getTimetableBatchList();
                }
            });
            layer.full(index);
        }else if(type == 3){
            var index = layer.open({
                type: 2, //此处以iframe举例
                // url: ,
                title: '自行安排',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: location.origin + '/teacherInformationCenter/lims/timetable/course/allotOfStudentBySelf?batchId='+id+'&courseNo='+courseNo+'&term='+term,
                end: function () {
                    getTimetableBatchList();
                }
            });
            layer.full(index);
        }

    };
    //查看当前小组下所有学生
    window.groupStudentList = function (id) {
        var courseNo=$('#courseNo').val();
        var term=$('#termid').val();
        var that = this;
        //多窗口模式，层叠置顶
        var index = layer.open({
            type: 2, //此处以iframe举例
            // url: ,
            title: '学生名单',
            area: ['500px', '490px'],
            shade: 0.5,
            maxmin: true,
            // content: location.origin + '/teacherInformationCenter/timetable/course/listofScheduledStudents?courseNo='+courseNo+'&term='+term+'&groupId='+id
            content: location.origin + '/teacherInformationCenter/lims/timetable/course/adjustGroupStudent?course_no='+courseNo+'&group_id='+ id+'&term='+ term,
            end: function () {
                getTimetableBatchList();
            }
        });
        layer.full(index);
    };
    window.getScheduleByGroupId = function (id) {
        var that = this;
        //多窗口模式，层叠置顶
        // layer.closeAll();
        var index = parent.layer.getFrameIndex(window.name);
        var courseNo = $('#courseNo').val();
        var term = $('#termid').val();
        window.parent.window.judgmentBatchesCourseThree(term,courseNo,id);
    };
    window.getScheduleRecordByGroupId = function (id) {
        var that = this;
        //多窗口模式，层叠置顶
        // layer.closeAll();
        var index = parent.layer.getFrameIndex(window.name);
        var courseNo = $('#courseNo').val();
        var term = $('#termid').val();
        window.parent.window.judgmentBatchesCourseRecord(term,courseNo,id);
    };
	form.render(null, 'newbatch');

	//日期
	laydate.render({
		elem: '#startdate'
        ,range: '~' //或 range: '~' 来自定义分割字符
	});
	laydate.render({
		elem: '#enddate'
	});
    //监听提交
    form.on('submit(newbatchbtn)', function(data) {
        var field = data.field; //获取提交的字段
        console.log(data);
        var timetableBatchDTO = new Object();
        timetableBatchDTO.batchName = field.batchName;
        timetableBatchDTO.countGroup = field.batchNum;
        timetableBatchDTO.numbers = field.groupNum;
        timetableBatchDTO.startopDate = field.startdate;
        // timetableBatchDTO.startDate = field.startdate;
        // timetableBatchDTO.endDate = field.enddate;
        timetableBatchDTO.ifselect = field.lessonselect;
        timetableBatchDTO.maxGroupNum  = field.oneChooseNum;
        // timetableBatchDTO.maxDropNum  = field.maxDropNum;
        timetableBatchDTO.courseNo = $('#courseNo').val();
        timetableBatchDTO.flag = 0;
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/timetable/manage/apiSaveJudgeTimetableBatch",
            headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify(timetableBatchDTO),
            async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                console.log(res);
                $('#newbatch')[0].reset();
                getTimetableBatchList();
                return false;
            },
            error: function (res) {
                layer.msg(res);
                return false;
            }
        });
        return false;
    });

    //打开实验项目
	var project = {
		projectdetail: function() {
			layer.msg('实验项目');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '实验项目',
				area: ['500px', '490px'],
				shade: 0.5,
				maxmin: true,
				content: 'test.html'
			});
			layer.full(index);
		}
	};
	$('.projectdetail').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		project[method] ? project[method].call(this, othis) : '';
	});

    //打开学生名单
    var student = {
        studentlist: function() {
            // layer.msg('学生名单');
            var courseNo=$('#courseNo').val();
            var term=$('#termid').val();
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2, //此处以iframe举例
                // url: ,
                title: '学生名单',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: location.origin + '/teacherInformationCenter/lims/timetable/course/listofScheduledStudents?courseNo='+courseNo+'&term='+term
            });
            layer.full(index);
        }
    };
    $('.studentlist').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        student[method] ? student[method].call(this, othis) : '';
    });
    //跳过此步骤
    var skipStep = {
        skipStep: function() {
            var that = this;
            //多窗口模式，层叠置顶
            var courseNo = $('#courseNo').val();
            var term = $('#termid').val();
            window.parent.window.judgmentBatchesCourseThree(term,courseNo,undefined);
        }
    };
    $('.skipStep').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        skipStep[method] ? skipStep[method].call(this, othis) : '';
    });
    //上一步页面
    var previousStep = {
        previousStep: function() {
            var that = this;
            //多窗口模式，层叠置顶
            var courseNo = $('#courseNo').val();
            var term = $('#termid').val();
            window.parent.window.judgmentBatchesCourse(term,courseNo,0);
        }
    };
    $('.previousStep').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        previousStep[method] ? previousStep[method].call(this, othis) : '';
    });
    //下一步页面
    var nextStep = {
        nextStep: function() {
            var that = this;
            //多窗口模式，层叠置顶
            // layer.closeAll();
            var index = parent.layer.getFrameIndex(window.name);
            var courseNo = $('#courseNo').val();
            var term = $('#termid').val();
            window.parent.window.judgmentBatchesCourseThree(term,courseNo,undefined);
        }
    };
    $('.nextStep').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        nextStep[method] ? nextStep[method].call(this, othis) : '';
    });
    var inputStart = $("input[type='radio']:checked").val();
    if (inputStart == 0){
        $('#thead-head th:eq(1)').css('display', 'none');
        $('.course-selection-time').css('display', 'none');
        $('.elective_date').css('display', 'none');
    } else {
        $('.course-selection-time').css('display', 'block');
        $('#thead-head th:eq(1)').removeAttr('style');
        $('.elective_date').removeAttr('style');
    }
    form.on('radio(lessonselect)', function(data){
        if (data.value == 0){
            $('#thead-head th:eq(1)').css('display', 'none');
            $('.course-selection-time').css('display', 'none');
            $('.elective_date').css('display', 'none');
        } else {
            $('.course-selection-time').css('display', 'block');
            $('#thead-head th:eq(1)').removeAttr('style');
            $('.elective_date').removeAttr('style');
        }
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
function onlyNonNegative(obj) {
    var inputChar = event.keyCode;
    //alert(event.keyCode);

    //1.判断是否有多于一个小数点
    if(inputChar==190 ) {//输入的是否为.
        var index1 = obj.value.indexOf(".") + 1;//取第一次出现.的后一个位置
        var index2 = obj.value.indexOf(".",index1);
        while(index2!=-1) {
            //alert("有多个.");

            obj.value = obj.value.substring(0,index2);
            index2 = obj.value.indexOf(".",index1);
        }
    }
    //2.如果输入的不是.或者不是数字，替换 g:全局替换
    obj.value = obj.value.replace(/[^(\d|.)]/g,"");
}