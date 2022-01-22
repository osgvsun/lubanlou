layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate', 'util'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate,
		util = layui.util;

	//向世界问个好
	//layer.msg('');

	form.render(null, 'editnobookingbox');

	console.log(dataChild);
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
		$.ajax({
			url: httpDeviceUrl + 'saveOrUpdateConfigMachineOpenTime?configMachineUid=' + dataChild.configAppUid,
			type: 'POST',
			data: dataObj,
			success: function (res) {
				if (res.code === 0) {
					parent.layui.table.reload('nobooking'); //重载表格
					parent.layer.close(index); //再执行关闭
					parent.layer.msg("保存成功");
				} else {
					parent.layer.msg(res.msg);
				}
			}
		})
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
	let weeks = [];
	if (dataChild.weekdays) {
		weeks = dataChild.weekdays.split(",");
	}
	//多选
	var demo1 = xmSelect.render({
		el: '#weeks',
		language: 'zn',
		theme: {
			color: '#0081ff',
		},
		initValue: weeks,
		name: 'week',
		data: [
			{name: '周一', value: 1},
			{name: '周二', value: 2},
			{name: '周三', value: 3},
			{name: '周四', value: 4},
			{name: '周五', value: 5},
			{name: '周六', value: 6},
			{name: '周七', value: 7},
		]
	})
	//多选	
	//formSelects.value('', [1], true); //单个举例
	// formSelects.value('week', [1, 2, 3], true); //开放星期
});