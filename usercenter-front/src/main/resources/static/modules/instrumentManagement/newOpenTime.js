layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate', 'formSelects', 'util'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate,
		formSelects = layui.formSelects,
		util = layui.util;

	//向世界问个好
	//layer.msg('');

	form.render(null, 'newopentimebox');

	//监听提交
	form.on('submit(newopentimebtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		let dateStatus = field.opendaterange.split("~");
		let timeStatus = field.opentimerange.split("-");
		let dataObj = {
			"status": 1,
			"startDate": dateStatus[0],
			"endDate": dateStatus[1],
			"startTime": timeStatus[0],
			"endTime": timeStatus[1],
			"weekdays": field.week,
			"openRank": field.grade,
			"minAheadTime": field.mintime,
			"maxAheadTime": field.maxtime
		};
		$.ajax({
			url: httpDeviceUrl + 'saveOrUpdateConfigMachineOpenTime?configMachineUid=' + configMachineUid,
			type: 'POST',
			data: dataObj,
			success: function (res) {
				if (res.code === 0) {
					parent.layui.table.reload('opentime'); //重载表格
					parent.layer.close(index); //再执行关闭
					parent.layer.msg("保存成功");
				} else {
					parent.layer.msg(res.msg);
				}
			}
		})
	});
	//已设置开放日期范围
	laydate.render({
		elem: '#opendaterange',
		type: 'date',
		range: '~'
	});

	//开放时间范围
	laydate.render({
		elem: '#opentimerange',
		type: 'time',
		range: true
	});

	//多选	
	//formSelects.value('week', [1], true); //单个举例
	//formSelects.value('week', [1, 2, 3], true); //多个举例
});