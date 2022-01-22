layui.config({
    base: $("meta[name='contextPath']").attr("content")+'/layui_admin/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    index: 'lib/index', //主入口模块
    // deviceBatchGlobal: 'modules/deviceBatchGlobal', //如果 mymod.js 是在根目录，也可以不用设定别名
    // formSelects: 'modules/formSelects', //如果 mymod.js 是在根目录，也可以不用设定别名
});
var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl = $("#zuulServerUrl").val() + "/timetable/";
var checked=new Array();
// $.cookie("checkedCourse",checked);
var table_data = new Array();// 表格数据缓存
layui.use(['laypage', 'layer', 'table', 'element'], function() {
	var admin = layui.admin,
		laypage = layui.laypage //分页
		,
		layer = layui.layer //弹层
		,
		table = layui.table //表格
		,
		form = layui.form //表格
		,
		$ = layui.jquery,
		element = layui.element //元素操作
    // layui.data(layui.setter.tableName, {
    //     key: "Authorization",
    //     value: getJWTAuthority()
    // });
    getCourseInfo();
	//向世界问个好
	// layer.msg('进入选择实验室');
    function getCourseInfo() {
        var courseNo = $('#courseNo').val();
        var term = $('#termid').val();
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/school/getEducationalSchedulingCourseInfo",
            // headers: {Authorization: getJWTAuthority()},
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
	//执行一个选择实验室表单
	var academyNumber = $('#academyNumber').val();
	// var tag = $('#tag').val();
    var tag = $.cookie('addTimes');
    var tags = tag.split(",");
	var term = $('#termid').val();
	table.render({
		elem: '#definiteListStepThree',
        url: zuulUrl + 'api/school/apiCourseSchedulingLabList',
        // headers: {Authorization: layui.data(layui.setter.tableName)['Authorization']},
        method: 'post',
        contentType: "application/json;charset=UTF-8",
        where: {academyNumber: academyNumber,tag: tags,term: term},
		title: '选择实验室',
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
					fixed: 'left',
					type: 'checkbox',
                    event:'allChoose'
				}, {
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 50
				}, {
					field: 'text',
					title: '实验室名称',
					sort: true
				}, {
					field: 'parameterOne',
					title: '实验室地点',
					sort: true
				}, {
					field: 'parameterTwo',
					title: '容量',
					sort: true,
					width: 100
				}, {
					field: 'id',
					title: '主键',
					hide: true
				}
			]
		],
        // jump: function(request) {
         //    request.setRequestHeader("Authorization", getJWTAuthority());
    	// },
		id: 'definiteListStepThree',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 10, 20],
		limit: 5, //每页默认显示的数量
        done: function (res){
            // layui.data(layui.setter.tableName, {
            //     key: "Authorization",
            //     value: getJWTAuthority()
            // })
            // var checkedCourse = $.cookie('checkedCourse');
            var checkedCourse = '';
            // console.log(checkedCourse);
            table_data = res.data;
            var colcheckedCourses = [];
            if(checkedCourse!=''){
                colcheckedCourses = checkedCourse.split(",");
                checked = colcheckedCourses;
			}else{
                $.ajax({
                    url: zuulUrl + "api/school/getTimetableMiddleRecordOfLab",
                    // headers: {Authorization: getJWTAuthority()},
                    data: JSON.stringify({courseNo: $('#courseNo').val()}),
                    async: false,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    success: function (res) {
                        console.log(res);
                        colcheckedCourses = res.msg.split(",");
                        checked = colcheckedCourses;
                        // if(res.code==0){
                        //
                        // }
                    }
                });
            }
                // 设置换页勾选之前的
                // console.log(checked);
                //在缓存中找到PM_CODE ,然后设置data表格中的选中状态
                //循环所有数据，找出对应关系，设置checkbox选中状态
                for(var i=0;i<res.data.length;i++){
                    for(var j=0;j<checked.length;j++){
                        if(res.data[i].id==checked[j]){
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
				var searchbox = $('#searchbox');
                // $.cookie("checkedCourse",checked);
				//执行重载
				table.reload('definiteListStepThree', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						// key: {
                            search: searchbox.val()
						// }
					},
                    contentType: "application/json;charset=UTF-8",
                    // headers: {Authorization: getJWTAuthority()},
                    done: function (res){
						console.log(checked);
                        // var checkedCourse = $.cookie('checkedCourse');
                        // 设置换页勾选之前的
                        table_data = res.data;
                        //在缓存中找到PM_CODE ,然后设置data表格中的选中状态
                        //循环所有数据，找出对应关系，设置checkbox选中状态
                        for(var i=0;i<res.data.length;i++){
                            for(var j=0;j<checked.length;j++){
                                if(res.data[i].id==checked[j]){
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
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
    table.on('checkbox(definiteListStepThree)', function(obj){
        console.log(obj.checked); //当前是否选中状态
        console.log(obj.data); //选中行的相关数据
        console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
		// if(obj.checked){
			if(obj.type == 'all'){
                if(obj.checked) {
                    var cache = table.cache['definiteListStepThree'];
                    for (var i = 0; i < cache.length; i++) {
                        checked.push(cache[i].id);
                    }
                    // $.cookie("checkedCourse",checked);
                }else {
                    var cache = table.cache['definiteListStepThree'];
                    for (var j = 0; j < cache.length; j++) {
                        for(var i=checked.length-1;i>-1;i--){
                            if(checked[i] == cache[j].id){
                                checked.splice(i,1);
                            }
                        }
                    }
				}
			}else if(obj.type == 'one'){
                if(obj.checked) {
                    checked.push(obj.data.id);
                }else {
                        for(var i=checked.length-1;i>-1;i--){
                            if(checked[i] == obj.data.id){
                                checked.splice(i,1);
                            }
                    	}
                }
			}
		// }
        console.log(checked);
        $.ajax({
            url: zuulUrl + "api/school/saveTimetableMiddleRecord",
            // headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify({courseNo: $('#courseNo').val(),labRoomArray:checked}),
            // async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                console.log(res);
                if(res.code==0){

                }
            }
        });

    });
    //上一步页面
    var previousStep = {
        previousStep: function() {
            var that = this;
            //多窗口模式，层叠置顶
            var courseNo = $('#courseNo').val();
            var term = $('#termid').val();
            window.parent.window.definiteCourseTwo(term,courseNo,checked);
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
            window.parent.window.definiteCourseFour(term,courseNo,checked);
        }
    };
    $('.nextStep').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        nextStep[method] ? nextStep[method].call(this, othis) : '';
    });
    //跳过此步骤
    var skipStep = {
        skipStep: function() {
            var that = this;
            //多窗口模式，层叠置顶
            // layer.closeAll();
            var index = parent.layer.getFrameIndex(window.name);
            var courseNo = $('#courseNo').val();
            var term = $('#termid').val();
            window.parent.window.definiteCourseFour(term,courseNo);
        }
    };
    $('.skipStep').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        skipStep[method] ? skipStep[method].call(this, othis) : '';
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
});
// function getJWTAuthority() {
//     var authorization ="";
//     initDirectoryEngine({
//         getHostsUrl:contextPath+"/shareApi/getHosts",
//         getAuthorizationUrl:contextPath+"/shareApi/getAuthorization"
//     });
//     getAuthorization({
//         async:false,
//         success:function(data){
//             authorization =data;
//         }
//     });
//     return authorization;
// }
