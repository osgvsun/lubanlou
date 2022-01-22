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
		let refreshCycleTime = field.refreshCycleDay + ',' + field.refreshCycleTime;
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
			"refreshCycleTime": refreshCycleTime,
			"uid": editData.uid
		};

		parent.opentimeData(JSON.stringify(dataObj));
		parent.layer.close(index); //再执行关闭
	});

	//信息
	form.val('editopentimebox', {
		"opendaterange": editData.startDate + " ~ " + editData.endDate,
		"opentimerange": editData.startTime + " - " + editData.endTime,
		"grade": editData.openRank,
		"mintime": editData.minAheadTime,
		"maxtime": editData.maxAheadTime
	});

	if (editData.refreshCycleTime) {
		let arr = editData.refreshCycleTime.split(',');
		form.val('editopentimebox', {
			"refreshCycleDay": arr[0],
			"refreshCycleTime": arr[1],
		});
	}
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

	// 开放时间刷新周期时间点
	laydate.render({
		elem: '#refreshCycleTime',
		type: 'time'
	});
	if (editData.weekdays) {

		let week = editData.weekdays.split(",");
		formSelects.value('week', week, true); //开放星期
	}
});