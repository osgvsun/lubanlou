layui.use(['element', 'form'], function() {
	var $ = layui.jquery,
		element = layui.element,
		form = layui.form;


	console.log(uid)
	form.render(null, 'newinspectprojectchargebox');
	//监听提交
	form.on('submit(newinspectprojectchargebtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		console.log(field)
		$.ajax({
			url: httpDeviceUrl + 'saveSpecimenBilling?specimenUid=' + uid,
			type: 'POST',
			data: field,
			success: function (res) {
				console.log(res)
			}
		})
		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		// parent.layui.table.reload('newinspectprojectchargebox'); //重载表格
		// parent.layer.close(index); //再执行关闭
	});
});