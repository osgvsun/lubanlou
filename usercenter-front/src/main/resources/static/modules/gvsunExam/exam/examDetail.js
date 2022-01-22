var format = function(time, format){
	var t = new Date(time);
	var tf = function(i){return (i < 10 ? '0' : '') + i};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
		switch(a){
			case 'yyyy':
				return tf(t.getFullYear());
				break;
			case 'MM':
				return tf(t.getMonth() + 1);
				break;
			case 'mm':
				return tf(t.getMinutes());
				break;
			case 'dd':
				return tf(t.getDate());
				break;
			case 'HH':
				return tf(t.getHours());
				break;
			case 'mm':
				return tf(t.getMinutes());
				break;
			case 'ss':
				return tf(t.getSeconds());
				break;
		}
	})
}
layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate

	//向世界问个好
	//layer.msg('');

	form.render(null, 'examdetailbox');
	// 接口连接
	$.ajax({
		url: httpBaseUrl + '/views/getOneTAssignmentApi',
		data: {'assignmentId': assignmentId},
		headers: {"x-datasource": 'limsproduct'},
		type: 'GET',
		async: false,
		success: function (res) {
			console.log(res);
			var timelimitOneTest = res.timelimitOneTest;
			var flag;
			var start = format(res.startdateTest, 'yyyy-MM-dd HH:mm:ss');
			var due = format(res.duedateTest, 'yyyy-MM-dd HH:mm:ss');
			if(timelimitOneTest!=1){
				flag = '自定义';
				$(".submitnum").show();
			}else {
				flag = 1;
			}

			//信息
			form.val('examdetailbox', {
				"name": res.tAssignmentTitle,
				"score": res.testScoreTest,
				"sort": res.type,
				"basic": res.oldAssignmentName,
				"type": res.testChapterType,
				"chapter": res.testWkChapterId,
				"class": res.testWkLessonId,
				"duration": res.mins,
				"time": res.timelimitOneTest,
				"pass": res.passingScore,
				"detail": res.content,
				"college": res.schoolAcademy,
				"grade": res.schoolClass,
				"submittimes": res.timelimitOneTest,
				"gradebook": res.toGradebook == "yes" ? "是" : "否",
				"publish": res.gradeToStudent == "yes" ? "是" : "否",
				"sum": res.gradeToTotalGrade == "yes" ? "是" : "否",
				"info": res.answerToStudent == "yes" ? "是" : "否",
				"source": res.testFrom,
				"answer": res.needSubmit == 1 ? "是" : "否",
				"banktype": res.examCategory,
				"bank": res.examQuestionpoolName
			});
		}
	})


	//执行题库
	table.render({
		elem: '#questionbank',
		url: httpBaseUrl + '/views/findTAssCompVoListApi', //数据接口
		where: {'assignmentId': assignmentId},
		headers: {"x-datasource": 'limsproduct'},
		method: 'GET',
		title: '题库',
		page: true, //开启分页
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			// curr: 1, //设定初始在第 5 页
			groups: 1, //只显示 1 个连续页码
			first: false, //不显示首页
			last: false //不显示尾页
		},
		parseData: function (res) {
			console.log(res);
			return {
				"code": 0,
				"msg": "暂无数据",
				"data": res,
				"total": res.length
			}
		},
		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					width: 50,
					// align: 'center',
					type: 'numbers'
				}, {
					field: 'title',
					title: '试题大项',
					minWidth: 100,
					sort: true
				}, {
					field: 'itemType',
					title: '试题类型',
					minWidth: 100,
					sort: true
				}, {
					field: 'questionpoolId',
					title: '所属题库',
					minWidth: 100,
					sort: true
				}, {
					field: 'itemQuantity',
					title: '试题数量',
					minWidth: 100,
					sort: true
				}, {
					field: 'itemScore',
					title: '每题分值(仅用于本次考试)',
					minWidth: 100,
					sort: true
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: false,
		id: 'questionbank',
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});
});