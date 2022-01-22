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
	layer.msg('进入考勤设置');

	form.render(null, 'setattendancebox');

	//获取考勤模式
	$.ajax({
		url: attendanceHost + '/getAttendanceMode',
		type: 'POST',
		success: function (res) {
			let result = res.data.records;
			for (let i = 0; i < result.length;i++) {
				let row = `<div class="layui-inline">
                               <input type="checkbox" name="" value="${result[i].hardwareType}" lay-skin="primary" lay-filter="set_attendance"
                               title="${result[i].hardwareType === 547 ? '考勤机考勤' : result[i].hardwareType === 751 ? '班牌考勤' : result[i].hardwareType === 872 ? '工位仪打卡' : result[i].hardwareType === 888 ? '小程序打卡' : result[i].hardwareType === 548 ? '门禁考勤' :''}" 
                               ${ result[i].enabled === 1 ? 'checked' : ''}>
                           </div>`;
				$('.font_grey').before(row);
				form.render();
			}
		}
	})
	form.on('checkbox(set_attendance)', function(data){
		let hardwareType = data.value;
		let enabled = data.elem.checked ? 1 : 0;
		$.ajax({
			url: attendanceHost + '/setAttendanceMode',
			type: 'POST',
			data: { "hardwareType": hardwareType, "enabled": enabled},
			success: function (res) {
				layer.msg('设置成功')
			}
		})
	});
	//打开新增考勤设置
	var newsetattendance = {
		newsetattendance: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增考勤设置',
				area: ['500px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'newSetAttendance',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['提交', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newsetattendancebtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newsetattendance').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newsetattendance[method] ? newsetattendance[method].call(this, othis) : '';
	});

	//执行一个表单


	//监听行工具事件
	table.on('tool(setattendance)', function(obj) {
		var data = obj.data;
		//打开编辑页面
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑',
				area: ['500px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'editSetAttendance',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['提交', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editsetattendancebtn");
					submit.click();
				}
			});
			//layer.full(index);
		};
		//删除
		if(obj.event === 'del') {
			layer.confirm('确定删除？', {
				title: '提示'
			}, function(index) {
				obj.del();
				layer.close(index);
			});
		}
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('setattendance', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							labname: searchbox.val()
						}
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});