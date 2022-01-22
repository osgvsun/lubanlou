layui.config({
    base: $("meta[name='contextPath']").attr("content")+'/layui_admin/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    index: 'lib/index', //主入口模块
    // deviceBatchGlobal: 'modules/deviceBatchGlobal', //如果 mymod.js 是在根目录，也可以不用设定别名
    // formSelects: 'modules/formSelects', //如果 mymod.js 是在根目录，也可以不用设定别名
});
var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl = $("#zuulServerUrl").val() + "/timetable/";
var added=new Array();
layui.use(['laypage', 'layer', 'table', 'element', 'tableSelect'], function() {
	var admin = layui.admin,
		laypage = layui.laypage //分页
		,
		layer = layui.layer //弹层
		,
		table = layui.table //表格
		,
		form = layui.form,
		$ = layui.jquery,
		element = layui.element, //元素操作
        tableSelect = layui.tableSelect;

    //向世界问个好
    // layer.msg('进入选择教师');
    getCourseInfo();
    getTeacher();
    table.render({
        elem: '#judgmentNobatchesListStepTwo',
        id: 'judgmentNobatchesListStepTwo',
        title: '选择教师',
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
                    title: '序号',
                    type: 'numbers',
                    width: 50
                }, {
                field: 'teacher',
                align: 'center',
                title: '教师',
                sort: true
            }, {
                field: 'identity',
                align: 'center',
                title: '身份',
                sort: true
            },
                // {
                // 	field: 'college',
                // 	title: '学院',
                // 	sort: true
                // },
                {
                    fixed: 'right',
                    align: 'center',
                    title: '操作',
                    toolbar: '#line_toolbar',
                    width: 80
                }
            ]
        ],
        data: [],
        skin: 'line', //表格风格
        even: false,
        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
    });
    getTeacherByCourseNo();
    function getTeacher() {
        var academyNumber = $('#academyNumber').val();
        // $.ajax({
        //     url: zuulUrl + "api/school/apiCourseSchedulingTeacherList",
        //     // headers: {Authorization: getJWTAuthority()},
        //     data: JSON.stringify({academyNumber: academyNumber}),
        //     // async: false,
        //     type: "POST",
        //     contentType: "application/json;charset=UTF-8",
        //     success: function (res) {
        //         console.log(res);
        //         for(var i = 0;i<res.data.length;i++){
        //             $("#teacher_choose").append("<option value="+res.data[i].id+">"+res.data[i].text+"</option>");
        //         }
        //         form.render();
        //     }
        // });
        // tableSelect.render({
        //     elem: '#teacher_choose',	//定义输入框input对象 必填
        //     checkedKey: 'id', //表格的唯一建值，非常重要，影响到选中状态 必填
        //     searchKey: 'search',	//搜索输入框的name值 默认keyword
        //     searchPlaceholder: '请输入工号/姓名',	//搜索输入框的提示文字 默认关键词搜索
        //     table: {	//定义表格参数，与LAYUI的TABLE模块一致，只是无需再定义表格elem
        //         url:zuulUrl + "api/school/apiCourseSchedulingTeacherList",
        //         // where:{academyNumber: academyNumber},
        //         method: 'post',
        //         contentType: "application/json;charset=UTF-8",
        //         headers: {Authorization: getJWTAuthority()},
        //         // data:[{username: 123,cname:'123'},{username: 22,cname:'222'},{username: 22,cname:'222'},{username: 22,cname:'222'},{username: 22,cname:'222'},{username: 22,cname:'222'},{username: 22,cname:'222'}],
        //         cols: [[
        //             { type: 'radio' },//开启单选
        //             { field: 'id', title: '工号/学号' },//列名1
        //             { field: 'text', title: '教师姓名'},//列名2
        //         ]],
        //         page: true, //开启分页
        //         page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
        //             layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
        //             //curr: 5, //设定初始在第 5 页
        //             groups: 1, //只显示 1 个连续页码
        //             first: false, //不显示首页
        //             last: false //不显示尾页
        //         },
        //         limits: [5, 7, 10, 20],
        //         limit: 5 //每页默认显示的数量
        //     },
        //     done: function (elem, data) {
        //         //选择完后的回调，包含2个返回值 elem:返回之前input对象；data:表格返回的选中的数据 []
        //         //拿到data[]后 就按照业务需求做想做的事情啦~比如加个隐藏域放ID...
        //         var NEWJSON = []
        //         layui.each(data.data, function (index, item) {
        //             NEWJSON.push(item.text)
        //             // $("#cardCode2").val(item.cardCode)
        //         })
        //         elem.val(NEWJSON.join(","));
        //     }
        // })
    }
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

	form.render(null, 'addTeacher');

    function getTeacherByCourseNo() {
        //执行一个选择教师表单
        // var teacherList = $.cookie('addTeacher');
        var teacherList = '';
        var teacherDatas = [];
        console.log(teacherList);
        if (teacherList!='') {
            var teachers = teacherList.split(",");
            console.log(teachers);
            for (var i = 0; i < teachers.length; i++) {
                var timetabledata = new Object();
                var cols = teachers[i].split("/");
                // console.log(cols);
                timetabledata.teacher = cols[0];
                timetabledata.identity = cols[1];
                timetabledata.username = cols[2];
                teacherDatas.push(timetabledata);
            }
            table.reload('definiteListStepTwo',{data:teacherDatas});
        }else{
            var courseno = $('#courseNo').val();
            $.ajax({
                url: zuulUrl + "api/school/getSchedulingTeacherInfo",
                headers: {Authorization: getJWTAuthority()},
                data: JSON.stringify({courseNo: courseno}),
                async: false,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                success: function (res) {
                    console.log(res);
                    for (var i = 0; i < res.data.length; i++) {
                        var timetabledata = new Object();
                        // var cols = teachers[i].split("/");
                        // console.log(cols);
                        timetabledata.teacher = res.data[i].teacher;
                        timetabledata.identity = res.data[i].identity;
                        timetabledata.username = res.data[i].username;
                        teacherDatas.push(timetabledata);
                    }
                    added = teacherDatas;
                    table.reload('judgmentNobatchesListStepTwo',{data:teacherDatas});
                }
            });
        }

        // console.log(teacherDatas);
    }

    form.on('submit(add_teacher)', function(data){
        // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        var cache=table.cache['judgmentNobatchesListStepTwo'];
        var t={};
        var result = data.field.teacher.match(/\(([^)]*)\)/);
        if (result) {
            var username=result[1];
        } else {
            layer.msg('请选择已有教师!')
            // $('#teacher_choose').val('');
            return false;
        }
        var teacher=data.field.teacher;
        var identity=data.field.identity;
        t["teacher"] = teacher;
        t["username"] = username;
        identity == 1?t["identity"] = '教师':t["identity"] = '辅导';
        if(cache.length>0){
            for(var i=0;i<cache.length;i++){
                if(cache[i].teacher==teacher&&cache[i].identity==t["identity"]){
                    console.log('重复')
                    return false;
                }
            }
            cache.push(t);
            added.push(t)
        }else{
            cache.push(t);
            added.push(t)
        }
        console.log(added);
        $.ajax({
            url: zuulUrl + "api/school/saveTimetableMiddleRecord",
            headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify({courseNo: $('#courseNo').val(),teacherList: added}),
            async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                console.log(res);
            }
        });
        table.reload('judgmentNobatchesListStepTwo',{data:added});
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
	//监听行工具事件
	table.on('tool(judgmentNobatchesListStepTwo)', function(obj) {
		var data = obj.data;
		if(obj.event === 'del') {
			layer.confirm('真的删除行么', function(index) {
				obj.del();
                for(var i=added.length-1;i>-1;i--){
                    if(added[i].username == obj.data.username){
                        added.splice(i,1);
                    }
                }
                $.ajax({
                    url: zuulUrl + "api/school/saveTimetableMiddleRecord",
                    headers: {Authorization: getJWTAuthority()},
                    data: JSON.stringify({courseNo: $('#courseNo').val(),teacherList: added}),
                    async: false,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    success: function (res) {
                        console.log(res);
                    }
                });
                table.reload('judgmentNobatchesListStepTwo',{data:added});
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
    //跳过此步骤
    var skipStep = {
        skipStep: function() {
            var that = this;
            //多窗口模式，层叠置顶
            var courseNo = $('#courseNo').val();
            var term = $('#termid').val();
            window.parent.window.definiteCourseThree(term,courseNo);
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
            var teacherList = $('#teacherList').val();
            var cache=table.cache['judgmentNobatchesListStepTwo'];
            var teacherlist = [];
            for(var i =0;i<added.length;i++){
                var timetableStr = '';
                timetableStr+=added[i].teacher+'/';
                timetableStr+=added[i].identity+'/';
                timetableStr+=added[i].username;
                teacherlist.push(timetableStr);
            }
            window.parent.window.judgmentNoBatchesCourse(term,courseNo,teacherlist,0);
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
            var cache=table.cache['judgmentNobatchesListStepTwo'];
            var teacherlist = [];
            for(var i =0;i<added.length;i++){
                var timetableStr = '';
                timetableStr+=added[i].teacher+'/';
                timetableStr+=added[i].identity+'/';
                timetableStr+=added[i].username;
                teacherlist.push(timetableStr);
            }
            /*
             * 加入缓存计算，保存页面信息
             * */
            savePageInfoRedis()
            if($('#adjustStatus').val()==1){
                var sameNumberId = $('#sameNumberId').val();
                var adjustWeek = $('#week').val();
                var courseNo = $('#courseNo').val();
                var timeStyle = $('#timetableStyle').val();
                var groupId = $('#groupId').val();
                var step = 3;
                window.parent.window.judgmentNoBatchesCourse(sameNumberId,adjustWeek,courseNo, timeStyle, groupId,3);
            }else{
                window.parent.window.judgmentNoBatchesCourseThree(term,courseNo,teacherlist);
            }

        }
    };
    $('.nextStep').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        nextStep[method] ? nextStep[method].call(this, othis) : '';
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
function savePageInfoRedis() {
    var arr = new Object();
    arr.term = $('#termid').val();
    arr.courseNo = $('#courseNo').val();
    var pageInfoRedis = new Array();
    for (var i = 0; i < added.length; i++) {
        pageInfoRedis.push({teacher: added[i].teacher, type: added[i].identity, username: added[i].username});
    }
    arr.dto = pageInfoRedis;
    $.ajax({
        url: zuulUrl + "api/common/page/apiSaveCommonPageInfo",
        headers: {Authorization: getJWTAuthority()},
        data: JSON.stringify(arr),
        async: false,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        success: function (res) {
            console.log(res);
        }
    });
}
// 查询数据
var arrTeacher = []; //存放教师信息
$.ajax({
    url:zuulUrl + "api/school/apiCourseSchedulingTeacherList",
    data: JSON.stringify({ page: 1, limit: 99999}),
    type: 'post',
    async: false,
    contentType: "application/json;charset=UTF-8",
    headers: {Authorization: getJWTAuthority()},
    success: function (res) {
        for(var i = 0; i < res.data.length; i++){
            arrTeacher.push(res.data[i].text);
        }
    }
});
var oo = new mSift('oo',10);
oo.Data = arrTeacher;
oo.Create(document.getElementById('teacher_choose'));