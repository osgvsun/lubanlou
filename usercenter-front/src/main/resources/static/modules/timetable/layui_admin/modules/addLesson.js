var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl = $("#zuulServerUrl").val() + "/timetable/";
layui.use(['index', 'form', 'laydate'], function() {
	var $ = layui.$,
		admin = layui.admin,
		element = layui.element,
		layer = layui.layer,
		form = layui.form,
		laydate = layui.laydate

	//向世界问个好
	//layer.msg('');

	//日期
	laydate.render({
		elem: '#date'
	});

	form.render(null, 'addlessonbox');
    initializationInfo();
    function initializationInfo(){
    	var academyNumber = $('#academyNumber').val();
    	var courseNo = $('#courseNo').val();
    	var termid = $('#termid').val();
        $.ajax({
            url: zuulUrl + "api/school/apiCourseSchedulingAddLesson",
            headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify({academyNumber: academyNumber,courseNo: courseNo,term: termid}),
            async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
            	console.log(res);
            	var weekstr='';
            	var itemstr='';
            	var teacherstr='';
                $.each(res.resultsWeek, function (index, item) {
                    weekstr +=   '<option value="' + item.id + '">' + item.id + '</option>';
                });
                $.each(res.resultsOperationItem, function (index, item) {
                    itemstr +=   '<option value="' + item.id + '">' + item.text + '</option>';
                });
                $.each(res.resultsTeacher, function (index, item) {
                    teacherstr +=   '<option value="' + item.id + '">' + item.text + '</option>';
                });
                $('#addweek').append(weekstr);
                $('#addproject').append(itemstr);
                $('#addteacherone').append(teacherstr);
                $('#addteachertwo').append(teacherstr);
                layui.formSelects.render();
            }
        });
    }
    // $('#addclass').next().find('.xm-form-select').children('.xm-select-title').click(function () {
    //     var teacherstr =   '<option value="1">22</option>';
    //     $('#addclass').append(teacherstr);
    //     layui.formSelects.render();
    //     $('#addclass').next().find('.xm-form-select').children('.xm-select-title').click();
    // });
    layui.formSelects.closed('addweek', function(id){
        var weeks = layui.formSelects.value('addweek', 'valStr');
        // var weekdays = layui.formSelects.value('addday', 'valStr');
        var weekdays = $('#addday').val();
        var tags = $('#tags').val();
        tags = tags.split('*');
        if(weeks.length>0&&weekdays.length>0){
            $.ajax({
                url: zuulUrl + "api/school/apiCourseSchedulingAddLessonJudgeSection",
                headers: {Authorization: getJWTAuthority()},
                data: JSON.stringify({tag: tags,weeks: weeks,weekdays: weekdays}),
                async: false,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                success: function (res) {
                    console.log(res);
                    var teacherstr;
                    $.each(res.resultsSection, function (index, item) {
                        teacherstr +=   '<option value="' + item.id + '">' + item.text + '</option>';
                    });
                    $('#addclass').append(teacherstr);
                    layui.formSelects.render('addclass');
                }
            });
		}


    });
    form.on('select(addday)', function(data){
        // console.log(data.elem); //得到select原始DOM对象
        // console.log(data.value); //得到被选中的值
        // console.log(data.othis); //得到美化后的DOM对象
        var weeks = layui.formSelects.value('addweek', 'valStr');
        var weekdays = data.value;
        var tags = $('#tags').val();
        tags = tags.split('*');
        if(weeks.length>0&&weekdays.length>0){
            $.ajax({
                url: zuulUrl + "api/school/apiCourseSchedulingAddLessonJudgeSection",
                headers: {Authorization: getJWTAuthority()},
                data: JSON.stringify({tag: tags,weeks: weeks,weekdays: weekdays}),
                async: false,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                success: function (res) {
                    console.log(res);
                    var teacherstr;
                    $.each(res.resultsSection, function (index, item) {
                        teacherstr +=   '<option value="' + item.id + '">' + item.text + '</option>';
                    });
                    $('#addclass').append(teacherstr);
                    layui.formSelects.render('addclass');
                }
            });
        }
    });
    layui.formSelects.closed('addclass', function(id){
        var classes = layui.formSelects.value('addclass', 'valStr');
        var weeks = layui.formSelects.value('addweek', 'valStr');
        var weekdays = $('#addday').val();
        var term = $('#termid').val();
        var academyNumber = $('#academyNumber').val();
        if(classes.length>0){
            $.ajax({
                url: zuulUrl + "api/school/apiCourseSchedulingAddLessonJudgeLab",
                headers: {Authorization: getJWTAuthority()},
                data: JSON.stringify({term: term,academyNumber: academyNumber,weeks: weeks,weekdays: weekdays}),
                async: false,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                success: function (res) {
                    console.log(res);
                    var labstr='';
                    $.each(res.resultsLabRoom, function (index, item) {
                        labstr +=   '<option value="' + item.id + '">' + item.text + '</option>';
                    });
                    $('#addaddress').append(labstr);
                    layui.formSelects.render('addaddress');
                }
            });
        }


    });
    layui.formSelects.on('addday', function(id, vals, val, isAdd, isDisabled){
        //id:           点击select的id
        //vals:         当前select已选中的值
        //val:          当前select点击的值
        //isAdd:        当前操作选中or取消
        //isDisabled:   当前选项是否是disabled
        //如果return false, 那么将取消本次操作
    });
	//监听提交
	form.on('submit(addlessonbtn)', function(data) {
		var field = data.field; //获取提交的字段
        console.log(data);
        var JudgeConflictTimeTableVOs = [];
        var JudgeConflictTimeTableVO = new Object();
        JudgeConflictTimeTableVO.weeks = data.field.addweek;
        JudgeConflictTimeTableVO.classes = data.field.addclass;
        JudgeConflictTimeTableVO.weekday = data.field.addday;
        JudgeConflictTimeTableVO.term = $('#termid').val();
        JudgeConflictTimeTableVO.courseNo = $('#courseNo').val();
        JudgeConflictTimeTableVO.labRoomId = data.field.addaddress;
        JudgeConflictTimeTableVO.item = data.field.addproject;
        JudgeConflictTimeTableVO.teacher = data.field.addteacherone;
        JudgeConflictTimeTableVO.tutor = data.field.addteachertwo;
        JudgeConflictTimeTableVO.status = 10;
        JudgeConflictTimeTableVO.timetableStyle = 3;
        JudgeConflictTimeTableVO.createdBy = username;
        JudgeConflictTimeTableVOs.push(JudgeConflictTimeTableVO);
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/school/apiSaveTimetableAppointmentByJudgeConflict",
            headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify(JudgeConflictTimeTableVOs),
            async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                if(res){
                    layer.msg('保存成功');
                    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    // return false;
                    //提交 Ajax 成功后，关闭当前弹层并重载表格
                    //$.ajax({});
                    parent.layui.table.reload('addlessonbox'); //重载表格
                    parent.layer.close(index); //再执行关闭
                };
            },
            error: function (res) {
                layer.msg(res);
            }
        });
	});

	//实验项目信息
	form.val('addlessonbox', {
		"": ""//备注
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