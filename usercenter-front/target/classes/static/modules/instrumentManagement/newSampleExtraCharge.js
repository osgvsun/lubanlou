layui.use(['layer', 'element', 'form'], function() {
	var layer = layui.layer,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form;

	form.render(null, 'newsampleextrachargebox');

	//监听提交
	form.on('submit(newsampleextrachargebtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  
		let configSpecimenUid = window.sessionStorage.getItem('configSpecimenUid');

		$.ajax({
			url: httpDeviceUrl + 'saveSpecimenConfigAdditional?specimenAppUid=' + configSpecimenUid,
			type: 'POST',
			data: field,
			success: function (res) {
				console.log(res)
				if (res.code === 0) {
					parent.layui.table.reload('sampleextracharge'); //重载表格
					parent.layer.close(index); //再执行关闭
				} else {
					layer.msg(res.msg)
				}
			}

		})
	});
});