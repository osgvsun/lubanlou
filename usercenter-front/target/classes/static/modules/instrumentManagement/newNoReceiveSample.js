layui.use(['element', 'form', 'laydate'], function() {
	var form = layui.form,
		laydate = layui.laydate;

	form.render(null, 'newnoreceivesamplebox');

	//监听提交
	form.on('submit(newnoreceivesamplebtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  
		let configSpecimenUid = window.sessionStorage.getItem('configSpecimenUid');
		let startDate = field.noreceivesampledaterange.split('~')[0];
		let endDate = field.noreceivesampledaterange.split('~')[1];
		let obj = {};
		obj = {
			"status": "0",
			"startDate": startDate,
			"endDate": endDate,
			"weekdays": field.weekdays,
			"info": field.remark
		}
		$.ajax({
			url: httpDeviceUrl + 'saveConfigSpecimenOpenTime?configSpecimenUid=' + configSpecimenUid,
			type: 'POST',
			data: obj,
			success: function (res) {
				if (res.code === 0) {
					parent.layui.table.reload('noreceivesample'); //重载表格
					parent.layer.close(index); //再执行关闭
				}
			}
		})
	});

	//已设置不可预约日期范围
	laydate.render({
		elem: '#noreceivesampledaterange',
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