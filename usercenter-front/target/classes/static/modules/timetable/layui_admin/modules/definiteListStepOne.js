layui.config({
    base: $("meta[name='contextPath']").attr("content")+'/layui_admin/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    index: 'lib/index', //主入口模块
    // deviceBatchGlobal: 'modules/deviceBatchGlobal', //如果 mymod.js 是在根目录，也可以不用设定别名
    // formSelects: 'modules/formSelects', //如果 mymod.js 是在根目录，也可以不用设定别名
});
// var timetableClass = [];
var msgindex;
var times=new Array();
var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl = $("#zuulServerUrl").val() + "/timetable/";
layui.use(['laypage', 'layer', 'table', 'element'], function() {
	var admin = layui.admin,
		laypage = layui.laypage //分页
        ,
		form = layui.form
		,
		layer = layui.layer //弹层
		,
		table = layui.table //表格
		,
		$ = layui.jquery,
		element = layui.element //元素操作
    getCourseInfo();
    getWeeks1();
    getClasses1();
    getWeekday1();
    table.render({
        elem: '#definiteListStepOne',
        // url: zuulUrl + 'api/school/getEducationalSchedulingCourseRecord',
        // headers: {Authorization: getJWTAuthority()},
        // method: 'post',
        // contentType: "application/json;charset=UTF-8",
        // where: {courseNo: courseno},
        title: '选择排课时间段',
        cellMinWidth: 100,
        page: true, //开启分页
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            //curr: 5, //设定初始在第 5 页
            groups: 3, //只显示 1 个连续页码
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
                field: 'weeksShow',
                title: '周次',
                sort: true
            }, {
                field: 'weekdays',
                title: '星期',
                sort: true
            },{
                field: 'sectionsShow',
                title: '节次',
                sort: true
            }, {
                fixed: 'right',
                title: '操作',
                toolbar: '#line_toolbar',
                width: 80
            }
            ]
        ],
        id: 'definiteListStepOne',
        data: [],
        skin: 'line', //表格风格
        even: false,
        limits: [5, 7, 10, 20],
        limit: 5, //每页默认显示的数量
        // done: function (res) {
        //     console.log(res.rows)
        //     times = res.rows;
        // }
    });
    function getCourseInfo(){
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
                var coursePlan = "<span>"+ res.coursePlan+"</span>";
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
    function getWeeks1() {
        var term = $('#termid').val();
        var timetableStyle = $('#timetableStyle').val();
        var courseNo = $('#courseNo').val();
        // var data1 = JSON.stringify({
        //     "term": $('#term').val(),
        //     "type": 2,
        // });
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/timetable/common/apiDateListJudgeConflictByStu?type=1&termId="+term+"&timetableStyle="+timetableStyle+"&courseNo="+courseNo,
            headers: {Authorization: getJWTAuthority()},
            // data: data1,
            // async: false,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            success: function (result) {
                var list = result.results;    //返回的数据
                for (var j = 0; j < list.length; j++) {
                    // $("#week_box").append(" <input type=\"checkbox\" name=\"week\" title='第" + list[i].text + "周' value='" + list[i].id + "' lay-filter=\"allChoose_1\">");
                    var x = "<div lay-filter='allChoose_1' name='week' id='week"+ list[j].id +"' value=" + list[j].id + " lay-tips=" + list[j].tip + " class=\"layui-unselect layui-form-checkbox\"><span>第"+ list[j].id+"周</span><i class='layui-icon layui-icon-ok'></i></div>"
                    $("#week_box").append(x);
                    form.render("checkbox");
                }
                allRule('week_all', 'week_box');
                oppositeRule('week_opposite', 'week_box');
                noneRule('week_none', 'week_box');
                optionRule('week_box')
                clickRule('week_box')
                // showClasses('week_box')
            }
        });
    }
    function getClasses1() {
        var term = $('#termid').val();
        var timetableStyle = $('#timetableStyle').val();
        var courseNo = $('#courseNo').val();
        // var data1 = JSON.stringify({
        //     "term": $('#term').val(),
        //     "type": 2,
        // });
        $.ajax({
            url: zuulUrl + "api/timetable/common/apiDateListJudgeConflictByStu?type=3&termId="+term+"&timetableStyle="+timetableStyle+"&courseNo="+courseNo,
            type: "GET",
            // data: data1,
            headers: {Authorization: getJWTAuthority()},
            // async: false,
            contentType: "application/json;charset=UTF-8",
            success: function (result) {
            	// console.log(result)
                var list = result.results;    //返回的数据
                //add_role_name给select定义的id
                for (var j = 0; j < list.length; j++) {
                    // listclass += list[i].id+",";
                    // $("#section_box").append(" <input type=\"checkbox\" name=\"classes\" id='classes" + list[i].id + "' title='" + list[i].text + "' value='" + list[i].id + "' lay-filter=\"classes_choose\" >");
                    var x = "<div lay-filter='classes_choose' name='classes' lay-tips=" + list[j].tip + " value=" + list[j].id + " class=\"layui-unselect layui-form-checkbox\"><span>"+ list[j].text+"</span><i class='layui-icon layui-icon-ok'></i></div>"
                    $("#class_box").append(x);
                    form.render("checkbox");
                }
                // var x = "<div lay-filter='classes_choose' name='classes' value='111' class=\"layui-unselect layui-form-checkbox\"><span>1111</span><i class='layui-icon layui-icon-ok'></i></div>"
                // $("#class_box").append(x);
                allRule('section_all', 'class_box')
                oppositeRule('section_opposite', 'class_box')
                noneRule('section_none', 'class_box')
                optionRule('class_box')
                clickRule('class_box')
                // showWeeks('class_box')
            }
        });
    }
    function getWeekday1(){
        var term = $('#termid').val();
        var timetableStyle = $('#timetableStyle').val();
        var courseNo = $('#courseNo').val();
        // var data1 = JSON.stringify({
        //     "term": $('#term').val(),
        //     "type": 2,
        // });
        $.ajax({
            url: zuulUrl + "api/timetable/common/apiDateListJudgeConflictByStu?type=2&termId="+term+"&timetableStyle="+timetableStyle+"&courseNo="+courseNo,
            type: "GET",
            // data: data1,
            headers: {Authorization: getJWTAuthority()},
            // async: false,
            contentType: "application/json;charset=UTF-8",
            success: function (result) {
                var list = result.results;    //返回的数据
                //add_role_name给select定义的id
                for (var j = 0; j < list.length; j++) {
                    // listclass += list[i].id+",";
                    // $("#section_box").append(" <input type=\"checkbox\" name=\"classes\" id='classes" + list[i].id + "' title='" + list[i].text + "' value='" + list[i].id + "' lay-filter=\"classes_choose\" >");
                    var x = "<div lay-filter='classes_choose' name='weekdays' value=" + list[j].id + " class=\"layui-unselect layui-form-checkbox\"><span>"+ list[j].text+"</span><i class='layui-icon layui-icon-ok'></i></div>"
                    $("#day_box").append(x);
                    form.render("checkbox");
                }
                // var x = "<div lay-filter='classes_choose' name='classes' value='111' class=\"layui-unselect layui-form-checkbox\"><span>1111</span><i class='layui-icon layui-icon-ok'></i></div>"
                // $("#section_box").append(x);
                allRule('weekday_all', 'day_box')
                oppositeRule('weekday_opposite', 'day_box')
                noneRule('weekday_none', 'day_box')
                optionRule('day_box')
                clickRule('day_box')
                // showWeeks('weekday_box')
            }
        });
    }
	//向世界问个好
	// layer.msg('进入选择排课时间段');
    var courseno = $('#courseNo').val();
    // var tag = $('#tag').val();
    var tag = $.cookie('addTimes');
    // times = tag;
    if (tag!=''){
        var timetabledatas = [];
        var tags = tag.split(",");
        // console.log(tags);
        for(var i =0;i<tags.length;i++){
            var timetabledata = new Object();
            var cols = tags[i].split("/");
            // console.log(cols);
            timetabledata.weeksShow = cols[0];
            timetabledata.sectionsShow = cols[1];
            timetabledata.weekdays = cols[2];
            timetabledatas.push(timetabledata);
        }
        // console.log(timetabledatas);
        times = timetabledatas;
        //展示已知数据
        table.reload('definiteListStepOne',{data: timetabledatas});
        // table.render({
        //     elem: '#definiteListStepOne'
        //     ,page: true //开启分页
        //     ,page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
        //             layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
        //             //curr: 5, //设定初始在第 5 页
        //             groups: 3, //只显示 1 个连续页码
        //             first: false, //不显示首页
        //             last: false //不显示尾页
        //     }
        //     ,cols: [
        //         [ //表头
        //             {
        //                 fixed: 'left',
        //                 title: '序号',
        //                 type: 'numbers',
        //                 width: 50
        //             }, {
        //             field: 'weeksShow',
        //             title: '周次',
        //             sort: true
        //         }, {
        //             field: 'sectionsShow',
        //             title: '节次',
        //             sort: true
        //         }, {
        //             field: 'weekdays',
        //             title: '星期',
        //             sort: true
        //         }, {
        //             fixed: 'right',
        //             title: '操作',
        //             toolbar: '#line_toolbar',
        //             width: 80
        //         }
        //         ]
        //     ]
        //     ,data: timetabledatas,
        //     id: 'definiteListStepOne',
        //     // data: table,
        //     skin: 'line', //表格风格
        //     even: false,
        //     limits: [5, 7, 10, 20],
        //     limit: 5 //每页默认显示的数量
        // });
    }else{
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/school/getEducationalSchedulingCourseRecord",
            headers: {Authorization: getJWTAuthority()},
            async: false,
            type: "post",
            data: JSON.stringify({courseNo: courseno}),
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                // console.log(res);
                table.reload('definiteListStepOne',{data: res.rows});
                times = res.rows;
                console.log(times);
            }
        });
        //执行一个选择排课时间段表单
        // table.render({
        //     elem: '#definiteListStepOne',
        //     url: zuulUrl + 'api/school/getEducationalSchedulingCourseRecord',
        //     // headers: {Authorization: getJWTAuthority()},
        //     method: 'post',
        //     contentType: "application/json;charset=UTF-8",
        //     where: {courseNo: courseno},
        //     title: '选择排课时间段',
        //     cellMinWidth: 100,
        //     page: true, //开启分页
        //     page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
        //         layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
        //         //curr: 5, //设定初始在第 5 页
        //         groups: 3, //只显示 1 个连续页码
        //         first: false, //不显示首页
        //         last: false //不显示尾页
        //     },
        //     cols: [
        //         [ //表头
        //             {
        //                 fixed: 'left',
        //                 title: '序号',
        //                 type: 'numbers',
        //                 width: 50
        //             }, {
        //             field: 'weeksShow',
        //             title: '周次',
        //             sort: true
        //         }, {
        //             field: 'sectionsShow',
        //             title: '节次',
        //             sort: true
        //         }, {
        //             field: 'weekdays',
        //             title: '星期',
        //             sort: true
        //         }, {
        //             fixed: 'right',
        //             title: '操作',
        //             toolbar: '#line_toolbar',
        //             width: 80
        //         }
        //         ]
        //     ],
        //     id: 'definiteListStepOne',
        //     // data: table,
        //     skin: 'line', //表格风格
        //     even: false,
        //     limits: [5, 7, 10, 20],
        //     limit: 5, //每页默认显示的数量
        //     // done: function (res) {
        //     //     console.log(res.rows)
        //     //     times = res.rows;
        //     // }
        // });
    }
	//监听行工具事件
	table.on('tool(definiteListStepOne)', function(obj) {
		var data = obj.data;
		if(obj.event === 'del') {
			layer.confirm('真的删除行么', function(index) {
				obj.del();
                for(var i=times.length-1;i>-1;i--){
                    if(times[i].sectionsShow == obj.data.sectionsShow && times[i].weekdays == obj.data.weekdays &&times[i].weeksShow == obj.data.weeksShow ){
                        times.splice(i,1);
                    }
                }
                table.reload('definiteListStepOne',{
                    data:times
                });
				layer.close(index);
			});
		}
	});
	// 添加选择时间段
    var timeSection = {
        addTimeSection: function() {
            // var that = this;
            var data1;
            var data = new Object();
            var classs = "";
            $("#class_box >div").each(function(){
                if($(this).hasClass('layui-form-checked')){
                    classs += $(this).attr("value")+",";
                }
            });
            var weekss = "";
            $("#week_box >div").each(function(){
                if($(this).hasClass('layui-form-checked')){
                    weekss += $(this).attr("value")+",";
                }
            });
            var weekdayss = "";
            $("#day_box >div").each(function(){
                if($(this).hasClass('layui-form-checked')){
                    weekdayss += $(this).attr("value")+",";
                }
            });
            // weekdayss = weekdayss.slice(0,weekdayss.length-1);
            data.sections = classs;
            data.weeks = weekss;
            data.termId = $("#termid").val();
            data.weekdays = weekdayss;
            data.courseNo = $("#courseNo").val();
            // if($("#timetableStyle").val() == 5){
            //     data.field.selfId = $("#selfId").val();
            // }else{
            //     // data.field.courseNo = "225151-17-10061363";
            //     data.field.courseNo = $("#courseNo").val();
            // }
            timetableClass = [];
            for(var i =0;i<times.length;i++){
                var timetableStr = '';
                timetableStr+=times[i].weeksShow+'/';
                timetableStr+=times[i].sectionsShow+'/';
                timetableStr+=times[i].weekdays;
                timetableClass.push(timetableStr);
            }
            console.log(timetableClass);
            data.tag = timetableClass;
            data.timetableStyle = $("#timetableStyle").val();
            if(data.sections == "" || data.weeks == "" || data.weekdays==""){
                alert("请选择周次/节次/星期!")
                return false;
            }
            $.ajax({
                // url: weekUrl + "?term=16&weekday=-1",
                url: zuulUrl + "api/school/apiCourseSchedulingRecords",
                headers: {Authorization: getJWTAuthority()},
                async: false,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json;charset=UTF-8",
                success: function (res) {
                    // console.log(res);
                    table.reload('definiteListStepOne',{data: res.data});
                    times = res.data;
                    console.log(times);
                }
            });
            // console.log(times);
            // data1 = JSON.stringify(data);
            // table.render({
            //     elem: '#definiteListStepOne',
            //     url: zuulUrl + 'api/school/apiCourseSchedulingRecords',
            //     method: 'post',
            //     contentType: "application/json;charset=UTF-8",
            //     // headers: {Authorization: getJWTAuthority()},
            //     where: data,
            //     title: '选择排课时间段',
            //     cellMinWidth: 100,
            //     page: true, //开启分页
            //     page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            //         layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            //         //curr: 5, //设定初始在第 5 页
            //         groups: 1, //只显示 1 个连续页码
            //         first: false, //不显示首页
            //         last: false //不显示尾页
            //     },
            //     cols: [
            //         [ //表头
            //             {
            //                 fixed: 'left',
            //                 title: '序号',
            //                 type: 'numbers',
            //                 width: 50
            //             }, {
            //             field: 'weeksShow',
            //             title: '周次',
            //             sort: true
            //         }, {
            //             field: 'sectionsShow',
            //             title: '节次',
            //             sort: true
            //         }, {
            //             field: 'weekdays',
            //             title: '星期',
            //             sort: true
            //         }, {
            //             fixed: 'right',
            //             title: '操作',
            //             toolbar: '#line_toolbar',
            //             width: 80
            //         }
            //         ]
            //     ],
            //     id: 'definiteListStepOne',
            //     data: table,
            //     skin: 'line', //表格风格
            //     even: false,
            //     limits: [5, 7, 10, 20],
            //     limit: 5, //每页默认显示的数量
            //     done: function (res) {
            //         console.log(res.rows)
            //         times = res.rows;
            //     }
            // });
            // $.ajax({
            //     url: zuulUrl + "api/school/judgeTimetableConflictByStudent",
            //     headers: {Authorization: getJWTAuthority()},
            //     data: data1,
            //     // async: false,
            //     type: "POST",
            //     contentType: "application/json;charset=UTF-8",
            //     beforeSend: function () {
            //         loading("数据提交中，请稍后......");
            //     },
            //     success: function (res) {
            //
            //     }
            // });
        }
    };
    function loading(msg){
        msgindex = layer.msg(msg, {
            icon:16,
            shade:[0.1, '#fff'],
            time:false  //不自动关闭
        })
    }
    $('.addTimeSection').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        timeSection[method] ? timeSection[method].call(this, othis) : '';
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
	//下一步页面
	var nextStep = {
        nextStep: function() {
			var that = this;
			//多窗口模式，层叠置顶
            // layer.closeAll();
            var index = parent.layer.getFrameIndex(window.name);
			var courseNo = $('#courseNo').val();
			var term = $('#termid').val();
            timetableClass = [];
            if(times.length>0){
                for(var i =0;i<times.length;i++){
                    var timetableStr = '';
                    timetableStr+=times[i].weeksShow+'/';
                    timetableStr+=times[i].sectionsShow+'/';
                    timetableStr+=times[i].weekdays;
                    timetableClass.push(timetableStr);
                }
            }
            console.log(timetableClass);
            window.parent.window.definiteCourseTwo(term,courseNo,undefined,timetableClass);
		}
	};
	$('.nextStep').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
        nextStep[method] ? nextStep[method].call(this, othis) : '';
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