layui.config({
    base: $("meta[name='contextPath']").attr("content")+'/layui_admin/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    index: 'lib/index', //主入口模块
});
var isCheck = false;
var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl = $("#zuulServerUrl").val() + "/timetable/";
var records = [];
var weekNum1 = 0;
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

	//向世界问个好
	// layer.msg('进入排课');
    getCourseInfo();
    getSelectList();
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
    //获取批次组次
    function getSelectList() {
        var courseNo = $('#courseNo').val();
        var groupId = $('#groupId').val();
        if(groupId=='undefined'){
            groupId='';
		}
        var academyNumber = $('#academyNumber').val();
        var batchName;
        var groupName;
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiLabAndBatchListOfBatchScheduled",
            headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify({courseNo: courseNo,academyNumber: academyNumber,groupId: groupId}),
            async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                console.log(res);
                $.each(res.data[0].resultsBatch, function (index, item) {
                    if(item.id == res.data[0].batchId){
                        batchName = item.text;
                    }
                });
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
                                if(item.id == groupId){
                                    groupName = item.text;
                                }
                            });
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
					sort: true,
				}, {
					field: 'items',
					title: '实验项目',
					sort: true
				}, {
                    field: 'scope',
                    title: '起止桌号',
                    sort: true,
                    templet: function (d) {
                        return `25~89`
                    }
                }, {
					fixed: 'right',
					title: '操作',
					toolbar: '#line_toolbar',
					width: 90
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