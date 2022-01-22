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

	form.render(null, 'editopentimebox');

	//监听提交
	form.on('submit(editopentimebtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		// parent.layui.table.reload('editopentimebox'); //重载表格
		// parent.layer.close(index); //再执行关闭

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
			"maxAheadTime": field.maxtime,
			"uid": editData.uid
		};
		$.ajax({
			url: httpDeviceUrl + 'saveOrUpdateConfigMachineOpenTime?configMachineUid=' + editData.configAppUid,
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

	console.log(editData)
	//信息
	// let dateStatus = editData.
	form.val('editopentimebox', {
		"opendaterange": editData.startDate + " ~ " + editData.endDate,
		"opentimerange": editData.startTime + " - " + editData.endTime,
		"grade": editData.openRank,
		"mintime": editData.minAheadTime,
		"maxtime": editData.maxAheadTime
	});

	//已设置开放日期范围
	laydate.render({
		elem: '#opendaterange',
		type: 'date',
		range: "~"
	});

	//开放时间范围
	laydate.render({
		elem: '#opentimerange',
		type: 'time',
		range: true
	});

	//多选	
	//formSelects.value('', [1], true); //单个举例
	if (editData.weekdays) {
		let week = editData.weekdays.split(",");
		formSelects.value('week', week, true); //开放星期
	}
});