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
	layer.msg('进入预约考勤');

	form.render(null, 'reservationattendancebox');



	//执行一个表单
	table.render({
		elem: '#reservationAttendance',
		url: attendanceHost + '/reservationAttendance',
		where:{'username': $.cookie('username'), 'cname': $.cookie('cname'), 'authorities': $.cookie('current')},
		method: 'post',
		title: '列表',
		cellMinWidth: 100,
		page: true, //开启分页			
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			// curr: 1, //设定初始在第 1 页
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
					title: '预约使用时间',
					sort: true,
					width: 240,
				}, {
					field: 'datetime',
					title: '考勤时间',
					sort: true,
					width: 180,
				}, {
					field: 'address',
					title: '考勤地点',
					sort: true,
					width: 180,
				}, {
                    field: 'right',
					title: ' 出勤 / 未到 ',
					toolbar: '#toolbar',
					width: 360,
				}
			]
		],
		id: 'reservationAttendance',
		request:{
			pageName:"current",
			limitName:"size"
		},
		data: table,
		skin: 'line', //表格风格			
		even: true,
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
		}
		,
		done: function (res) {
            if($.cookie('current') != 'SUPERADMIN' && $.cookie('current') != 'TEACHER' ) {
                $(".layui-table-box").find("[data-field='right']").css("display","none");
            }
			$.each(res.data,function (key, value) {
				$(`[name='${value.id}-${value.username}'][value=${value.status}]`).attr("unAjax","true")
				$(`[name='${value.id}-${value.username}'][value=${value.status}]:eq(0)+div`).click()
                $(`[name='${value.id}-${value.username}'][value=${value.status}]`).removeAttr("unAjax")
			})
			let datat = form.val("reservationattendancebox")
			console.log(datat)
			form.on('radio(stateRadio)', function(data){
				console.log(data.elem); //得到radio原始DOM对象
                let unAjax = data.elem.getAttribute("unAjax")
                let arr = data.elem.name.split("-");
				console.log(data.elem.name.split("-")); //得到radio原始DOM对象
				console.log(data.value); //被点击的radio的value值
                if(!unAjax){
                    $.ajax({
                        url:attendanceHost+`/updateAttendanceStatus?id=${arr[0]}&username=${arr[1]}&attendanceType=${data.value}`,
                        type:"POST",
                        contentType:"application/json;charset=utf-8",
                        success:function(res){

                        }
                    })
                }
			});
		}
	});

	//获取预约类型列表
	$.ajax({
		url:attendanceHost + "/getReservationListByConfig",
		dataType:"JSON",
		success:function(res){
			//回调函数
			let str = `<option value="">请选择</option>`
			if (res.data.length === 0) {
				str = `<option value="">未配置预约类型</option>`
			} else {
				for (let i = 0; i < res.data.length; i++) {
					str += `<option value="${res.data[i]['reservationType']}">${res.data[i]['reservationName']}</option>`
				}
			}
			$(`select[name=timetableType]`).html("");
			$(`select[name=timetableType]`).append(str);
			form.render('select', "reservationattendancebox");
		},
	})
	var $ = layui.$,
		active = {
			reload: function() {
				var search = $('input[name=searchbox]').val();
				var timetableType = $('select[name=timetableType]').val();

				//执行重载
				table.reload('reservationAttendance', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						search,
						timetableType
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

});