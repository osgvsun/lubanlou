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

	form.render(null, 'editnobookingbox');

	//监听提交
	form.on('submit(editnobookingbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		let dataStatus = field.nobookingdaterange.split("~");
		let timeStatus = field.nobookingrange.split("-");
		let dataObj = {
			"status": 0,
			"startDate": dataStatus[0],
			"endDate": dataStatus[1],
			"startTime": timeStatus[0],
			"endTime": timeStatus[1],
			"weekdays": field.week,
			"info": field.remark,
			"uid": dataChild.uid
		}
		parent.layui.table.reload('nobooking'); //重载表格
		parent.noBookingData(JSON.stringify(dataObj))
		parent.layer.close(index); //再执行关闭 
	});

	form.val('editnobookingbox', {
		"nobookingdaterange": dataChild.startDate + " ~ " + dataChild.endDate,
		"nobookingrange": dataChild.startTime + " - " + dataChild.endTime,
		"remark": dataChild.reason
	});

	//已设置开放日期范围
	laydate.render({
		elem: '#nobookingdaterange',
		type: 'date',
		range: '~'
	});

	//开放时间范围
	laydate.render({
		elem: '#nobookingrange',
		type: 'time',
		range: true
	});

	//多选
	if (dataChild.weekdays) {
		let week = dataChild.weekdays.split(",");
		formSelects.value('week', week, true); //开放星期
	}
});