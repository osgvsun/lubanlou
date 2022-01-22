layui.config({
    base: $("meta[name='contextPath']").attr("content")+'/layui_admin/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    index: 'lib/index', //主入口模块
    // deviceBatchGlobal: 'modules/deviceBatchGlobal', //如果 mymod.js 是在根目录，也可以不用设定别名
    // formSelects: 'modules/formSelects', //如果 mymod.js 是在根目录，也可以不用设定别名
});
var isCheck = false;
var stduentCheck = false;
var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl = $("#zuulServerUrl").val() + "/timetable/";
var records = [];
var courseTeacher;
var teacherList;
var ctrlKey = false;//判断是否按下ctrl
var msgindex;
var differentindex;
var studentNumber;
layui.use(['laypage', 'layer', 'table', 'element'], function() {
	var admin = layui.admin,
		laypage = layui.laypage //分页
		,
		layer = layui.layer //弹层
		,
		table = layui.table //表格
		,
		form = layui.form,
		$ = layui.jquery,
		element = layui.element //元素操作
    var timetableConfigInfo = getTimetableConfig("timetable");
    var requiredItemSelect = (timetableConfigInfo!=null&&timetableConfigInfo.requiredItemSelect !=null) ? timetableConfigInfo.requiredItemSelect: false;
    var singleSelectFromTeacher = (timetableConfigInfo!=null&&timetableConfigInfo.singleSelectFromTeacher !=null) ? timetableConfigInfo.singleSelectFromTeacher: false;
    var requiredSoftManage = (timetableConfigInfo!=null&&timetableConfigInfo.requiredSoftManage !=null) ? timetableConfigInfo.requiredSoftManage: false;
    var requiredVirtualImage = (timetableConfigInfo!=null&&timetableConfigInfo.requiredVirtualImage !=null) ? timetableConfigInfo.requiredVirtualImage: false;
    var requiredTimetableStation = (timetableConfigInfo!=null&&timetableConfigInfo.requiredTimetableStation !=null) ? timetableConfigInfo.requiredTimetableStation: false;
    getPageInfoRedis();
    getCourseInfo();
    getSelectList();
    getScheduleTable(0);
    function getCourseInfo() {
        var courseNo = $('#courseNo').val();
        var term = $('#termid').val();
        var groupId=$('#groupId').val();
        var timetableStyle=$('#timetableStyle').val();
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/school/getEducationalSchedulingCourseInfo",
            headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify({courseNo: courseNo,termId: term,groupId: groupId,timetableStyle: timetableStyle}),
            // async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                console.log(res);
                // for(var i =0;i<res.length;i++){
                var coursePlan = "<span>"+ res.coursePlan +"</span>";
                var username_cname = res.teacher;
                courseTeacher = res.teacher;
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
                studentNumber = res.studentNumber;
            }
        });
    }
    function getScheduleTable(type) {
        // $('#tableselect').selectable();
        var termId = $('#termid').val();
        var courseNo = $('#courseNo').val();
        var weekdaySelect = layui.formSelects.value('weekdaySelect', 'val');
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/timetable/manage/apiDateSectionListOfBatchScheduled",
            headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify({term: termId,courseNo: courseNo}),
            async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                if(type==1){
                    $('#schedule_tab tbody').remove();
                }
                console.log(res);
                var str='';
                var str2='';
                var strweekday='';
                var years=[];//当前课程所跨年份
                var weekNum = 0;
                var dates = [];//当前课程所有日期
                var weekdays = ['一','二','三','四','五','六','七'];
                var startYear = res.data[0].data[0].dates.split(',')[0].split('-')[0];
                var lastYear = res.data[res.data.length-1].data[res.data[res.data.length-1].data.length-1].dates.split(',')[res.data[res.data.length-1].data[res.data[res.data.length-1].data.length-1].dates.split(',').length-1].split('-')[0];
                years.push(startYear);
                years.push(lastYear);
                $.each(res.data, function (index, item) {
                    str+='<th colspan="'+ item.data.length +'">'+ item.month +'</th>';
                    weekNum = weekNum+item.data.length;
                    $.each(item.data, function (i, week) {
                        dates.push({weeknum:week.id,weekdates:week.dates});
                        str2+='<th id="week_'+ week.id +'" lay-tips="'+ week.tip +'">'+ week.id +'</th>'
                    });
                });
                if(type==0){
                    // $('#month_th').append(str);
                    $('#weeks_th').append(str2);
                    flag = true;
                }
                $.each(weekdays, function (index, item) {
                    var weekd = index+1;
                    strweekday+='<tbody data-album="weekdays'+ weekd +'">' +
                        '<tr>' +
                        '<th rowspan="'+ res.rows.length +'" id="weekday_'+ weekd +'" class="schedule_day_th">'+ item +'</th>' +
                        '<th class="not_check" lay-tips="'+ res.rows[0].tip +'">'+ res.rows[0].text +'</th>';  /*节次栏*/
                    for(var i=0;i<weekNum;i++){
                        var weektd = i+1;
                        var weekdaytd = index+1;
                        strweekday+='<td id="'+ weektd +'_'+ weekdaytd +'_'+ res.rows[0].id +'"><label></label><i></i><i></i></td>';
                    }
                    strweekday+='</tr>';
                    if(res.rows.length>1){
                        for(var k=1;k<res.rows.length;k++){
                            strweekday+='<tr>' +
                                '<th class="not_check" lay-tips="'+ res.rows[k].tip +'">'+ res.rows[k].text +'</th>';  /*节次栏*/
                            for(var j=0;j<weekNum;j++){
                                var weektd = j+1;
                                var weekdaytd = index+1;
                                strweekday+='<td id="'+ weektd +'_'+ weekdaytd +'_'+ res.rows[k].id +'"><label></label><i></i><i></i></td>';
                            }
                            strweekday+='</tr>';
                        }
                    }
                    strweekday+='</tbody>';
                });
                $('#schedule_tab').append(strweekday);
                weekNum1 = weekNum;
                var tdwidth = 100/weekNum;
                $('.schedule_tab td').css('width',tdwidth+'%');

                if(res.result[0].week_danger!=null){
                    $.each(res.result[0].week_danger, function (index, item) {
                        $('#week_'+item).addClass('class_plan');
                    });
                }
                if(res.result[0].weekday_danger!=null){
                    $.each(res.result[0].weekday_danger, function (index, item) {
                        $('#weekday_'+item).addClass('class_plan_fff');
                    });
                }
                if(weekdaySelect.length>0){
                    $('.schedule_tab tbody').hide();
                }
                $.each(weekdaySelect,function (index,item) {
                    $('[data-album="weekdays'+ item +'"]').show();
                })
                // $('#week_1').addClass('class_plan');
                // $('#weekday_1').addClass('class_plan_fff');
                //找到节假日设定底色
                $.each(years,function (yi,year) {
                    $.get('http://timor.tech/api/holiday/year/'+year+'/',function (result) {
                        // console.log(result);
                        // console.log(dates);
                        var weekn;//节假日所在周次
                        var weekd;//节假日所在星期
                        var idc;//id前缀
                        $.each(result.holiday,function (index,item) {
                            if(item.holiday){
                                $.each(dates,function (i,d) {
                                    if(d.weekdates.indexOf(item.date)!=-1){
                                        $.each(d.weekdates.split(','),function (j,o) {
                                            if(o == item.date){
                                                weekn = d.weeknum;
                                                weekd = j+1;
                                                idc = weekn+'_'+weekd+'_';
                                            }
                                        })
                                        // $("*[id^="+ idc +"]").css('background-color','rgb(236, 86, 86,0.3)')
                                        $("*[id^="+ idc +"]").addClass('holiday_times')
                                    }
                                })
                            }
                        })
                    })
                })
            }
        });
    }
    function loading(msg){
        msgindex = layer.msg(msg, {
            icon:16,
            shade:[0.1, '#fff'],
            time:false,  //不自动关闭
            offset:"100px"
        })
    }
    function openMsg(obj) {
        // console.log('------open msg')
        differentindex = layer.tips('<i class="layui-icon layui-icon-loading"></i>   ',obj, {
            tips: [1, '#3595CC'],
            time: 30000
        });
        var labRoomId = layui.formSelects.value('labselect', 'valStr');
        var termId = $('#termid').val();
        var w_d_c = $(obj).attr('id');
        var teacherusernames = '';
        if(teacherList!=''){
            if(teacherList.length>0){
                $.each(teacherList,function (index,item) {
                    teacherusernames+= item.username+ ",";
                })
                teacherusernames = teacherusernames.slice(0,teacherusernames.length-1);
            }
        }
        function getJWTAuthority1() {
            var authorization ="";
            initDirectoryEngine({
                getHostsUrl:contextPath+"/shareApi/getHosts",
                getAuthorizationUrl:contextPath+"/shareApi/getAuthorization"
            });
            getAuthorization({
                // async:false,
                success:function(data){
                    authorization =data;
                }
            });
            return authorization;
        }
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiGetTimeTableConflictDetails",
            headers: {Authorization: getJWTAuthority1()},
            data: JSON.stringify({
                teacher: teacherusernames,
                labRoomId: labRoomId,
                term: termId,
                weeks: w_d_c.split('_')[0],
                weekday: w_d_c.split('_')[1],
                classes: w_d_c.split('_')[2]
            }),
            // async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                console.log(res);
                var str  = '';
                $.each(res.data,function (index,item) {
                    if(item.labRoom!=null){
                        if(item.courseName!=null){
                            str+='课程名称：'+item.courseName + '<br>' +
                                '授课教师：'+item.user + '<br>' +
                                '联系方式：'+item.userPhone + '<br>' +
                                '实验室：'+item.labRoom + '<br><hr />  ';
                        }else{
                            str+='预约人：'+item.user + '<br>' +
                                '联系方式：'+item.userPhone + '<br>' +
                                '实验室：'+item.labRoom + '<br><hr />  ';
                        }
                    }else{
                        str+='冲突课程：'+item.courseName + '<br>' +
                            '授课教师：'+item.user + '<br>' +
                            '联系方式：'+item.userPhone + '<br><hr />  ';
                    }

                })
                differentindex = layer.tips(str,obj, {
                    tips: [1, '#3595CC'],
                    time: 30000
                });
            }
        });
    }
    form.on('submit(getResult)', function(data){
        // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        var termId = $('#termid').val();
        var courseNo = $('#courseNo').val();
        // var academyNumber = $('#academyNumber').val();
        // var teacherList = $.cookie('addTeacher');
        // var teachers = teacherList.split(",");
        var teacherusernames = '';
        if(teacherList!=''){
            if(teacherList.length>0){
                $.each(teacherList,function (index,item) {
                    teacherusernames+= item.username+ ",";
                })
                teacherusernames = teacherusernames.slice(0,teacherusernames.length-1);
            }
        }

        // labSelected = data.field.lab;
        var datas = {
            labId: data.field.labselect,
            teacher: teacherusernames,
            termId: termId,
            buttonT: data.field.teacher,
            buttonS: data.field.student,
            buttonL: data.field.lab,
            courseNo: courseNo,
            groupId: data.field.groupselect,
            createdBy: username,
            timetableStyle: 4
        };
        // if(data.field.lab=='1'){
            $.ajax({
                // url: weekUrl + "?term=16&weekday=-1",
                url: zuulUrl + "api/memory/apiJudgeConflictOfScheduling",
                headers: {Authorization: getJWTAuthority()},
                data: JSON.stringify(datas),
                // async: false,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                beforeSend: function () {
                    loading("数据加载中,请耐心等待......");
                },
                complete: function (){
                    layer.close(msgindex);
                },
                success: function (res) {
                    getScheduleTable(1);
                    console.log(res);
                    $('.studentlist').html('学生名单('+res.data[0].studentCount+')');
                    $('#planedTimes').html('');
                    var batchName = $('#batchselect option:selected').text();
                    var groupName = $('#groupselect option:selected').text();
                    var plan = '【'+ batchName +'-'+ groupName +'】'
                    $('#planedTimes').append(plan);
                    var groupId = $('#groupselect').val();
                    table.reload('judgmentBatchesListStepThree', {
                        url: zuulUrl + "api/timetable/manage/apiGroupTimetableOfBatchScheduled"
                        ,where: {groupId: groupId} //设定异步数据接口的额外参数
                        ,method: 'post'
                        ,contentType: "application/json;charset=UTF-8"
                        ,headers: {Authorization: getJWTAuthority()}
                        //,height: 300
                    });
                    if(res.data[0].lab_danger!=null){
                        for(var i =0;i<res.data[0].lab_danger.length;i++){
                            if(res.data[0].lab_danger[i]!=''){
                                $('#'+res.data[0].lab_danger[i]+' label').addClass('triangle_red');
                                // $('#'+res.data[0].lab_danger[i]+' i').eq(1).addClass('lesson_red');
                                // $('#'+res.data[0].lab_danger[i]+' i').eq(0).addClass('lesson_red_plan');
                                if(!$('#'+res.data[0].lab_danger[i]).hasClass('hover_flag')) {
                                    $('#'+res.data[0].lab_danger[i]).hover(function() {
                                        var _this = $(this);
                                        trigger = setTimeout(function(){
                                            openMsg(_this);// jQuery的setTimeout中不能直接使用$(this)
                                        },2000);
                                    }, function() {
                                        clearTimeout(trigger);
                                        layer.close(differentindex);
                                    });
                                }
                                $('#'+res.data[0].lab_danger[i]).addClass('hover_flag');
                            }
                        }
                    }
                    if(res.data[0].lab_reservation_danger!=null){
                        for(var i =0;i<res.data[0].lab_reservation_danger.length;i++){
                            if(res.data[0].lab_reservation_danger[i]!=''){
                                $('#'+res.data[0].lab_reservation_danger[i]+' label').addClass('triangle_warning');
                                $('#'+res.data[0].lab_reservation_danger[i]).addClass('hover_flag');
                                // $('#'+res.data[0].lab_pass[i]+' i').eq(1).addClass('triangle_green');
                                // $('#'+res.data[0].lab_pass[i]+' i').eq(0).addClass('lesson_red_plan');
                                if(!$('#'+res.data[0].lab_reservation_danger[i]).hasClass('hover_flag')) {
                                    $('#'+res.data[0].lab_reservation_danger[i]).hover(function() {
                                        var _this = $(this);
                                        trigger = setTimeout(function(){
                                            openMsg(_this);// jQuery的setTimeout中不能直接使用$(this)
                                        },2000);
                                    }, function() {
                                        clearTimeout(trigger);
                                        layer.close(differentindex);
                                    });
                                }
                                $('#'+res.data[0].lab_reservation_danger[i]).addClass('hover_flag');
                            }
                        }
                    }
                    if(res.data[0].lab_pass!=null){
                        for(var i =0;i<res.data[0].lab_pass.length;i++){
                            if(res.data[0].lab_pass[i]!=''){
                                $('#'+res.data[0].lab_pass[i]+' label').addClass('triangle_green');
                                // $('#'+res.data[0].lab_pass[i]+' i').eq(1).addClass('lesson_green');
                                // $('#'+res.data[0].lab_pass[i]+' i').eq(0).addClass('lesson_red_plan');
                            }
                        }
                    }
                    if(res.data[0].student_pass!=null){
                        for(var i =0;i<res.data[0].student_pass.length;i++){
                            if(res.data[0].student_pass[i]!=''){
                                $('#'+res.data[0].student_pass[i]+' i').eq(1).addClass('student_pass');
                            }
                        }
                    }
                    if(res.data[0].student_warning!=null){
                        for(var i =0;i<res.data[0].student_warning.length;i++){
                            if(res.data[0].student_warning[i]!=''){
                                $('#'+res.data[0].student_warning[i]+' i').eq(1).addClass('student_warning');
                            }
                        }
                    }
                    if(res.data[0].student_danger!=null){
                        for(var i =0;i<res.data[0].student_danger.length;i++){
                            if(res.data[0].student_danger[i]!=''){
                                $('#'+res.data[0].student_danger[i]+' i').eq(1).addClass('student_danger');
                            }
                        }
                    }
                    if(res.data[0].teacher_danger!=null){
                        for(var i =0;i<res.data[0].teacher_danger.length;i++){
                            if(res.data[0].teacher_danger[i]!=''){
                                $('#'+res.data[0].teacher_danger[i]+' i').eq(1).addClass('teacher_danger');
                                if(!$('#'+res.data[0].teacher_danger[i]).children('label').hasClass('triangle_warning')&&!$('#'+res.data[0].teacher_danger[i]).children('label').hasClass('triangle_red')&&!$('#'+res.data[0].teacher_danger[i]).hasClass('hover_flag')){
                                    $('#'+res.data[0].teacher_danger[i]).hover(function() {
                                        var _this = $(this);
                                        trigger = setTimeout(function(){
                                            openMsg(_this);// jQuery的setTimeout中不能直接使用$(this)
                                        },2000);
                                    }, function() {
                                        clearTimeout(trigger);
                                        layer.close(differentindex);
                                    });
                                    $('#'+res.data[0].teacher_danger[i]).addClass('hover_flag');
                                }
                            }
                        }
                    }
                    if(res.data[0].teacher_pass!=null){
                        for(var i =0;i<res.data[0].teacher_pass.length;i++){
                            if(res.data[0].teacher_pass[i]!=''){
                                $('#'+res.data[0].teacher_pass[i]+' i').eq(1).addClass('teacher_pass');
                            }
                        }
                    }
                    if(res.data[0].correlationCourse_danger!=null){
                        for(var i =0;i<res.data[0].correlationCourse_danger.length;i++){
                            if(res.data[0].correlationCourse_danger[i]!=''){
                                $('#'+res.data[0].correlationCourse_danger[i]+' i').eq(0).addClass('class_plan');
                            }
                        }
                    }
                    if(res.data[0].educational_danger!=null){
                        for(var i =0;i<res.data[0].educational_danger.length;i++){
                            if(res.data[0].educational_danger[i]!=''){
                                $('#'+res.data[0].educational_danger[i]+' i').eq(0).addClass('class_educational');
                            }
                        }
                    }
                    // $('#1_1_1 i').eq(0).addClass('class_plan');
                    isCheck = true;
                    $(document).keydown(function(event){
                        ctrlKey = event.ctrlKey;
                    });
                    $(document).keyup(function(event){
                        ctrlKey = event.ctrlKey;
                    });
                    $('[data-album]').selectable({ filter: "td",
                        start: function() {
                            if(!ctrlKey){
                                $( "#schedule_tab td" ).each(function(){
                                    if($(this).hasClass('ui-selected')){
                                        $(this).removeClass("ui-selected");
                                    }
                                });
                            }
                            ctrlKey = false;
                        }
                    });
                    return false;
                }
            });
        // }
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    function getTimetableConfig(type) {
        let config;
        $.ajax({
            url: zuulUrl + "api/common/config/apiPlatformConfigInfo?modelType="+type,
            headers: {Authorization: getJWTAuthority()},
            async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                config = data;
            }
        });
        return config;
    }
    //获取批次组次
    function getSelectList() {
        var courseNo = $('#courseNo').val();
        var groupId = $('#groupId').val();
        if(groupId=='undefined'){
            groupId='';
		}
        var academyNumber = $('#academyNumber').val();
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiLabAndBatchListOfBatchScheduled",
            headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify({courseNo: courseNo,academyNumber: academyNumber,groupId: groupId}),
            async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                console.log(res);
                var str='';
                var str2='';
                $.each(res.data[0].resultsBatch, function (index, item) {
                    str+='<option value="'+ item.id +'">'+ item.text +'</option>';
                });
                $.each(res.data[0].resultsLabRoom, function (index, item) {
                    str2+='<option value="'+ item.id +'">'+ item.text +'</option>';
                });
                $('#batchselect').append(str);
                $('#labselect').append(str2);
                $('#batchselect').val(res.data[0].batchId);
                if(groupId!=''){
                    $.ajax({
                        url: zuulUrl + "api/timetable/manage/apiGroupListOfBatchScheduled",
                        headers: {Authorization: getJWTAuthority()},
                        data: JSON.stringify({batchId: res.data[0].batchId}),
                        async: false,
                        type: "POST",
                        contentType: "application/json;charset=UTF-8",
                        success: function (res) {
                            console.log(res);
                            var str='<option value="">请选择组数</option>';
                            $.each(res.data[0].resultsGroup, function (index, item) {
                                str+='<option value="'+ item.id +'">'+ item.text +'</option>';
                            });
                            $('#groupselect').html(str);
                            $('#groupselect').val(groupId);
                            form.render('select');
                            var batchName = $('#batchselect option:selected').text();
                            var groupName = $('#groupselect option:selected').text();
                            var plan = '【'+ batchName +'-'+ groupName +'】'
                            $('#planedTimes').append(plan);
                        }
                    });
				}
                layui.formSelects.render();
                form.render('select');
            }
        });
    }
    form.on('select(batchselect)', function(data){
        // console.log(data.elem); //得到select原始DOM对象
        console.log(data.value); //得到被选中的值
        // console.log(data.othis); //得到美化后的DOM对象
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiGroupListOfBatchScheduled",
            headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify({batchId: data.value}),
            async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                console.log(res);
                var str='<option value="">请选择组数</option>';
                $.each(res.data[0].resultsGroup, function (index, item) {
                    str+='<option value="'+ item.id +'">'+ item.text +'</option>';
                });
                $('#groupselect').html(str);
                form.render('select');
            }
        });
    });
    //选择时间段范围
    var chooseLabRoom = {
        chooseLabRoom: function() {
            if(!isCheck){
                layer.msg('请先进行判冲!');
                return false;
            }
            var that = this;
            var timetableClass = [];
            var studentJudge = true,
                teacherJudge = true,
                holiday = true,
                roomJudge = true,
                deviceJudge = true;
            $( ".ui-selected" ).each(function() {
                if(!$(this).hasClass('not_check')){
                    if($(this).hasClass('holiday_times')){
                        holiday = false;
                    }
                    if($(this).children('i').hasClass('student_danger')||$(this).children('i').hasClass('student_warning')){
                        studentJudge = false;
                    }
                    if($(this).children('i').hasClass('teacher_danger')){
                        teacherJudge = false;
                    }
                    if($(this).children('label').hasClass('triangle_red')){
                        roomJudge = false;
                    }
                    if($(this).children('label').hasClass('triangle_warning')){
                        deviceJudge = false;
                    }
                    var index = $(this).attr( 'id');
                    timetableClass.push(index)
                }
            });
            if(timetableClass.length==0){
                // alert("请至少选择一个!");
                layer.msg('请至少选择一个!');
                return false;
            }
            if(!studentJudge||!teacherJudge||!roomJudge||!holiday){
                var msg = '<span>该时间段存在';
                if(!studentJudge){msg+='<font color="red">学生冲突</font>,'}
                if(!teacherJudge){msg+='<font color="red">教师冲突</font>,'}
                if(!roomJudge){msg+='<font color="red">实验室冲突</font>,'}
                if(!holiday){msg+='<font color="red">节假日冲突</font>,'}
                if(!deviceJudge){msg+='<font color="red">实验室/设备预约冲突</font>,'}
                msg+='是否继续排课?</span>'
                layer.confirm(msg, {
                    btn: ['继续','取消'] //按钮
                    , offset: ['150px', '40%']
                }, function(index){
                    showTimesAndSaveRecords(timetableClass);
                    layer.close(index);
                }, function(index){
                    layer.close(index);
                    return false;
                });
            }else{
                showTimesAndSaveRecords(timetableClass);
            }


        }
    };
    $('.chooseLabRoom').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        chooseLabRoom[method] ? chooseLabRoom[method].call(this, othis) : '';
    });
    function showTimesAndSaveRecords(timetableClass) {
        // var teacherList = $.cookie('addTeacher');
        // var teachers = teacherList.split(",");
        var teacherSelected = [];
        var tutorSelected = [];
        var tutorss = new Array();
        var teacherss = new Array();
        if(teacherList!=''){
            if(teacherList.length>0){
                $.each(teacherList,function (index,item) {
                    if(item.type=='教师'){
                        teacherSelected.push(item.username);
                        teacherss.push({id:item.username,text:item.teacher});
                    }else if(item.type=='辅导'){
                        tutorSelected.push(item.username);
                        tutorss.push({id:item.username,text:item.teacher});
                    }
                })
            }
        }
        var labselected = layui.formSelects.value('labselect', 'val');
        var weekdaySelected = layui.formSelects.value('weekdaySelect', 'val');
        var academyNumber = $('#academyNumber').val();
        var data1 = JSON.stringify({
            tag: timetableClass,
            term: $("#termid").val(),
            courseNo: $("#courseNo").val(),
            labSelected: labselected,
            tutorSelected: tutorSelected,
            teacherSelected: teacherSelected,
            academyNumber: academyNumber
        });
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiJudgeCourseSchedulingRecordsList",
            headers: {Authorization: getJWTAuthority()},
            data: data1,
            async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                console.log(res);
                var records = res.data;
                // $('.unassigned_times').html('');
                var str = '';
                for(var i=0;i<res.data.length;i++){
                    str+='<form class="layui-form lesson_card" action="" lay-filter="single_form'+ i +'" id="single_form'+ i +'">' +
                        '<div class="layuiadmin-card-text">' +
                        '<div class="layui-text-top"><i class="layui-icon layui-icon-form"></i>' +
                        '<font>星期'+ res.data[i].weekdays +'</font>'+
                        '<font>'+ res.data[i].sectionsShow +'节</font>'+
                        '<font>第'+ res.data[i].weeksShow +'周</font>'+
                        '<input type="hidden" name="weeks" id="weeks'+ i +'" value="' + res.data[i].weeks + '"/>'+
                        '<input type="hidden" name="classes" id="classes'+ i +'" value="' + res.data[i].sections + '"/>'+
                        '<input type="hidden" name="weekdays" id="weekdays'+ i +'" value="' + res.data[i].weekdays + '"/>'+
                        '</div>'+
                        '<div class="layui-text-center">'+
                        '<div class="layui-row layui-col-space5">';
                    str+=   '<div class="layui-col-md3">';
                    if(requiredItemSelect){
                        str+='<select class="layui-form" name="editproject'+ i +'" id="item_select'+ i +'" xm-select="item_select'+ i +'" xm-select-skin="normal" xm-select-search="" lay-filter="" lay-verify="required" lay-vertype="tips">';
                    }else{
                        str+='<select class="layui-form" name="editproject'+ i +'" id="item_select'+ i +'" xm-select="item_select'+ i +'" xm-select-skin="normal" xm-select-search="" lay-filter="">';
                    }
                    str+='<option value="">实验项目</option>';
                    $.each(res.data[i].resultsOperationItem, function (index, item) {
                        str = str + '<option value="' + item.id + '">' + item.text + '</option>';
                    });
                    str+=   '</select></div>';
                    str+=   '<div class="layui-col-md3">'+
                        '<select class="layui-form" name="editaddress'+ i +'" id="address_select'+ i +'" xm-select="address_select'+ i +'" xm-select-skin="normal" xm-select-search="" lay-filter="" lay-verify="required" lay-vertype="tips">'+
                        '<option value="">实验室</option>';
                    $.each(res.data[i].resultsLabRoom, function (index, item) {
                        str = str + '<option value="' + item.id + '">' + item.text + '</option>';
                    });
                    str+=   '</select></div>';
                    str+=   '<div class="layui-col-md3">';
                    if(singleSelectFromTeacher){
                        str+='<select class="layui-form teacher_select" name="editteacherone'+ i +'" id="teacher_select'+ i +'" xm-select="teacher_select'+ i +'" xm-select-radio="" xm-select-skin="normal" xm-select-search="" lay-filter="" lay-verify="required" lay-vertype="tips">';
                    }else{
                        str+='<select class="layui-form teacher_select" name="editteacherone'+ i +'" id="teacher_select'+ i +'" xm-select="teacher_select'+ i +'" xm-select-skin="normal" xm-select-search="" lay-filter="" lay-verify="required" lay-vertype="tips">';
                    }
                    str+='<option value="">教师</option>';
                    $.each(res.data[i].resultsTeacher, function (index, item) {
                        str = str + '<option value="' + item.id + '">' + item.text + '</option>';
                    });
                    str+=   '</select></div>';
                    str+=   '<div class="layui-col-md3">'+
                        '<select class="layui-form" name="editteachertwo'+ i +'" id="tutor_select'+ i +'" xm-select="tutor_select'+ i +'" xm-select-skin="normal" xm-select-search="" lay-filter="">'+
                        '<option value="">辅导</option>';
                    $.each(tutorss, function (index, item) {
                        str = str + '<option value="' + item.id + '">' + item.text + '</option>';
                    });
                    str+=   '</select></div>'+
                        '</div>';
                    str+='<div class="layui-row layui-col-space5 desk_scope layui-hide">';
                    str+='<div class="layui-col-md3">' +
                        '<select class="layui-form" name="deskNumStart'+ i +'" id="desk_select_start'+ i +'" xm-select="desk_start_select'+ i +'" xm-select-skin="normal" xm-select-search="" xm-select-radio="" lay-filter="">'+
                        '<option value="">起始桌号</option>';
                    let deskNum = [];
                    for (let j=1;j<201;j++) {
                        deskNum.push(j);
                    }
                    $.each(deskNum, function (index, item) {
                        str = str + '<option value="' + item + '">' + item + '</option>';
                    });
                    str+=   '</select></div>';
                    str+='<div class="layui-col-md3">' +
                        '<select class="layui-form" name="deskNumEnd'+ i +'" id="desk_select_end'+ i +'" xm-select="desk_end_select'+ i +'" xm-select-skin="normal" xm-select-search="" xm-select-radio="" lay-filter="">'+
                        '<option value="">截止桌号</option>';
                    $.each(deskNum, function (index, item) {
                        str = str + '<option value="' + item + '">' + item + '</option>';
                    });
                    str+=   '</select></div>';
                    str+=   '</div>' +
                        '</div>'+
                        '<p class="layui-text-bottom">'+
                        '<button type="button" class="ltb_btn layui-form" style="margin-right: 5px;" lay-submit lay-filter="single_sub_'+ i +'">确定</button>'+
                        '</p>'+
                        '</div>'+
                        '</div>'+
                        '</form>';
                }
                $('.unassigned_times').html(str);

                layui.formSelects.render();
                //监听指定开关
                form.on('switch(switchTest)', function(data){
                    // layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
                    //     offset: '6px'
                    // });
                    // layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
                    if(this.checked){
                        $('.desk_scope').removeClass('layui-hide')
                        $('[id^=desk_select]').attr("lay-verify","required")
                    }else{
                        $('.desk_scope').addClass('layui-hide')
                        $('[id^=desk_select]').removeAttr("lay-verify")
                        $('[id^=desk_select]').removeAttr("_lay-verify")//formselects附加属性
                    }
                    for(var i =0;i<res.length;i++) {
                        layui.formSelects.render(`desk_start_select${i}`);
                        layui.formSelects.render(`desk_end_select${i}`);
                    }
                    // form.render('select')//使用这个可以注释_lay-verify
                });
                if(res.data.length>3){
                    $('.unassigned_times').css({
                        'overflow-y':'scroll',
                        'height':'80%',
                    })
                }
                $('[xid="tutor_select0"]').css('left','-70px');
                layui.formSelects.value('labselect', labselected);
                layui.formSelects.value('weekdaySelect', weekdaySelected);
                $.each(res.data, function (index, item) {
                    var singleFilter = 'single_sub_'+index;
                    form.on('submit('+ singleFilter +')', function(data) {
                        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
                        var JudgeConflictTimeTableVOs = [];
                        var JudgeConflictTimeTableVO;
                        var desks = [];
                        var weeks = data.field.weeks;
                        var classes = data.field.classes;
                        var weekday = data.field.weekdays;
                        var address = 'editaddress'+index;
                        var itemindex = 'editproject'+index;
                        var teacherindex = 'editteacherone'+index;
                        var tutorindex = 'editteachertwo'+index;
                        var deskStartindex = 'deskNumStart'+index;
                        var deskEndindex = 'deskNumEnd'+index;
                        var labRoomId = data.field[address];
                        var item = data.field[itemindex];
                        var teacher = data.field[teacherindex];
                        var tutor = data.field[tutorindex];
                        var startDesk = data.field[deskStartindex];
                        var endDesk = data.field[deskEndindex];
                        if(startDesk!=""){
                            if(Number(endDesk)<=Number(startDesk)){
                                layer.msg('请正确选择桌号区间!')
                                return false;
                            }else if((Number(endDesk)-Number(startDesk))+1<Number(studentNumber)){
                                layer.msg('桌号区间小于学生人数!')
                                return false;
                            }
                            for (var n = Number(startDesk); n <= Number(endDesk); n++) {
                                desks.push(n);
                            }
                        }
                        JudgeConflictTimeTableVO = recordsObject(weeks,classes,weekday,labRoomId,item,teacher,tutor,desks);
                        JudgeConflictTimeTableVOs.push(JudgeConflictTimeTableVO);
                        console.log(JudgeConflictTimeTableVOs);
                        saveRecords(JudgeConflictTimeTableVOs,index);
                        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                    });
                });
            }
        });
    }
    //查看选择时间段学生冲突详情
    var getStudentInfo = {
        getStudentInfo: function() {
            var studentC = $('#student').prop('checked');
            if(!isCheck){
                layer.msg('请先进行判冲!');
                return false;
            }else if(!studentC){
                layer.msg('请选择学生判冲!');
                return false;
            }
            var timetableClass = [];
            $( ".ui-selected" ).each(function() {
                if(!$(this).hasClass('not_check')){
                    var index = $(this).attr( 'id');
                    timetableClass.push(index)
                }
            });
            if(timetableClass.length==0){
                // alert("请至少选择一个!");
                layer.msg('请至少选择一个!');
                return false;
            }
            var tags = "";
            $.each(timetableClass,function (index,item) {
                tags+=item+','
            })
            tags = tags.slice(0,tags.length-1);
            // var groupId = $('#groupId').val();
            var groupId = $('#groupselect').val();
            var termId = $('#termid').val();
            var courseNo = $('#courseNo').val();
            var index = layer.open({
                type: 2, //此处以iframe举例
                // url: ,
                title: '学生冲突情况',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: location.origin + '/teacherInformationCenter/lims/timetable/course/getStudentConflictInfo?timetableStyle=4&groupId='+ groupId +'&termId='+termId+'&tags='+tags+'&courseNo='+courseNo,
                // end: function () {
                //     getTimetableBatchList();
                // }
            });
            layer.full(index);
        }
    };
    $('.getStudentInfo').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        getStudentInfo[method] ? getStudentInfo[method].call(this, othis) : '';
    });
    var showIcon = {
        showIcon: function() {
            var str = '<div>教师不冲突:<i class="teacher_pass"></i>教师冲突:<i class="teacher_danger"></i></div>'+
                '<div>学生不冲突:<i class="student_pass"></i>学生部分冲突:<i class="student_warning"></i>学生冲突:<i class="student_danger"></i></div>'+
                '<div>实验室不冲突:<label class="triangle-bottomleft-green"></label>实验室冲突:<label class="triangle-bottomleft-red"></label>实验室/设备预约冲突:<label class="triangle-bottomleft-orange"></label></div>'+
                '<div>节假日:<div style="background-color: rgb(236, 86, 86,0.3);display: inline-block;width: 12px;height: 12px"></div>背景色</div>'+
                '<div style="position: relative;width:108px">教务课程计划:<i class="class_educational"></i></div>';
            var index = layer.open({
                type: 1, //此处以iframe举例
                skin: 'layui-layer-demo', //样式类名
                title: '状态图标信息',
                closeBtn: 0, //不显示关闭按钮
                anim: 2,
                shade : 0.1,
                shadeClose: true, //开启遮罩关闭
                content: str,
            });
        }
    };
    $('.showIcon').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        showIcon[method] ? showIcon[method].call(this, othis) : '';
    });
    function recordsObject(weeks,classes,weekday,labRoomId,item,teacher,tutor,desks) {
        var JudgeConflictTimeTableVO = new Object();
        JudgeConflictTimeTableVO.weeks = weeks;
        JudgeConflictTimeTableVO.classes = classes;
        JudgeConflictTimeTableVO.weekday = weekday;
        JudgeConflictTimeTableVO.term = $('#termid').val();
        JudgeConflictTimeTableVO.courseNo = $('#courseNo').val();
        JudgeConflictTimeTableVO.labRoomId = labRoomId;
        JudgeConflictTimeTableVO.item = item;
        JudgeConflictTimeTableVO.teacher = teacher;
        JudgeConflictTimeTableVO.tutor = tutor;
        JudgeConflictTimeTableVO.status = 10;
        JudgeConflictTimeTableVO.timetableStyle = 4;
        JudgeConflictTimeTableVO.createdBy = username;
        JudgeConflictTimeTableVO.groupId = $('#groupselect').val();
        JudgeConflictTimeTableVO.station = desks;
        return JudgeConflictTimeTableVO;
    }
    function saveRecords(JudgeConflictTimeTableVOs,index){
        if($('#student').is(":checked")){
            JudgeConflictTimeTableVOs[0].buttonS = 1;
        }
        if($('#teacher').is(":checked")){
            JudgeConflictTimeTableVOs[0].buttonT = 1;
        }
        if($('#lab').is(":checked")){
            JudgeConflictTimeTableVOs[0].buttonL = 1;
        }
        // var student = $('#student').val();
        // var teacher = $('#teacher').val();
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/timetable/manage/apiSavejudgeConflictTimeTableResult",
            headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify(JudgeConflictTimeTableVOs),
            async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                console.log(res);
                if(res.msg=='success'){
                    layer.msg('保存成功');
                    if(res.data[0].lab_danger!=null){
                        for(var i =0;i<res.data[0].lab_danger.length;i++){
                            if(res.data[0].lab_danger[i]!=''){
                                if($('#'+res.data[0].lab_danger[i]+' label').hasClass('triangle_green')){
                                    $('#'+res.data[0].lab_danger[i]+' label').removeClass("triangle_green");
                                    $('#'+res.data[0].lab_danger[i]+' label').addClass('triangle_red');
                                    // $('#'+res.data[0].lab_danger[i]+' i').eq(0).addClass('lesson_red_plan');
                                }

                            }
                        }
                    }
                    if(res.data[0].student_danger!=null) {
                        for (var i = 0; i < res.data[0].student_danger.length; i++) {
                            if (res.data[0].student_danger[i] != '') {
                                if ($('#' + res.data[0].student_danger[i] + ' i').eq(1).hasClass('student_warning')) {
                                    $('#' + res.data[0].student_danger[i] + ' i').eq(1).removeClass("student_warning");
                                    $('#' + res.data[0].student_danger[i] + ' i').eq(1).addClass('student_danger');
                                } else if ($('#' + res.data[0].student_danger[i] + ' i').eq(1).hasClass('student_pass')) {
                                    $('#' + res.data[0].student_danger[i] + ' i').eq(1).removeClass("student_pass");
                                    $('#' + res.data[0].student_danger[i] + ' i').eq(1).addClass('student_danger');
                                }

                            }
                        }
                    }
                    if(res.data[0].teacher_danger!=null) {
                        for (var i = 0; i < res.data[0].teacher_danger.length; i++) {
                            if (res.data[0].teacher_danger[i] != '') {
                                if ($('#' + res.data[0].teacher_danger[i] + ' i').eq(1).hasClass('teacher_pass')) {
                                    $('#' + res.data[0].teacher_danger[i] + ' i').eq(1).removeClass("teacher_pass");
                                    $('#' + res.data[0].teacher_danger[i] + ' i').eq(1).addClass('teacher_danger');
                                }

                            }
                        }
                    }
                    var groupId = $('#groupselect').val();
                    location.href = "#arranged_times";
                    table.reload('judgmentBatchesListStepThree', {
                        url: zuulUrl + "api/timetable/manage/apiGroupTimetableOfBatchScheduled"
                        ,where: {groupId: groupId} //设定异步数据接口的额外参数
                        ,method: 'post'
                        ,contentType: "application/json;charset=UTF-8"
                        ,headers: {Authorization: getJWTAuthority()}
                        //,height: 300
                    });
                    if(index!='all'){
                        $('#single_form'+index).remove();
                    }
                };
            },
            error: function (res) {
                layer.msg(res);
            }
        });
    }
    form.render(null, 'schedulebox');

	//设置
	form.val('schedulebox', {
		"equip": true //是否允许设备对外开放
	});
    var groupId = $('#groupId').val();
    if(groupId=="undefined"){
        groupId=0;
    }
	//执行一个已安排时间段表单
	table.render({
		elem: '#judgmentBatchesListStepThree',
		id: 'judgmentBatchesListStepThree',
		url: zuulUrl + "api/timetable/manage/apiGroupTimetableOfBatchScheduled",
        where: {groupId: groupId},
        method: 'post',
        contentType: "application/json;charset=UTF-8",
        headers: {Authorization: getJWTAuthority()},
		title: '已安排时间段',
		cellMinWidth: 80,
		cols: [
			[ //表头
                {
                    field: 'timetable',
                    title: '排课时间',
                    sort: true
                }, {
					field: 'labInfo',
					title: '实验室',
					minWidth: 130,
					sort: true
				}, {
					field: 'teachers',
					title: '授课教师',
					sort: true
				}, {
					field: 'tutors',
					title: '辅导',
					sort: true
				}, {
					field: 'items',
					title: '实验项目',
					sort: true
				}, {
                    field: 'scope',
                    title: '起止桌号',
                    sort: true,
                    templet: function (d) {
                        if(d.station && d.station.length>0){
                            return d.station[0]+'~'+d.station[d.station.length-1];
                        }else{
                            return '未设置桌号';
                        }
                    }
                }, {
					fixed: 'right',
					title: '操作',
					toolbar: '#line_toolbar',
					width: 65
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: false
	});

	//监听行工具事件
	table.on('tool(judgmentBatchesListStepThree)', function(obj) {
		var data = obj.data;
		if(obj.event === 'del') {
			layer.confirm('真的删除行么', function(index) {
                $.ajax({
                    url: zuulUrl + "api/timetable/manage/apiDeleteTimetableBySameNumberId?id=" + obj.data.sameNumberId+"&createdBy="+username,
                    contentType: "application/json;charset=utf-8",
                    headers:{Authorization: getJWTAuthority()},
                    async: false,
                    dataType: "json",
                    type: "post",
                    //async: false,
                    success: function (json) {
                        $('#schedulebox button').click();
                        obj.del();
                    }
                });
				layer.close(index);
			});
		}
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
            var groupId=$('#groupId').val();
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2, //此处以iframe举例
                // url: ,
                title: '学生名单',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: location.origin + '/teacherInformationCenter/lims/timetable/course/listofScheduledStudents?courseNo='+courseNo+'&term='+term+'&groupId='+groupId
            });
            layer.full(index);
        }
    };
    $('.studentlist').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        student[method] ? student[method].call(this, othis) : '';
    });
    //上一步页面
    var previousStep = {
        previousStep: function() {
            var that = this;
            //多窗口模式，层叠置顶
            // layer.closeAll();
            var index = parent.layer.getFrameIndex(window.name);
            var courseNo = $('#courseNo').val();
            var term = $('#termid').val();
            window.parent.window.judgmentBatchesCourseTwo(term,courseNo);
        }
    };
    $('.previousStep').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        previousStep[method] ? previousStep[method].call(this, othis) : '';
    });
    //完成页面
    var closeLayer = {
        closeLayer: function() {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

            parent.layer.close(index); //再执行关闭
        }
    };
    $('.closeLayer').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        closeLayer[method] ? closeLayer[method].call(this, othis) : '';
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

function getPageInfoRedis() {
    $.ajax({
        url: zuulUrl + "api/common/page/apiCommonPageInfo",
        headers: {Authorization: getJWTAuthority()},
        data: {'courseNo':$("#courseNo").val(),'term':$("#termid").val()},
        async: false,
        type: "GET",
        success: function (res) {
            teacherList = res.dto;
        }
    });
}