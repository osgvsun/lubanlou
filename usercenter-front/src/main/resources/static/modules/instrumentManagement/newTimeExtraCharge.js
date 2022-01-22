layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var $ = layui.jquery,
		element = layui.element,
		form = layui.form;

	form.render(null, 'newtimeextrachargebox');
	let machineAppUid = window.sessionStorage.getItem("configMachineUid");
	//监听提交
	form.on('submit(newtimeextrachargebtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		console.log(field)

		$.ajax({
			url: httpDeviceUrl + 'saveMachineConfigAdditional?machineAppUid=' + machineAppUid,
			type: 'POST',
			data: field,
			success: function (res) {
				console.log(res)
				parent.layui.table.reload('timeextracharge'); //重载表格
				parent.layer.close(index); //再执行关闭
			}
		})
	});
});