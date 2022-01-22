layui.use(['element', 'form', 'laydate', 'util'], function() {
	var $ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate;

	//向世界问个好
	//layer.msg('');

	form.render(null, 'newreceivesamplebox');

	//监听提交
	form.on('submit(newreceivesamplebtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  
		let configSpecimenUid = window.sessionStorage.getItem('configSpecimenUid');
		let startDate = field.opendaterange.split('~')[0];
		let endDate = field.opendaterange.split('~')[1];
		let obj = {};
		obj = {
			"status": "1",
			"startDate": startDate,
			"endDate": endDate,
			"weekdays": field.weekdays
		}
		$.ajax({
			url: httpDeviceUrl + 'saveConfigSpecimenOpenTime?configSpecimenUid=' + configSpecimenUid,
			type: 'POST',
			data: obj,
			success: function (res) {
				console.log(res)
				if (res.code === 0) {
					parent.layui.table.reload('receivesample'); //重载表格
					parent.layer.close(index); //再执行关闭
				}
			}
		})
	});

	//已设置可接样日期范围
	laydate.render({
		elem: '#opendaterange',
		type: 'date',
		range: '~'
	});
	//多选
	var demo1 = xmSelect.render({
		el: '#weeks',
		language: 'zn',
		theme: {
			color: '#0081ff',
		},
		name: 'weekdays',
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
});