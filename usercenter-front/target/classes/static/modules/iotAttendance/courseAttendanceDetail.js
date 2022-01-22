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
	layer.msg('进入课程考勤');

	form.render(null, 'courseattendancedetailbox');
	//监听提交
	// form.on('submit(courseattendancedetailbtn)', function(data) {
	// 	var id = obj.records.id;
	// 	var username = obj.records.username;
	// 	var attendanceType = obj.records.attendanceType;
	// 	var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	//
	// 	//提交 Ajax 成功后，关闭当前弹层并重载表格
	// 	$.ajax({
	// 		url: attendanceHost + '/updateAttendanceStatus?id='+obj.data.id+'&username='
	// 			+obj.data.username+'&attendanceType='+obj.data.attendanceType,
	// 		type:'get',
	// 		data:{
	// 			id,
	// 			username,
	// 			attendanceType
	// 		},
	// 	});
	// 	parent.layui.table.reload('courseattendancebox'); //重载表格
	// 	parent.layer.close(index); //再执行关闭
	// });

	//选择考勤开始时间
	laydate.render({
		elem: '#startattendance',
		type: 'datetime',
		// 当前日期 --添加下面这句
		// value: new Date(classDate+" "+startTime),
		//done: function(value, date, endDate) {
		// console.log(value); //得到日期生成的值，如：2017-08-18
		// console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
		// console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
		//}
	});

	//选择考勤结束时间
	laydate.render({
		elem: '#endattendance',
		type: 'datetime',
		// 当前日期 --添加下面这句
		// value:new Date(classDate+" "+endTime),
		//done: function(value, date, endDate) {
		// console.log(value); //得到日期生成的值，如：2017-08-18
		// console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
		// console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
		//}
	});

	//执行一个表单
	table.render({
		elem: '#courseattendancedetail',
		// url: '../modules/iotAttendance/static/json/courseAttendanceDetail.json', //数据接口
		url: attendanceHost + '/getAttendanceStatus',
		where:{'id': id,'startTime':classDate+" "+startTime,'endTime':classDate+" "+endTime,'hardwareIps':hardwareIps},
		method: 'post',
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
					field: 'studentName',
					title: '姓名',
					sort: true,
					width: 80,
				}, {
					field: 'username',
					title: '学号',
					sort: true,
					width: 120,
				}, {
					field: 'classDate',
					title: '考勤日期',
					sort: true,
					width: 140,
				}, {
					field: 'datetime',
					title: '刷卡时间1',
					sort: true,
					width: 180,
				}, {
					field: 'datetime2',
					title: '刷卡时间2',
					sort: true,
					width: 180,
				}, {
					field: 'attDeviation',
					title: '偏差距离',
					sort: true
				}, {
					field: 'attDeviation2',
					title: '偏差距离2',
					sort: true
					}, {
					field: 'address',
					title: '开始地点',
					sort: true
				}, {
					field: 'address2',
					title: '结束地点',
					sort: true
				}, {
					fixed: 'right',
					title: ' 出勤 / 迟到 / 早退 / 旷课 / 请假 ',
					toolbar: '#toolbar',
					width: 360,
				}
			]
		],
		id: 'courseattendancedetail',
		request:{
			pageName:"current",
			limitName:"size"
		},
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20, 50, 100],
		limit: 10, //每页默认显示的数量
		parseData:function(res) {
			var currentData = res.records;

			return {
				code: 0,
				data: currentData,
				curr: res.current,
				count: res.total,
			}
		},
		done: function (res) {
			$.each(res.data,function (key, value) {
				$(`[name='${value.username}'][value=${value.status}]`).attr("unAjax","true")
				$(`[name='${value.username}'][value=${value.status}]:eq(0)+div`).click()
                $(`[name='${value.username}'][value=${value.status}]`).removeAttr("unAjax")
			})
			let datat = form.val("courseattendancedetailbox")
			console.log(datat)
			form.on('radio(stateRadio)', function(data){
				console.log(data.elem); //得到radio原始DOM对象
                let unAjax = data.elem.getAttribute("unAjax")
                let username = data.elem.name;
                let id = data.elem.getAttribute("data")
				console.log(data.elem.name); //得到radio原始DOM对象
				console.log(data.value); //被点击的radio的value值
                if(!unAjax){
                    $.ajax({
                        url:attendanceHost+`/updateAttendanceStatus?id=${id}&username=${username}&attendanceType=${data.value}`,
                        type:"POST",
                        contentType:"application/json;charset=utf-8",
                        success:function(res){
							layer.msg(res.msg);
                        }
                    })
                }
			});
		}
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var startTime = $('input[name=startattendance]').val();
				var endTime = $('input[name=endattendance]').val();
				var username = $('input[name=searchbox]').val();

				//执行重载
				table.reload('courseattendancedetail', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						startTime,
						endTime,
						username
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

	window.checkTime = function (){
		let calculateThis = $('[name="calculateThis"]').is(':checked');
		let late = $("input[name=late]").val();
		let leaveEarly = $("input[name=leaveEarly]").val();
		let meters = $("input[name=meters]").val();
		console.log(calculateThis);
        $.ajax({
            url:attendanceHost+`/attendanceSync`,
            data:{
                id,
                hardwareIps,
                startTime:classDate+" "+startTime,
                endTime:classDate+" "+endTime,
                calculateThis,
                late,leaveEarly,meters
            },
            type:"POST",
            success:function(res){
                //执行重载
                table.reload('courseattendancedetail', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        id
                    }
                },)
            }
        })
	}
});