layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var $ = layui.jquery,
		element = layui.element,
		form = layui.form;

	form.render(null, 'newinspectprojectbox');

	//监听提交
	form.on('submit(newinspectprojectbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  
		let configSpecimenUid = window.sessionStorage.getItem('configSpecimenUid');
		console.log(field)
		field['configSpecimenUid'] = configSpecimenUid;
		$.ajax({
			url: httpDeviceUrl + 'saveSpecimenItem',
			type: 'POST',
			data: field,
			success: function (res) {
				if (res.code === 0) {
					parent.layer.close(index); //再执行关闭
					parent.location.reload();
				}
			}
		})

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		// parent.layui.table.reload('newinspectprojectbox'); //重载表格

	});
});