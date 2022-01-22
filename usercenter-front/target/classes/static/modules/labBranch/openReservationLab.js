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
	layer.msg('进入实验室开放时间段');

	form.render(null, 'openreservationlabbox');

	//信息
	form.val('openreservationlabbox', {
		"weekendreservation": "否", //是否允许周末预约
		"weekenddata": "8 时30.0 分 至 21 时0.0 分", //周末预约起止时间
		"weekdaysdata": "8 时30.0 分 至 21 时0.0 分" //工作日预约起止时间
	});

	//打开实验室开放时间段设置
	var setopenreservationlab = {
		setopenreservationlab: function() {
			//layer.msg('实验室开放时间段设置');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '实验室开放时间段设置',
				area: ['600px', '540px'],
				shade: 0.5,
				maxmin: true,
				content: 'setOpenReservationLab',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['添加', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#setopenreservationlabbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.setopenreservationlab').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		setopenreservationlab[method] ? setopenreservationlab[method].call(this, othis) : '';
	});

});