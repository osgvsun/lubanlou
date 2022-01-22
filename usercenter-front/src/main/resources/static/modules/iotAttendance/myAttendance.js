layui.use(['laypage', 'layer', 'table', 'laydate', 'element', 'form'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		laydate = layui.laydate,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	layer.msg('进入我的统计');

	form.render(null, 'myattendancebox');

	//选择考勤时间
	laydate.render({
		elem: '#searchbox',
		type: 'date',
		// 当前日期 --添加下面这句
		//value: new Date(),
		//done: function(value, date, endDate) {
		// console.log(value); //得到日期生成的值，如：2017-08-18
		// console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
		// console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
		//}
	});
	/*
 * 去重
 */
	function duplicateRemoval(studentArr){
		let obj = {};
		let student = studentArr.reduce((cur, next) => {
			obj[next.value] ? "" : obj[next.value] = true && cur.push(next);
			return cur;
		}, []); //设置cur默认类型为数组，并且初始值为空的数组
		return student;
	}
	//课程名称、教师选择
	var courseName = xmSelect.render({
		el: '#courseName',
		tips: '请选择课程名称',
		radio: true,
		filterable: true,
		style: {
			width: '160px'
		},
		theme: {
			color: '#707979'
		}
	})
	var teachers = xmSelect.render({
		el: '#teachers',
		tips: '请选择授课教师',
		radio: true,
		filterable: true,
		style: {
			width: '160px'
		},
		theme: {
			color: '#707979'
		}
	})
	console.log(teachers)
	$.ajax({
		url: attendanceHost + '/myCourseStatistics',
		type: 'GET',
		async: false,
		data: { "page": 1, "limit": 999999, "username": $.cookie("username"), "authorities": $.cookie('current')},
		success: function (res) {
			let data = res.data;
			if (data.length !==0) {
				let courseNameData = data.map(v => {
					return {'name': v.courseName, "value": v.courseName}
				})
				let teachersData = data.map(v => {
					return {'name': v.teachers, "value": v.teachers}
				})
				teachers.update({
					data: duplicateRemoval(teachersData)
				})
				courseName.update({
					data: duplicateRemoval(courseNameData)
				})
			}
		}
	})

	//执行一个表单
	table.render({
		elem: '#myattendance',
		url: attendanceHost + '/myCourseStatistics', //数据接口
		where: { "username": $.cookie("username"),  'cname': $.cookie('cname'), "authorities": $.cookie('current')},
		title: '列表',
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
					field: 'courseName',
					title: '课程名称',
					sort: true
				}, {
					field: 'items',
					title: '实验项目',
					sort: true
				}, {
					field: 'classDate',
					title: '上课时间',
					sort: true
				}, {
					field: 'teachers',
					title: '上课老师',
					sort: true
				// }, {
				// 	field: 'datetime1',
				// 	title: '刷卡时间1',
				// 	sort: true
				// }, {
				// 	field: 'datetime2',
				// 	title: '刷卡时间2',
				// 	sort: true
				}, {
					field: 'status',
					title: '考勤结果',
					width: 190,
					templet: function (d) {
						return `${d.status === "1" ? '<font class=' + `${setStatus(d.classDate)}` + '>正常出勤</font>' : d.status === "2" ? '<font class="font_orange">迟到</font>' : d.status === "3" ? '<font class="font_grey">早退</font>' : d.status === "4" ? '<font class="font_red">旷课</font>' : d.status === "5" ? '<font class="font_grey">请加</font>' : ''}`;
					}
				}
			]
		],
		id: 'myattendance',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 10 //每页默认显示的数量
	});

	function setStatus(d) {
		let da = new Date();
		let da1 = new Date(d);
		if (da1.getTime() < da.getTime()) {
			return 'font_green';
		} else {
			return 'font_grey';
		}
	}
	//监听行工具事件
	table.on('tool(myattendance)', function(obj) {
		var data = obj.data;
	});
	var $ = layui.$,
		active = {
			reload: function() {
				var courseNames = courseName.getValue('valueStr');
				var teacherss = teachers.getValue('valueStr');
				//执行重载
				table.reload('myattendance', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						courseName: courseNames,
						teachers: teacherss
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});