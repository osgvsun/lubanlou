layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	layer.msg('进入课程统计');

	form.render(null, 'coursestatisticbox');

	//获取课程下拉框
	$.ajax({
		url: attendanceHost + "/getCourseList",
		dataType:"JSON",
		success:function(res){
			//回调函数
			let str = `<option value="">请选择课程</option>`
			if (res.data.length === 0) {
				str = `<option value="">暂无课程数据</option>`
			} else {
				for (let i = 0; i < res.data.length; i++) {
					str += `<option value="${res.data[i]['course_name']}">${res.data[i]['course_name']}</option>`
				}
			}
			$(`select[name=courseName]`).html("");
			$(`select[name=courseName]`).append(str);
			form.render('select', "coursestatisticbox");
		},
	})
	//获取教师下拉框
	$.ajax({
		url: attendanceHost + "/getTeacherList",
		dataType:"JSON",
		success:function(res){
			//回调函数
			let str = `<option value="">请选择教师</option>`
			if (res.data.length === 0) {
				str = `<option value="">暂无教师数据</option>`
			} else {
				for (let i = 0; i < res.data.length; i++) {
					str += `<option value="${res.data[i]['teachers']}">${res.data[i]['teachers']}</option>`
				}
			}
			$(`select[name=teacher]`).html("");
			$(`select[name=teacher]`).append(str);
			form.render('select', "coursestatisticbox");
		},
	})
	// setCourseStatistics(1, 5, $.cookie("username"), $.cookie('current'))
	// // // 列表数据
	// function setCourseStatistics(page, limit, username, authorities) {
	// 	$.ajax({
	// 		url: 'http://localhost:8844/courseStatistics',
	// 		type: 'GET',
	// 		data: { "page": page, "limit": limit, "username": username, "authorities": authorities},
	// 		success: function (res) {
	// 			console.log(res)
	// 			// setPage(page, limit, res.count)
	// 		}
	// 	})
	// }

	// var courseName = xmSelect.render({
	// 	el: '#courseName',
	// 	paging: true,
	// 	pageRemote: true,
	// 	filterable: true,
	// 	radio: true,
	// 	style: {
	// 		width: '160px'
	// 	},
	// 	theme: {
	// 		color: '#707979'
	// 	},
	// 	remoteMethod: function (val, cb, show, pageIndex) {
	// 		$.ajax({
	// 			url: attendanceHost + '/courseStatistics',
	// 			type: 'GET',
	// 			async: false,
	// 			data: { "page": pageIndex, "limit": 10, "username": $.cookie("username"), "authorities": $.cookie('current')},
	// 			success: function (res) {
	// 				console.log(res)
	// 				let data = res.data.map(v => {
	// 					return {'name': v.courseName, "value": v.courseName}
	// 				})
	// 				let newData = duplicateRemoval(data)
	// 				cb(newData, Math.ceil(res.count/10));
	//
	// 			},
	// 			error: function (res) {
	// 				cb([], 0);
	// 			}
	// 		})
	// 	}
	// })
	/*
 * 去重
 */
	// function duplicateRemoval(studentArr){
	// 	let obj = {};
	// 	let student = studentArr.reduce((cur, next) => {
	// 		obj[next.value] ? "" : obj[next.value] = true && cur.push(next);
	// 		return cur;
	// 	}, []); //设置cur默认类型为数组，并且初始值为空的数组
	// 	return student;
	// }
	//
	//
	// // 分页数据
	// //自定义首页、尾页、上一页、下一页文本
	// function setPage(page, limit, count,) {
	// 	laypage.render({
	// 		elem: 'page'
	// 		,count: count
	// 		,curr: page
	// 		,limit: limit
	// 		,first: '首页'
	// 		,last: '尾页'
	// 		,prev: '<em>←</em>'
	// 		,next: '<em>→</em>'
	// 		,theme: '#367c5d',
	// 		layout: ['count', 'prev', 'page', 'next', 'skip'],
	// 		jump: function (obj, first) {
	// 			if (!first) {
	// 				// getAttendance(obj.curr, obj.limit, startDate, endDate, usernames)
	// 			}
	// 		}
	// 	});
	// }
	// 表格渲染
	table.render({
		elem: '#coursestatistic',
		url: attendanceHost + '/courseStatistics',
		cellMinWidth: 100,
        where:{'username': $.cookie('username'), 'cname': $.cookie('cname'), 'authorities': $.cookie('current')},
		page: true,
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
			//,curr: 5 //设定初始在第 5 页
			,groups: 1 //只显示 1 个连续页码
			,first: false //不显示首页
			,last: false //不显示尾页
		},
		cols: [
			[
				{ type: 'numbers', title: '序号', fixed: 'left', rowspan: 2},
				{ field: 'username', title: '学号', rowspan: 2},
				{ field: 'cname', title: '姓名', rowspan: 2},
				{ field: 'courseName', title: '课程名称', rowspan: 2},
				{ field: 'teachers', title: '教师', rowspan: 2},
				// { field: 'itemName', title: '班级', rowspan: 2},
				{ field: 'weeks', title: '周次', colspan: 4}
			],
			[
				{
					field: 'status',
					title: '实验项目(第一周)',
					templet: function (d) {
						return d.status === "1" ? '√' : 'x';
					}
				},
				// { field: 'weeks', title: '实验项目(第一周)' },
				// { field: 'weeks', title: '实验项目(第一周)' },
				// { field: 'weeks', title: '实验项目(第一周)' },
			]
		],
		id: 'coursestatistic',
		request:{
			pageName:"page",
			limitName:"limit"
		},
		data: table,
		// skin: 'line', //表格风格
		even: true,
		limits: [5, 7, 10, 20,50,100],
		limit: 10, //每页默认显示的数量
		done: function (res, curr, count) {
			console.log(res)
			console.log(curr)
			console.log(count)
			$('th').each(function (index, obj) {
				if ($(obj).attr('data-field') == 'status') {
					$(obj).find('span').text(res.data[0].items + '(第' + toChinesNum(res.data[0].weeks) + '周)')
				}
			})
		}
	})

	const toChinesNum = (num) => {
		let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
		let unit = ["", "十", "百", "千", "万"];
		num = parseInt(num);
		let getWan = (temp) => {
			let strArr = temp.toString().split("").reverse();
			let newNum = "";
			for (var i = 0; i < strArr.length; i++) {
				newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
			}
			return newNum;
		}
		let overWan = Math.floor(num / 10000);
		let noWan = num % 10000;
		if (noWan.toString().length < 4) noWan = "0" + noWan;
		return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);

	}
	var $ = layui.$,
		active = {
			reload: function() {
				var courseName = $('select[name=courseName]').val();
				var teachers = $('select[name=teacher]').val();

				//执行重载
				table.reload('coursestatistic', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						courseName,
						teachers
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});